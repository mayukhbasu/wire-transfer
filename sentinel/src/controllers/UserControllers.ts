import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import logger from "../logger";
import { CustomerType } from "../models/Customer";
import { AccountType } from "../models/Accounts";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public async createUserAccount(req: Request, res: Response): Promise<any> {
    try {
      logger.info("Starting to create new customer and account");
      const fullName = req.user?.displayName;
      const result = await this.userService.createCustomerAccount({fullName});
      if(!result.success) {
        console.error('Error creating customer:', result.error);
        return res.status(400).json({ message: 'Error creating customer', error: result.error });
      }
      console.log('Customer and savings account created successfully');
      res.status(201).json({ message: 'Customer and savings account created successfully'});
      
    } catch(err) {
      console.error('Unexpected error in createCustomer:', err);
      res.status(500).json({ message: 'Unexpected error creating customer and account', error: err });
    }
  }

  public async getUserAccounts(req: Request, res: Response): Promise<void> {
    try {
      logger.info("Fetching customer and accounts");
      const userName = req.user?.displayName;
      const accounts = await this.userService.getCustomerAccount(userName);
      logger.info("Response has been sent successfully");
      res.send(accounts);
    } catch(err) {
      
      logger.error("Error while sending response");
      res.send({error: "Error while sending response"});
    }
  }

  public async createOtherAccounts(req: Request, res: Response): Promise<any> {
    logger.info("Started exuting create other accounts");
    const fullName = req.user?.displayName;
    const accountType = req.body.accountType as AccountType;
    const acceptedAccountTypes = ['savings', 'current', 'investment'];
    if(!acceptedAccountTypes.includes(accountType)) {
      return res.status(400).send({ message: 'Invalid account type. Accepted types are savings, current, and investment.' });
    }
    logger.info("account typoe is ",req.body)
    const accountExists = await this.userService.getAccountType(fullName, accountType);
    if(accountExists) {
      return res.send({success: false, message: "Account type already exists"});
      
    } else {
      const newAccount = await this.userService.createNewAccountForExistingUser(fullName as string, accountType);
      res.send({newAccountStatus: newAccount, message: "Account created successfully"});
    }
    //res.send(accountExists);
  }
}