const {Schema, Types}= require('mongoose');

const dateFormat = require('../utils/dateFormat');

const reactionSchema = new Schema(
    {
        reactionId:{
            type:Schema.Types.ObjectID,
            default: () => new Types.ObjectID()
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => dateFormat(timestamp),
        },
    },
    {
        toJSON: {
            getters: true
        },
        id: false
    }
);

module.exports= reactionSchema;