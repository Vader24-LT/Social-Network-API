// src/models/Thought.ts

import { Schema, model, Document, Types } from 'mongoose';

/** Reaction subdocument interface. */
export interface IReaction {
  reactionId?: Types.ObjectId;
  reactionBody: string;
  username: string;
  createdAt?: Schema.Types.Date;
}

/** Main Thought document interface. */
export interface IThought extends Document {
  thoughtText: string;
  createdAt: Schema.Types.Date; // We'll store a *real* Date in MongoDB
  username: string;
  reactions: IReaction[];
  reactionCount?: number; // Virtual property
}

// Reaction schema
const ReactionSchema = new Schema<IReaction>(
  {
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
      get: (value: Date) => value.toLocaleString()
    }
  },
  {
    toJSON: {
      getters: true
    },
    id: false
  }
);

// Thought schema
const ThoughtSchema = new Schema<IThought>(
  {
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
      get: (value: Date) => value.toLocaleString()
    },
    username: {
      type: String,
      required: [true, 'Username is required']
    },
    reactions: [ReactionSchema]
  },
  {
    toJSON: {
      getters: true,
      virtuals: true
    },
    id: false
  }
);

// Virtual for reactionCount
ThoughtSchema.virtual('reactionCount').get(function (this: IThought) {
  return this.reactions.length;
});

const Thought = model<IThought>('Thought', ThoughtSchema);
export default Thought;