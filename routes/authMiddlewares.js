module.exports = {
    checkIfAuthorized: function (req, res, next) {
        if (req.user == null) {
            res.status(401).send(new Error())
            return
        }
        if (req.user.role.Name == "Admin" || req.user.role.Name == "User")
            next()
    },
    canSeeUserDetails: function (req, res, next) {
        if (req.user != null)
            if (req.user.role.Name === "Admin" || req.user.id == req.params.userId) {
                next()
                return
            }
        res.redirect('/login')
    },
    isAdmin: function (req, res, next) {
        if (req.user.role.Name === "Admin") {
            next()
            return
        }
        else {
            res.status(401).send(new Error())
        }
    },
    addUserToRes: function (req, res, next) {
        // console.log(req.isAuthenticated()) // returns true if a user is logged in
        
        if (req.isAuthenticated()) {
            // if a user is logged in:
            // set res.locals.username + res.locals.userId which can be used in all EJS views
            res.locals.user = req.user
        }
        next()
    }
}