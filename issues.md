1. Check the type definition for TransactionController.ts
      const customerId: any = await this.transactionService.findCustomerId(req.user.id as string);<--- Need Further modification
      
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