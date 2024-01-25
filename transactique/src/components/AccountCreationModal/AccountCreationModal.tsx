import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import styles from  './AccountCreationModal.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../reducers';
import { fetchAvailableAccounts } from '../../actions/available-accounts-actions';
import { useDispatch } from '../../hooks/useDispatch';
import { createAnotherAccount } from '../../actions/create-other-accounts-actions';


interface AccountCreationModalProps {
  onAccountCreated: () => void;
}

const AccountCreationModal: FC<AccountCreationModalProps> = ({ onAccountCreated }) => {
  const [accountType, setAccountType] = useState('');
  const [availableAccounts, setAvailableAccounts] = useState<string[]>([]);
  const dispatch = useDispatch();

  const availableAccountsInfo = useSelector((state: RootState) => {
    return state.accounts.data.data
  });
  const handleAccountTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAccountType(event.target.value);
    console.log(accountType);
  };

  useEffect(() => {
    dispatch(fetchAvailableAccounts())
  }, [dispatch]);

  useEffect(() => {
    setAvailableAccounts(availableAccountsInfo)
  }, [availableAccountsInfo])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const selectedType = formData.get('account-type');
    dispatch(createAnotherAccount(selectedType as string)).then(() => {
      onAccountCreated(); // This will be called after the account creation
      console.log('Account created:', selectedType);
    });
  };
  return (
    <div className={styles.modalBackground} id="modalBackground">
      
  <div className={styles.modal}>
    <button className={styles.closeModal}>×</button>
    <h2>Add Account</h2>
    <form id='account-form' onSubmit={handleSubmit}>
      {
        availableAccounts.map((account, key) => (
          <label htmlFor={`${account}-account`} key={key}>
            <input type='radio' id={`${account}-account`} name='account-type' 
            value={account} checked={accountType === account} onChange={handleAccountTypeChange}/>
            {account} Account
          </label>
        ))
      }
      <button type="submit">Add Account</button>
    </form>
  </div>
</div>
  );
};

export default AccountCreationModal;