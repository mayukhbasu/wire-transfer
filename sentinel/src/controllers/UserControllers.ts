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
      const userName = req.user?.id;;
      console.log("Full name is ", userName)
      const accounts = await this.userService.getCustomerAccount(userName);
      console.log(accounts.data)
      logger.info("Response has been sent successfully");
      res.send(accounts.data);
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
    logger.info("account type is ",req.body)
    const accountExists = await this.userService.getAccountType(fullName, accountType);
    if(accountExists) {
      return res.send({success: false, message: "Account type already exists"});
      
    } else {
      const newAccount = await this.userService.createNewAccountForExistingUser(fullName as string, accountType);
      res.send({newAccountStatus: newAccount, message: "Account created successfully"});
    }
    //res.send(accountExists);
  }

  public async updatebalance(req: Request, res: Response): Promise<any> {
    try {
      logger.info("Started executing update balance function");
      const fullName = req.user?.displayName;
      const updateBalance = await this.userService.addBalanceToIndividualAccount(fullName as string, req.body);
      if(updateBalance.success) {
        logger.info("balance has been updated successfully");
        return res.send({success: true})
      } else {
        return res.send({success: false})
      }
      
    } catch(err) {
      logger.error(`An error occurred ${err}`);
      return res.send({success: false})
    }
    
  }

  public async getTotalbalance(req: Request, res: Response): Promise<any> {
    logger.info(`Started to execute get total balance`);
    try {
      const fullName = req.user?.displayName;
      if(!fullName) {
        return res.send({success: false, message: `Name does not exist`})
      }
      const result = await this.userService.getTotalBalance(fullName as string);
      res.send({success: true, result});
      logger.info(`Get total balance execution is successful`);
    } catch(err) {
      logger.error(`Get total balance execution has failed`);
      res.send({success: false, message: 'An error occurred while getting the data'});
    }
    
  }
}