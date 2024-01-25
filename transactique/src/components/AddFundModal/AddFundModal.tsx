import React, { FC, FormEvent, useState } from 'react';
import styles from './AddFundModal.module.css';
import useNumericInput from '../../hooks/useNumericInput';

type AddFundModalProps = {
  accountID: string
}
const AddFundModal: FC<AddFundModalProps> = ({accountID}) => {
  const numericInput = useNumericInput();
  
  return (
    <div>
      <div className={styles.modalBackground} id="modalBackground">
        <div className={styles.modal}>
        <button className={styles.closeModal}>×</button>
        <h5>Account Number: {accountID}</h5>
        <input type='text' onChange={numericInput.handleChange} value={numericInput.value} 
        placeholder='Enter amount in $'/>
        <button>Add</button>
        <button style={{backgroundColor: 'red'}}>Cancel</button>
      </div>
    </div>
    </div>
  );
};

export default AddFundModal;