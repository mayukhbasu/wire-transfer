import { MongoClient, MongoServerError, ObjectId } from 'mongodb';

// Your MongoDB connection and query code here

import Account, { AccountType } from "../models/Accounts";
import Customer, { CustomerType } from "../models/Customer";
import logger from '../logger';



export class UserService {

  async createCustomerAccount(userData: any): Promise<{success: boolean, error? : string | null}> {
    try {
      const customer = new Customer(userData);
      await customer.save();
      const defaultAccount = new Account({
        balance: 0,
        customerId: customer.id,
        type: AccountType.Savings
      });
      await defaultAccount.save();
      console.log(defaultAccount._id);
      customer.accountIds.push(defaultAccount._id);
      await customer.save();
      return {success: true, error: null};
    } catch(err) {
      console.log(err);
      if(err instanceof MongoServerError && err.code === 11000) {
        return { success: false, error: "A customer with the same full name already exists." };
      }
      return { success: false, error: "A customer with the same full name already exists." }; 
    }
    
  }

  async getCustomerAccount(displayName: string | undefined): Promise<{ fullName?: string, data: CustomerType[], error?: string | null }> {
    if (!displayName) {
        return {data: [], error: "Display name is undefined" };
    }

    try {
        let query = { fullName: displayName };
        const customers = await Customer.find(query).populate('accountIds').exec();
        return { fullName: displayName, data: customers, error: null };
    } catch (error) {
        console.error("An error occurred while fetching customer accounts:", error);
        return { data: [], error: "An error occurred while fetching customer accounts" };
    }
  }

  async getAccountType(userName: string | undefined, accountType: AccountType): Promise<boolean> {
    try {
      const customer = await Customer.findOne({fullName: userName});
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
      const customer = await Customer.findOne({fullName: userName});
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


}