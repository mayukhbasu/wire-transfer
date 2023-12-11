import mongoose from "mongoose";

interface ICustomer extends Document {
  fullName: string;
  accountIds: mongoose.Schema.Types.ObjectId[];
}

const customerSchema = new mongoose.Schema<ICustomer>({
  fullName: {type: String, required: true},
  
  accountIds: [{type: mongoose.Schema.ObjectId, ref: 'Account'}]
});

const Customer = mongoose.model<ICustomer>('Customer', customerSchema);
export default Customer;