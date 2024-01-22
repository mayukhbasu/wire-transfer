import { createCustomer } from '../../actions/create-account-actions';
import { fetchCustomerInfo } from '../../actions/get-customer-actions';
import { useDispatch } from '../../hooks/useDispatch';
import styles from './AccountModal.module.css';
const AccountModal = () => {

  const dispatch = useDispatch();

  const closeModal = () => {

  }

  const createAccount = () => {
    dispatch(createCustomer(() => {
      dispatch(fetchCustomerInfo())
    }))
  }

  const cancelAccount = () => {

  }

  return (
    <div className={styles.modalBackground} id="modalBackground">
      <div className={styles.modal}>
      <button className={styles.closeModal} onClick={closeModal}>×</button>
      <h4>Would you like to create a new Account?</h4>
      <button onClick={createAccount}>Yes, create account</button>
      <button onClick={cancelAccount}>No,maybe later</button>
      </div>
    </div>
  );
};

export default AccountModal;