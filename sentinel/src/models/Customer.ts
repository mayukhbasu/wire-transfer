import mongoose from "mongoose";

interface ICustomer extends Document {
  _id: mongoose.Types.ObjectId;
  accountIds: mongoose.Types.ObjectId[];
  googleId: string;
  __v: number;
}

const customerSchema = new mongoose.Schema<ICustomer>({
  accountIds: [{type: mongoose.Schema.ObjectId, ref: 'Account'}],
  googleId: {type: String, ref: 'User', required: true, unique: true, index: true}
});

const Customer = mongoose.model<ICustomer>('Customer', customerSchema);
export type CustomerType = ICustomer & mongoose.Document;
export default Customer;