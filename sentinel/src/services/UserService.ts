import Account, { AccountType } from "../models/Accounts";
import Customer from "../models/Customer";

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
      customer.accountIds.push(defaultAccount._id);
      return {success: true, error: null};
    } catch(err) {
      return {success: false, error: "An error occurred while inserting data"};
    }
    
  }
}