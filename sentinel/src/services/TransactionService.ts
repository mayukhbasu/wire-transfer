import mongoose from "mongoose";
import logger from "../logger";
import Customer from "../models/Customer";
import Transaction, { ITransaction } from "../models/Transaction";

export class TransactionService {

  async initiateTransaction(transactionData: ITransaction): Promise<any> {
    return null
  }

  async findCustomerId(userId: string): Promise<mongoose.Types.ObjectId | null> {
    try {
      const customer = await Customer.findOne({ user: userId }).select('_id');
      return customer ? customer._id : null;
    } catch (error) {
      logger.error('Error finding customer ID:', error);
      throw error;
    }
  }

  async createTransaction(transactionData: Partial<ITransaction>) {
    try {
      // Create the transaction in your database
      
      const transaction = new Transaction(transactionData);
      await transaction.save();

      // Send the transaction data to RabbitMQ queue
      //await sendToQueue(transaction);

      //return transaction;
    } catch (error) {
      logger.error('Error creating transaction:', error);
      throw error;
    }
  }
  }
