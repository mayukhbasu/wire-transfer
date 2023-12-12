import mongoose, { Document } from 'mongoose';

export interface IUser extends Document {
  googleId: string;
  displayName: string;
  customer: mongoose.Schema.Types.ObjectId
  // other fields as necessary
}

const userSchema = new mongoose.Schema({
  googleId: { type: String, required: true },
  displayName: { type: String, required: true },
  customer: {type: mongoose.Schema.Types.ObjectId, ref: 'Customer'}
  // other field definitions
});

export const User = mongoose.model<IUser>('User', userSchema);
