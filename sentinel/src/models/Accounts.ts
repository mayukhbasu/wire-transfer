// Account.ts
import mongoose, { Document } from 'mongoose';

export enum AccountType {
  Savings = "savings",
  Checking = "current",
  Investment = "investment",
  // Add more account types as needed
}

interface IAccount extends Document {
  _id: mongoose.Types.ObjectId;
  balance: number;
  createdAt: Date;
  customerId: mongoose.Types.ObjectId;
  type: AccountType;
}

const accountSchema = new mongoose.Schema<IAccount>({
  balance: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  type: { type: String, enum: Object.values(AccountType), required: true }
});

const Account = mongoose.models.Account || mongoose.model<IAccount>('Account', accountSchema);
export default Account;
