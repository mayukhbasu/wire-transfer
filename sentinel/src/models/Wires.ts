import mongoose, { Document } from 'mongoose';

export interface IWire extends Document {
    fromAccount: string;
    toAccount: string;
    amount: number;
    transferDate: Date;
}

const wireSchema = new mongoose.Schema({
  fromAccount: { type: String, required: true },
  toAccount: { type: String, required: true },
  amount: { type: Number, required: true },
  transferDate: { type: Date, required: true }
});

export const Wire = mongoose.model<IWire>('Wire', wireSchema);
