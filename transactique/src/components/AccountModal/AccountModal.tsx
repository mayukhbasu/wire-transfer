import './AccountModal.css';
const AccountModal = () => {

  const closeModal = () => {

  }

  const createAccount = () => {

  }

  const cancelAccount = () => {

  }

  return (
    <div className='modal-background' id="modalBackground">
      <div className='modal'>
      <button className="close-modal" onClick={closeModal}>×</button>
      <h4>Would you like to create a new Account?</h4>
      <button onClick={createAccount}>Yes, create account</button>
      <button onClick={cancelAccount}>No,maybe later</button>
      </div>
    </div>
  );
};

export default AccountModal;