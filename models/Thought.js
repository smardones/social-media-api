const { Schema, model } = require('mongoose');
const moment = require('moment');

const ReactionSchema = new Schema({

})

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        validate: {
            validator: function(text) {
                if (text.length() > 0 && text.length() <= 280) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    },
    username: {
        type: String,
        required: true
    },
    reactions: [ReactionSchema]
},
{
    toJSON: {
        getters: true,
        virtuals: true
    }
},
)

ThoughtSchema.virtuals('reactionCount').get(function() {
    return this.reactions.length;
});