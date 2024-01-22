import AccountCard from '../AccountCard/AccountCard';
import './AccountDetails.css';

type AccountDetailsProps = {
  accounts: {
    id: string;
    type: string;
    balance: number;
  }[],
  displayName: string;
};


const AccountDetails: React.FC<AccountDetailsProps> = ({accounts, displayName}) => {

  const addNewAccount = () => {

  }
  return (
    <>
    <h3 style={{marginTop:'70px', marginLeft:'40px'}}>Welcome, {displayName} </h3>
    <div className="account-details">
      {
        accounts.map((account, index) => (
          <AccountCard key={index} account={account}/>
        ))
        
      }
      <button className='add-account' onClick={addNewAccount}>+</button>
    </div>
  </>
  );
};

export default AccountDetails;