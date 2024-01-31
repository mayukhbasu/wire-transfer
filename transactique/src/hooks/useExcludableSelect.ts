import { useState } from 'react';
import { Account } from '../models/Account';

const useExcludableSelect = (initialAccounts: Account[]) => {
  const [selectedAccount, setSelectedAccount] = useState('');
  const [availableAccounts, setAvailableAccounts] = useState(initialAccounts);

  const handleSelectAccount = (accountNumber: string) => {
    setSelectedAccount(accountNumber);
    // Use accountNumber directly for filtering and exclude the selected account
    setAvailableAccounts(initialAccounts.filter(account => account.accountNumber !== accountNumber));
  };

  return { selectedAccount, availableAccounts, handleSelectAccount };
};

export default useExcludableSelect;
