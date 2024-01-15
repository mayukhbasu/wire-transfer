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
  return (
    <>
    <h2>Welcome {displayName} </h2>
    <div className="account-details">
      {
        accounts.map((account, index) => (
          <AccountCard key={index} account={account}/>
        ))
      }
    </div>
  </>
  );
};

export default AccountDetails;