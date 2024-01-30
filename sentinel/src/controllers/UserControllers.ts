import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import logger from "../logger";
import { AccountType } from "../models/Accounts";

interface UserResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  private sendResponse<T>(res: Response, statusCode: number, response: UserResponse<T>): Response {
    res.set('Cache-Control', 'no-store');
    return res.status(statusCode).json(response);
  }

  public async createUserAccount(req: Request, res: Response): Promise<Response> {
    try {
      logger.info("Starting to create new customer and account");
      const fullName = req.user?.displayName;
      console.log("Full name is ", fullName)
      const googleId = req.user?.googleId;
      
      const result = await this.userService.createCustomerAccount({fullName, googleId});
      if(!result.success) {
        console.error('Error creating customer:', result.error);
        return this.sendResponse(res, 400, { success: false, message: 'Customer with this name already exists', error: 'Customer with this name already exists' });

      }
      console.log('Customer and savings account created successfully');
      return this.sendResponse(res, 200, { success: true, message: 'Success', data: 'Customer and savings account created successfully' });
    } catch(err: any) {
      logger.error('Unexpected error in createCustomer:', err);
      return this.sendResponse(res, 500, { success: false, message: 'An unexpected error occurred', error: err});

    }
  }

  public async getUserAccounts(req: Request, res: Response): Promise<Response> {
    try {
      logger.info("Fetching customer and accounts");
      const customerID = req.user?.googleId;
      logger.info("Full name is ", customerID)
      const accounts = await this.userService.getCustomerAccount(customerID as string);
      logger.info("Accounts are ", accounts);
      logger.info("Response has been sent successfully");
      return this.sendResponse(res, 200, { success: true, message: 'Success', data: accounts });

    } catch(err) {
      
      logger.error("Error while sending response");
      return this.sendResponse(res, 500, { success: true, message: 'Success', error: "Error while sending response" });
    }
  }

  public async createOtherAccounts(req: Request, res: Response): Promise<Response> {
    logger.info("Started exuting create other accounts");
    const customerID = req.user?.googleId;
    const accountType = req.body.accountType as AccountType;
    const acceptedAccountTypes = ['savings', 'current', 'investment'];
    if(!acceptedAccountTypes.includes(accountType)) {
      return res.status(400).send({ message: 'Invalid account type. Accepted types are savings, current, and investment.' });
    }
    logger.info("account type is ",req.body)
    const accountExists = await this.userService.getAccountType(customerID as string, accountType);
    if(accountExists) {
      return this.sendResponse(res, 400, { success: false, message: 'Account already exists'});

    } else {
      const newAccount = await this.userService.createNewAccountForExistingUser(customerID as string, accountType);
      return this.sendResponse(res, 200, { success: true, message: 'Account created successfully'});
    }
  }

  public async updatebalance(req: Request, res: Response): Promise<Response> {
    try {
      logger.info("Started executing update balance function");
      
      const customerID = req.user?.googleId;
      const updateBalanceSuccess = await this.userService.addBalanceToIndividualAccount(customerID as string, req.body);
      if(updateBalanceSuccess) {
        logger.info("balance has been updated successfully");
        // return res.send({success: true, message: 'balance has been updated successfully'})
        return this.sendResponse(res, 200, { success: true, message: 'balance has been updated successfully'});

      } else {
        // return res.send({success: false, message: 'error updating balance'})
        return this.sendResponse(res, 400, { success: false, message: 'error updating balance'});

      }
      
    } catch(err) {
      logger.error(`An error occurred ${err}`);
      // return res.send({success: false, message: err})
      return this.sendResponse(res, 500, { success: false, message: 'An error occurred while updating the data'});

    }
    
  }

  public async getTotalbalance(req: Request, res: Response): Promise<Response> {
    logger.info(`Started to execute get total balance`);
    try {
      const customerID = req.user?.googleId;
      if(!customerID) {
        // return res.send({success: false, message: `Name does not exist`})
        return this.sendResponse(res, 400, { success: false, message: 'Name does not exist'});

      }
      const result = await this.userService.getTotalBalance(customerID as string);
      logger.info(`Get total balance execution is successful`);
      return this.sendResponse(res, 200, { success: false, message: 'Get total balance execution is successful', data: result});
      
    } catch(err) {
      logger.error(`Get total balance execution has failed`);
      return this.sendResponse(res, 500, { success: false, message: 'An error occurred while getting the data'});

    }
    
  }

  public async getAvailableAccounts(req: Request, res: Response): Promise<string[] | undefined | Response> {
    try {
      logger.info("Started executing getAvailableAccounts inside userController");
      const customerID = req.user?.googleId;
      if(!customerID) {
        return this.sendResponse(res, 400, { success: false, message: 'Customer does not exist'});
      }
      const accounts = await this.userService.getAvailableAccounts(customerID as string);
      logger.info(`Accounts are ${accounts}`);
      return this.sendResponse(res, 200, { success: true, message: 'Accounts fetch successful', data: accounts});
    } catch(err) {
      logger.error(`Get total balance execution has failed`);
      return this.sendResponse(res, 500, { success: false, message: 'An error occurred while getting the data'});
    }
  }
}