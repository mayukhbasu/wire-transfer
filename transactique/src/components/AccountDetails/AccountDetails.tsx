import AccountCard from '../AccountCard/AccountCard';
import './AccountDetails.css';

type AccountDetailsProps = {
  accounts: {
    id: string;
    type: string;
    balance: number;
  }[]
}
const AccountDetails: React.FC<AccountDetailsProps> = ({accounts}) => {
  return (
    <>
    <h2>Welcome</h2>
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