class UserService {
    constructor(db) {
        this.client = db.sequelize
        this.User = db.User
    }

    async create(firstName, lastName, username, salt, encryptedPassword) {
        return this.User.create(
            {
                FirstName: firstName,
                LastName: lastName,
                Username: username,
                Salt: salt,
                EncryptedPassword: encryptedPassword,
                // Role is set by default to "User", can be updated by an admin in MySql
                RoleId: 1, // 1 = "User"
            }
        )
    }

    async getAll() {
        return this.User.findAll({
            where: {}
        })
    }

    async getOne(userId) {
        return await this.User.findOne({
            where: { id: userId },
            include: ['Role'] // include the user's Role
        })
    }
    async getOneByName(username) {
        return await this.User.findOne({
            where: { username: username },
            include: ['Role'] // include the user's Role
        })
    }

    async deleteUser(userId) {
        return this.User.destroy({
            where: { id: userId }
        })
    }
}

module.exports = UserService