// src/models/Thought.ts
import { Schema, model, Types } from 'mongoose';
// Reaction schema
const ReactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: [true, 'Reaction text is required'],
        maxlength: 280
    },
    username: {
        type: String,
        required: [true, 'Username is required']
    },
    createdAt: {
        type: Date,
        default: () => new Date(),
        // Mongoose’s TS defs often cause an error for Date getters
        // so we bypass with @ts-ignore
        // @ts-ignore
        get: (value) => value.toLocaleString()
    }
}, {
    toJSON: {
        getters: true
    },
    id: false
});
// Thought schema
const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: [true, 'Thought text is required'],
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: () => new Date(),
        // @ts-ignore
        get: (value) => value.toLocaleString()
    },
    username: {
        type: String,
        required: [true, 'Username is required']
    },
    reactions: [ReactionSchema]
}, {
    toJSON: {
        getters: true,
        virtuals: true
    },
    id: false
});
// Virtual for reactionCount
ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});
const Thought = model('Thought', ThoughtSchema);
export default Thought;
