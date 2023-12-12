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

  public async startTransaction(req: Request, res: Response): Promise<any> {
    try {
      logger.info("Initiated transaction");
      if (!req.user?.id) {
        return res.status(400).json({ message: 'User ID is missing' });
      }
      const customerId: any = await this.transactionService.findCustomerId(req.user.id as string);
      logger.info(`Customer Id is ${customerId}`);
      const transactionData: Partial<ITransaction> = {
        fromAccount: req.body.fromAccount,
        toAccount: req.body.toAccount,
        amount: req.body.amount,
        status: TransactionType.Pending, // Or set this to 'pending' by default
        customerId: customerId._id,
        accountId: req.body.accountId
      };
      res.send(transactionData)
      //console.log(transactionData);

    } catch(err) {

    }
  } 

}