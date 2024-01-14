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
      logger.info(userData);
      const customer = new Customer({
        ...userData,
        user: userData.userId
      });
      console.log("user ID is ", userData.userId);
      const checkIfUserExists = await Customer.find({user: new mongoose.Types.ObjectId(userData.userId)});
      console.log("Checking if user exists ", checkIfUserExists);
      if(checkIfUserExists.length) {
        return { success: false, error: "A customer with the same full name already exists." }; 
      }
      await customer.save();
      const defaultAccount = new Account({
        balance: 0,
        customerId: customer.id,
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

  async getCustomerAccount(userId: string | undefined): Promise<{ fullName?: string, data: CustomerType[], error?: string | null }> {
    if (!userId) {
        return {data: [], error: "Display name is undefined" };
    }

    try {
        let query = { user: new mongoose.Types.ObjectId(userId) };
        const customers = await Customer.aggregate([
          {
              $match: query // Your existing query conditions
          },
          {
              $lookup: {
                  from: "users",
                  localField: "user",
                  foreignField: "_id",
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
      
      logger.info(customers);
        return {data: customers, error: null};
    } catch (error) {
        console.error("An error occurred while fetching customer accounts:", error);
        return { data: [], error: "An error occurred while fetching customer accounts" };
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
}