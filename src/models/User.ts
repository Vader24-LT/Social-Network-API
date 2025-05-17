import { Schema, model, Document, Types } from 'mongoose';

// 1) Create an interface describing the data shape
export interface IUser extends Document {
  username: string;
  email: string;
  thoughts: Types.ObjectId[];
  friends: Types.ObjectId[];
  friendCount?: number; // for the virtual
}

// 2) Define the schema, referencing your interface
const UserSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      match: [/.+@.+\..+/, 'Must match a valid email address']
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
      }
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  },
  {
    toJSON: {
      virtuals: true
    },
    id: false
  }
);

// 3) Add a virtual to compute friendCount
UserSchema.virtual('friendCount').get(function (this: IUser) {
  return this.friends.length;
});

const User = model<IUser>('User', UserSchema);
export default User;