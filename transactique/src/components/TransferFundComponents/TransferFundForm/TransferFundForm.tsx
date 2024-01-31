import { ChangeEvent, FC } from 'react';
import { Account } from '../../../models/Account';
import './TransferFundForm.css';
import useExcludableSelect from '../../../hooks/useExcludableSelect';

type accounts = {
  accounts: Account[]
}
const TransferFundForm: FC<accounts> = ({accounts}) => {
  const {availableAccounts, handleSelectAccount} = useExcludableSelect(accounts)
  return (
    <div>
      <div className='main'>
          <select className='mainAccount' name="sourceAccount" id="sourceAccount" onChange={(e: ChangeEvent<HTMLSelectElement>) => handleSelectAccount(e.target.value)}>
            {
              accounts.map((account, key) => (
                <option key={key}  value={account.accountNumber}>{account.accountNumber} ({account.type})</option>
              ))
            }
          </select>
          
        </div>
        <div className='main'>
          <select className='mainAccount' name="destinationAccount" id="destinationAccount">
            {
              availableAccounts.map((account, key) => <option key={key}>{account.accountNumber} ({account.type})</option>)
            }
          </select>
          
        </div>
    </div>
  );
};

export default TransferFundForm;