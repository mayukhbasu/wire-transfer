import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import styles from  './AccountCreationModal.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../reducers';
import { fetchAvailableAccounts } from '../../actions/available-accounts-actions';
import { useDispatch } from '../../hooks/useDispatch';

const AccountCreationModal = () => {
  const [accountType, setAccountType] = useState('Savings');
  const [availableAccounts, setAvailableAccounts] = useState<string[]>([]);
  const dispatch = useDispatch();

  const availableAccountsInfo = useSelector((state: RootState) => state.accounts.data.data);
  const handleAccountTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAccountType(event.target.value);
  };

  useEffect(() => {
    dispatch(fetchAvailableAccounts())
  }, [dispatch]);

  useEffect(() => {
    setAvailableAccounts(availableAccountsInfo)
  }, [availableAccountsInfo])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  console.log(availableAccounts);
  return (
    <div className={styles.modalBackground} id="modalBackground">
  <div className={styles.modal}>
    <button className={styles.closeModal}>×</button>
    <h2>Add Account</h2>
    <form id="account-form" onSubmit={handleSubmit}>
      <label htmlFor="savings-account">
        <input
          type="radio"
          id="savings-account"
          name="account-type"
          value="Savings"
          checked={accountType === 'Savings'}
          onChange={handleAccountTypeChange}
        />
        Savings Account
      </label>
      <label htmlFor="current-account">
        <input
          type="radio"
          id="current-account"
          name="account-type"
          value="Current"
          checked={accountType === 'Current'}
          onChange={handleAccountTypeChange}
        />
        Current Account
      </label>
      <label htmlFor="investment-account">
        <input
          type="radio"
          id="investment-account"
          name="account-type"
          value="Investment"
          checked={accountType === 'Investment'}
          onChange={handleAccountTypeChange}
        />
        Investment Account
      </label>
      <button type="submit">Add Account</button>
    </form>
  </div>
</div>
  );
};

export default AccountCreationModal;