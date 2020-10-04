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
            .then(dbUserInfo => res.json(dbUserInfo))
            .catch(err => res.status(400).json({message: 'There is no user with that id'}));
    },

    createNewUser({body}, res) {
        User.create(body)
            .then(dbUserInfo => res.json(dbUserInfo))
            .catch(err => res.status(400).json(err));
    },

    updateUser({params, body}, res) {
        User.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
            .then(dbUserInfo => res.json(dbUserInfo))
            .catch(err => res.status(400).json(err));
    },

    deleteUser({params}, res) {
        User.findOneAndDelete({_id: params.id})
            .then(dbUserInfo => {
                if (!dbUserInfo) {
                    res.status(404).json({message: 'No user found with that id'});
                    return;
                }
                res.json(dbUserInfo)
            })
            .catch(err => res.status(400).json(err));
    },

    addFriend({params}, res) {
        User.findOneAndUpdate(
            {_id: params.userId},
            {$push: {friends: params.friendId}},
            {new: true}
        )
        .then(dbUserInfo => {
            if (!dbUserInfo) {
                res.status(404).json({message: 'Please double check your user and friend IDs'});
                return;
            }
            res.json(dbUserInfo);
        })
        .catch(err => res.status(400).json(err));
    },

    deleteFriend({params}, res) {
        User.findOneAndUpdate(
            {_id: params.userId},
            {$pull: {friends: params.friendId}},
            {new: true}
        )
        .then(dbUserInfo => {
            if (!dbUserInfo) {
                res.status(404).json({message: 'Please double check your user and friend IDs'});
                return;
            }
            res.json(dbUserInfo);
        })
        .catch(err => res.status(400).json(err));
    }
}

module.exports = userControllers;