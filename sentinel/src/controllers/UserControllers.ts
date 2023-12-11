import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import logger from "../logger";

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
}