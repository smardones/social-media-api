const { Thought, User } = require('../models');

const thoughtController = {
    getAllThoughts(req, res) {
        Thought.find()
            .then(dbThoughtInfo => res.json(dbThoughtInfo))
            .catch(err => res.status(404).json(err));
    },

    getThoughtById({params}, res) {
        Thought.findOne({_id: params.id})
            .then(dbThoughtInfo => res.json(dbThoughtInfo))
            .catch(err => res.status(404).json(err));
    },

    createNewThought({body}, res) {
        Thought.create(body)
            .then(({_id}) => {
                return User.findOneAndUpdate(
                    {_id: body.userId},
                    {$push: {thoughts: _id}},
                    {new: true}
                )
            })
            .then(dbThoughtData => {
                if(!dbThoughtData) {
                    res.status(404).json({message: 'No user with this ID'});
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
    },

    updateThought({params, body}, res) {
        Thought.findOneAndUpdate({_id: params.id}, body, {new: true})
        .then(dbThoughtInfo => res.json(dbThoughtInfo))
        .catch(err => res.status(400).json({message: 'No thought found with this ID'}));
    },

    deleteThought({params}, res) {
        Thought.findOneAndDelete({_id: params.id})
            .then(dbThoughtInfo => {
                if (!dbThoughtInfo) {
                    res.status(404).json({message: 'No thought found with that id'});
                    return;
                }
                res.json(dbThoughtInfo)
            })
            .catch(err => res.status(400).json(err));
    },

    createReaction({params, body}, res) {
        Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            {$push: {reactions: body.json}},
            {new: true}
        )
        .then(dbThoughtInfo => {
            if (!dbThoughtInfo) {
                res.status(400).json({message: 'No thought found with this id'})
            }
            console.log(dbThoughtInfo);
            res.json(dbThoughtInfo);
        })
        .catch(err => res.status(404).json(err));
    },

    removeReaction({params}, res) {
        Thought.findByIdAndUpdate(
            {_id: params.thoughtId},
            {$pull: {reactions: params.reactionId}},
            {new: true}
        )
        .then(dbThoughtInfo => {
            console.log(dbThoughtInfo);
            res.json(dbThoughtInfo)
        })
        .catch(err => res.status(400).json(err))
    }
}

module.exports = thoughtController;