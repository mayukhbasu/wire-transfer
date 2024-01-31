import { useState } from "react";
import useMaskAccountNumber from "../../../hooks/useMaskAccountNumber";
import './AccountCard.css';
import AddFundModal from "../AddFundModal/AddFundModal";
import { useDispatch } from "../../../hooks/useDispatch";
import { updateBalance } from "../../../actions/update-balance-actions";
import { fetchCustomerInfo } from "../../../actions/get-customer-actions";

type AccountProps = {
  account: {
    accountNumber: string;
    type: string;
    balance: number;
  }
}
type AccountType = 'savings' | 'current' | 'investment';

const AccountCard: React.FC<AccountProps> = ({account}) => {

  const [isOpenModal, setIsOpenModal] = useState(false);
  const dispatch = useDispatch();

  const openModal = () => setIsOpenModal(true);
  
  const handleAddFunds = (amount: number) => {
    setIsOpenModal(false);
    dispatch(updateBalance(amount, account.type as AccountType)).then(() => dispatch(fetchCustomerInfo()));
  }

  const cancelAddFunds = () => {
    setIsOpenModal(false);
  }
  
  const maskedId = useMaskAccountNumber(account.accountNumber)
  return (
    <div className='account-card'>
      <button className="add-balance" onClick={openModal}>+</button>
        <h3>{account.type.charAt(0).toUpperCase() + account.type.slice(1)} Account</h3>
        <p className="account-number">Account No: {maskedId}</p>
        <p className="balance">Balance: ${account.balance}</p>
        {
          isOpenModal && (
            <AddFundModal addFunds={handleAddFunds} cancelFundTransfer={cancelAddFunds} accountID={account.accountNumber}/>
          )
        }
    </div>
  );
};

export default AccountCard;