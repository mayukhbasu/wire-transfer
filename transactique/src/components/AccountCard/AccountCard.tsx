import { useState } from "react";
import useMaskAccountNumber from "../../hooks/useMaskAccountNumber";
import './AccountCard.css';
import AddFundModal from "../AddFundModal/AddFundModal";

type AccountProps = {
  account: {
    id: string;
    type: string;
    balance: number;
  }
  addAmountToAccount: (amount: number, accountNumber: string) => void
}
const AccountCard: React.FC<AccountProps> = ({account, addAmountToAccount}) => {

  const [isOpenModal, setIsOpenModal] = useState(false);

  const openModal = () => setIsOpenModal(true);
  
  const handleAddFunds = () => {

  }

  const cancelAddFunds = () => {
    setIsOpenModal(!isOpenModal);
  }
  
  const maskedId = useMaskAccountNumber(account.id)
  return (
    <div className='account-card'>
      <button className="add-balance" onClick={openModal}>+</button>
        <h3>{account.type.charAt(0).toUpperCase() + account.type.slice(1)} Account</h3>
        <p className="account-number">Account No: {maskedId}</p>
        <p className="balance">Balance: ${account.balance}</p>
        {
          isOpenModal && (
            <AddFundModal addFunds={handleAddFunds} cancelFundTransfer={cancelAddFunds} accountID={account.id}/>
          )
        }
    </div>
  );
};

export default AccountCard;