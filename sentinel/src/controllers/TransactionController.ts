import { Request, Response } from "express";
import { TransactionService } from "../services/TransactionService";
import logger from "../logger";
import { ITransaction } from "../models/Transaction";


enum TransactionType {
  Pending = "pending",
  Completed = "completed",
  Failed = "failed",
  // Add more account types as needed
}


export class TransactionController {

  private transactionService: TransactionService;

  constructor() {
    this.transactionService = new TransactionService();
  }

  public async startTransaction(req: Request, res: Response): Promise<Response> {
    try {
      logger.info("Initiated transaction");
      if (!req.user?.id) {
        return res.status(400).json({ message: 'User ID is missing' });
      }

      // Find the customer ID based on the user's ID
      const customerId = await this.transactionService.findCustomerId(req.user.id);
      if (!customerId) {
        return res.status(404).json({ message: 'Customer not found' });
      }
      logger.info(`Customer Id is ${customerId}`);

      // Construct transaction data
      const transactionData: Partial<ITransaction> = {
        fromAccount: req.body.fromAccount,
        toAccount: req.body.toAccount,
        amount: req.body.amount,
        status: TransactionType.Pending, // Set this to 'pending' by default
        customerId: customerId,
      };

      // Create the transaction and send it to the message queue
      const transaction = await this.transactionService.createTransaction(transactionData);

      // Return the created transaction data
      return res.status(201).json(transaction);
    } catch (err) {
      logger.error('Error in startTransaction:', err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}