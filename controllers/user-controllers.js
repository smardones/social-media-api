const User = require('../models/Users');

const userControllers = {
    // get all users
    getAllUsers(req, res) {
        User.find()
            .then(dbUserInfo => res.json(dbUserInfo))
            .catch(err => res.status(404).json(err))
    },

    getUserById({params}, res) {
        User.findOne({_id: params.id})
    }
}