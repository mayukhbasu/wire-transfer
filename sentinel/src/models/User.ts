import mongoose, { Document } from 'mongoose';

export interface IUser extends Document {
  googleId: string;
  displayName: string;
  // other fields as necessary
}

const userSchema = new mongoose.Schema({
  googleId: { type: String, required: true },
  displayName: { type: String, required: true },
  // other field definitions
});

export const User = mongoose.model<IUser>('User', userSchema);
