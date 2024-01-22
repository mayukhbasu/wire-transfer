import { MongoClient, MongoServerError, ObjectId } from 'mongodb';

// Your MongoDB connection and query code here

import Account, { AccountType } from "../models/Accounts";
import Customer, { CustomerType } from "../models/Customer";
import logger from '../logger';
import mongoose from 'mongoose';


interface BalanceUpdateInfo {
  savings?: number;
  current?: number;
  investment?: number;
}

export class UserService {

  async createCustomerAccount(userData: any): Promise<{success: boolean, error? : string | null}> {
    try {
      logger.info("User data is....")
      logger.info(userData);
      const customer = new Customer({
        ...userData,
        user: userData.googleId
      });
      console.log("user ID is ", userData.googleId);
      const checkIfUserExists = await Customer.find({googleId: userData.googleId});
      console.log("Checking if user exists ", checkIfUserExists);
      if(checkIfUserExists.length) {
        return { success: false, error: "A customer with the same full name already exists." }; 
      }
      await customer.save();
      logger.info(`Google ID is ${customer.googleId}`)
      const defaultAccount = new Account({
        balance: 0,
        customerId: customer.googleId,
        type: AccountType.Savings
      });
      await defaultAccount.save();
      console.log("Default account is ", defaultAccount._id);
      customer.accountIds.push(defaultAccount._id);
      await customer.save();
      return {success: true, error: null};
    } catch(err) {
      console.log(err);
      if(err instanceof MongoServerError && err.code === 11000) {
        return { success: false, error: "A customer with the same full name already exists." };
      }
      return { success: false, error: "An error occurred" }; 
    }
    
  }

  async getCustomerAccount(userId: string | undefined): Promise<CustomerType[] | undefined> {
    if (!userId) {
        return [];
    }

    try {
        let query = { googleId: userId };
        const accounts = await Account.find(query);
        console.log("Accounts are....")
        
        const customers = await Customer.aggregate([
          {
              $match: query // Your existing query conditions
          },
          {
              $lookup: {
                  from: "users",
                  localField: "googleId",
                  foreignField: "googleId",
                  as: "userInfo"
              }
          },
          {
              $unwind: "$userInfo"
          },
          {
              $lookup: {
                  from: "accounts", // Assuming 'accounts' is the name of your accounts collection
                  localField: "accountIds",
                  foreignField: "_id",
                  as: "accountDetails"
              }
          },
          {
              $project: {
                  _id: 0, // Exclude the _id field of the top-level document
                  displayName: "$userInfo.displayName", // Include the displayName from the users collection
                  accounts: {
                      $map: {
                          input: "$accountDetails",
                          as: "account",
                          in: {
                              id: "$$account._id",
                              type: "$$account.type", // Include the account type
                              balance: "$$account.balance"
                          }
                      }
                  }
              }
          }
      ]).exec();
      return customers;
    } catch (error) {
        console.error("An error occurred while fetching customer accounts:", error);
        return []
    }
  }

  async getAccountType(userName: string | undefined, accountType: AccountType): Promise<boolean> {
    try {
      const customer = await Customer.findOne({user: new mongoose.Types.ObjectId(userName)});
      logger.info("customer is ", customer);
      if(!customer) {
        return false;
      }
      console.log(accountType);
      const account = await Account.findOne({
        _id: {$in: customer.accountIds},
        type: accountType,
      }).catch((error) => {
        console.error('Error querying the database:', error);
        throw error;
      });
      
      logger.info(account);
      return !!account;
    } catch(error) {
      console.error('Error in getAccountType:', error);
      throw error;
    }
  }

  async createNewAccountForExistingUser(userName: string, accountType: AccountType): Promise<boolean> {
    try {
      logger.info("username is ", userName)
      const customer = await Customer.findOne({user: new mongoose.Types.ObjectId(userName)});
      const newAccount = new Account({
        balance: 0,
        customerId: customer?._id,
        type: accountType,
        createdAt: new Date()
      });
      const savedAccount = await newAccount.save();
      customer?.accountIds.push(savedAccount._id);
      await customer?.save();
      logger.info(`New ${accountType} account created for ${userName}`);
      return true;
    } catch(err) {
      logger.error('Error in createNewAccountForExistingUser:', err);
      throw err;
    }
    
    //return false
  }

  async addBalanceToIndividualAccount(userName: string, balanceAdditionInfo: BalanceUpdateInfo): Promise<{success: boolean, error?: string | undefined}> {
    try {
      const customer = await Customer.findOne({user: new mongoose.Types.ObjectId(userName)});
      
      if(!customer) {
        console.log("Customer is ", customer)
        return {success: false, error: 'User does not exist'}
      }
      const accounts = await Account.find({customerId: customer._id});
      await Promise.all(accounts.map(async account => {
        const accountType = account.type as keyof BalanceUpdateInfo;
        const additionAmount = balanceAdditionInfo[accountType];
        if(additionAmount) {
          account.balance += additionAmount;
          await account.save();
          logger.info(`Added ${additionAmount} to ${accountType} account: ${account._id}`);
        }
      }));
      return { success: true };
    } catch(error) {
      logger.error('Error in addBalanceToIndividualAccounts:', error);
      return { success: false, error: 'An error occurred while updating balances' };
    }
  }

  async getTotalBalance(userID: string): Promise<Number> {
    try {
      let totalBalance = 0;
      logger.info(`Started to execute get total balance`);
      const customerId = await Customer.findOne({user: new mongoose.Types.ObjectId(userID)});
      const accounts = await Account.find({customerId: customerId});
      logger.info(`Accounts are ${accounts}`);
      await Promise.all(accounts.map(async account => {
        totalBalance += account.balance;
        await account.save();
        logger.info(`Total balance is ${totalBalance}`);
      }))
      return totalBalance;
    } catch(error) {
      logger.error(`An error occurred while getting the balance, ${error}`);
      return 0;
    }
  }

  async getAccountTypes(userID: string): Promise<Array<string>> {
    const actualAccountTypes: string[] = ['savings', 'current', 'investment'];
    try {
        logger.info("Started fetching account types");

        // Convert string userID to Mongoose ObjectId
        const objectId = new mongoose.Types.ObjectId(userID);

        // Fetch the accounts for the given customerId
        const accounts = await Account.find({ customerId: objectId }, 'type -_id').exec();
        console.log(accounts);
        // Extract the types from the accounts
        const accountTypes = accounts.map(account => account.type);
        logger.info(`Account Types, ${accountTypes}`);

        // Filter the account types that the user doesn't have
        const availableAccountTypes = actualAccountTypes.filter(type => !accountTypes.includes(type));
        logger.info(`Available Account Types are, ${availableAccountTypes}`);

        return availableAccountTypes;
    } catch (error) {
        logger.error(`Error fetching account types: ${error}`);
        return [];
    }
}


}