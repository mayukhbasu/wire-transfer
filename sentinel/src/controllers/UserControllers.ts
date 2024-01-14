import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import logger from "../logger";
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
      console.log("Full name is ", fullName)
      const userId = req.user?.id;
      const result = await this.userService.createCustomerAccount({fullName, userId});
      if(!result.success) {
        console.error('Error creating customer:', result.error);
        return res.status(400).json({error: result.error });
      }
      console.log('Customer and savings account created successfully');
      res.status(201).json({ message: 'Customer and savings account created successfully'});
    } catch(err) {
      console.error('Unexpected error in createCustomer:', err);
      res.status(500).json({error: err });
    }
  }

  public async getUserAccounts(req: Request, res: Response): Promise<void> {
    try {
      logger.info("Fetching customer and accounts");
      const customerID = req.user?.id;
      logger.info("Full name is ", customerID)
      const accounts = await this.userService.getCustomerAccount(customerID);
      logger.info(accounts)
      logger.info("Response has been sent successfully");
      res.send(accounts);
    } catch(err) {
      
      logger.error("Error while sending response");
      res.send({error: "Error while sending response"});
    }
  }

  public async createOtherAccounts(req: Request, res: Response): Promise<any> {
    logger.info("Started exuting create other accounts");
    const customerID = req.user?.id;
    const accountType = req.body.accountType as AccountType;
    const acceptedAccountTypes = ['savings', 'current', 'investment'];
    if(!acceptedAccountTypes.includes(accountType)) {
      return res.status(400).send({ message: 'Invalid account type. Accepted types are savings, current, and investment.' });
    }
    logger.info("account type is ",req.body)
    const accountExists = await this.userService.getAccountType(customerID, accountType);
    if(accountExists) {
      return res.send({success: false, message: "Account type already exists"});
      
    } else {
      const newAccount = await this.userService.createNewAccountForExistingUser(customerID as string, accountType);
      res.send({newAccountStatus: newAccount, message: "Account created successfully"});
    }
    //res.send(accountExists);
  }

  public async updatebalance(req: Request, res: Response): Promise<any> {
    try {
      logger.info("Started executing update balance function");
      const customerID = req.user?.id;
      const updateBalance = await this.userService.addBalanceToIndividualAccount(customerID as string, req.body);
      if(updateBalance.success) {
        logger.info("balance has been updated successfully");
        return res.send({success: true, message: 'balance has been updated successfully'})
      } else {
        return res.send({success: false, message: 'error updating balance'})
      }
      
    } catch(err) {
      logger.error(`An error occurred ${err}`);
      return res.send({success: false, message: err})
    }
    
  }

  public async getTotalbalance(req: Request, res: Response): Promise<Response | undefined> {
    logger.info(`Started to execute get total balance`);
    try {
      const customerID = req.user?.id;
      if(!customerID) {
        return res.send({success: false, message: `Name does not exist`})
      }
      const result = await this.userService.getTotalBalance(customerID as string);
      res.send({success: true, result});
      logger.info(`Get total balance execution is successful`);
    } catch(err) {
      logger.error(`Get total balance execution has failed`);
      return res.send({success: false, message: 'An error occurred while getting the data'});
    }
    
  }
}