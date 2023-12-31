import mongoose from "mongoose";

interface ICustomer extends Document {
  _id: mongoose.Types.ObjectId;
  fullName: string;
  accountIds: mongoose.Types.ObjectId[];
  user: mongoose.Schema.Types.ObjectId;
  __v: number;
}

const customerSchema = new mongoose.Schema<ICustomer>({
  fullName: {type: String, required: true, unique: true},
  accountIds: [{type: mongoose.Schema.ObjectId, ref: 'Account'}],
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
});

const Customer = mongoose.model<ICustomer>('Customer', customerSchema);
export type CustomerType = ICustomer & mongoose.Document;
export default Customer;