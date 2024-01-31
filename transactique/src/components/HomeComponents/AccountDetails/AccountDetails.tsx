import AccountCard from '../AccountCard/AccountCard';
import './AccountDetails.css';

type AccountDetailsProps = {
  accounts: {
    accountNumber: string;
    type: string;
    balance: number;
  }[],
  displayName: string;
  onAddNewAccount: () => void
};


const AccountDetails: React.FC<AccountDetailsProps> = ({accounts, displayName, onAddNewAccount}) => {
  return (
    <>
    <h3 style={{marginTop:'70px', marginLeft:'40px'}}>Welcome, {displayName} </h3>
    <div className="account-details">
      
      {
        accounts.map((account, index) => (
          <AccountCard key={index} account={account}/>
        ))
        
      }
      {accounts.length < 3 && <button className='add-account' onClick={onAddNewAccount}>+</button>}
    </div>
  </>
  );
};

export default AccountDetails;