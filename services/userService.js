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
                EncryptedPassword: encryptedPassword
                // Role is set by default to "User", can be updated by an admin in MySql
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
            // include: ['Animal'] // if we want to fetch associated data
        })
    }
    async getOneByName(username) {
        return await this.User.findOne({
            where: { username: username },
            // include: ['Animal'] // if we want to fetch associated data
        })
    }

    async deleteUser(userId) {
        return this.User.destroy({
            where: { id: userId }
        })
    }
}

module.exports = UserService