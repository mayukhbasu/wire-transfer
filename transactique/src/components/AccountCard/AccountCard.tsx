import useMaskAccountNumber from "../../hooks/useMaskAccountNumber";

type AccountProps = {
  account: {
    id: string;
    type: string;
    balance: number;
  }
}
const AccountCard: React.FC<AccountProps> = ({account}) => {
  const maskedId = useMaskAccountNumber(account.id)
  return (
    <div className='account-card'>
        <h3>{account.type.charAt(0).toUpperCase() + account.type.slice(1)} Account</h3>
        <p className="account-number">Account No: {maskedId}</p>
        <p className="balance">Balance: ${account.balance}</p>
    </div>
  );
};

export default AccountCard;