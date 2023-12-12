import mongoose, { Schema } from 'mongoose';
 enum TransactionType {
  Pending = "pending",
  Completed = "completed",
  Failed = "failed",
  // Add more account types as needed
}

export interface ITransaction extends Document {
  fromAccount: string;
  toAccount: string;
  amount: number;
  status: TransactionType;
  customerId: mongoose.Types.ObjectId;
  createdAt: Date;
}

const transactionSchema = new Schema<ITransaction>({
  fromAccount: {type: String, required: true},
  toAccount: {type: String, required: true},
  amount: {type: Number, required: true},
  status: {type: String, enum: Object.values(TransactionType), required: true},
  createdAt: {type: Date, default: Date.now },
  customerId: {type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true},
});

const Transaction = mongoose.model<ITransaction>('Transaction', transactionSchema);
export default Transaction;






