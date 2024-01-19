import styles from  './AccountCreationModal.module.css';

const AccountCreationModal = () => {
  return (
    <div className={styles.modalBackground} id="modalBackground">
  <div className={styles.modal}>
    <button className={styles.closeModal}>×</button>
    <h2>Add Account</h2>
    <form id="account-form">
      <label htmlFor="savings-account">
        <input type="radio" id="savings-account" name="account-type" value="Savings"/>
        Savings Account
      </label>
      <label htmlFor="current-account">
        <input type="radio" id="current-account" name="account-type" value="Current"/>
        Current Account
      </label>
      <label htmlFor="investment-account">
        <input type="radio" id="investment-account" name="account-type" value="Investment"/>
        Investment Account
      </label>
      <button type="submit">Add Account</button>
    </form>
  </div>
</div>
  );
};

export default AccountCreationModal;