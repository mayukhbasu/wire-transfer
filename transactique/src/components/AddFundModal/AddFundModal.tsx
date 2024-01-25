import React, { FC, FormEvent, useState } from 'react';
import styles from './AddFundModal.module.css';

type AddFundModalProps = {
  accountID: string
}
const AddFundModal: FC<AddFundModalProps> = ({accountID}) => {
  const [amount, setAmount] = useState('');

  const handleAmountChange = (e: FormEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.value);
    setAmount(e.currentTarget.value);
  }
  return (
    <div>
      <div className={styles.modalBackground} id="modalBackground">
        <div className={styles.modal}>
        <button className={styles.closeModal}>×</button>
        <h5>Account Number: {accountID}</h5>
        <input type='text' onChange={handleAmountChange} value={amount}/>
        <button>Cancel</button>
      </div>
    </div>
    </div>
  );
};

export default AddFundModal;