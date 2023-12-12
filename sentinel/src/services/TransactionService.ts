import { ObjectId } from "mongoose";
import logger from "../logger";
import Customer from "../models/Customer";
import { ITransaction } from "../models/Transaction";

export class TransactionService {

  async initiateTransaction(transactionData: ITransaction): Promise<any> {
    return null
  }

  async findCustomerId(userId: string): Promise<any> {
    const customerId = await Customer.findOne({user: userId}, "customerId._id");
    logger.info(customerId);
    return customerId;
  }
}