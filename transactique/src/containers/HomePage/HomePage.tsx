import { useEffect, useState } from 'react';
import { fetchCustomerInfo } from '../../actions/get-customer-actions';
import { useDispatch } from '../../hooks/useDispatch';
import { useSelector } from 'react-redux';
import { Customer } from '../../models/Customer';
import { RootState } from '../../reducers';
import AccountDetails from '../../components/AccountDetails/AccountDetails';
import './HomePage.css';
import AccountModal from '../../components/AccountModal/AccountModal';
import AccountCreationModal from '../../components/AccountCreationModal/AccountCreationModal';

const HomePage = () => {
  const dispatch = useDispatch();
  const [customerData, setCustomerData] = useState<Customer[] | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const customerInfo = useSelector((state: RootState) => state.customer?.data);

  const handleAccountCreated = () => {
    setModalVisible(false);
    dispatch(fetchCustomerInfo());
  }
  
  useEffect(() => {
    dispatch(fetchCustomerInfo());
  }, [dispatch]);

  useEffect(() => {
    //Update local state when the Redux store's state changes
    setCustomerData(customerInfo);
  }, [customerInfo]);

  const addNewAccount = () => {
    setModalVisible(!modalVisible);
  }
  const renderAccountSection = () => {
    if(customerData && customerData.length > 0) {
      return (
        <>
          <AccountDetails onAddNewAccount={addNewAccount} displayName={customerData[0].displayName} 
          accounts={customerData[0].accounts}/>
          
        </>
      )
    } else if(customerData && customerData.length === 0) {
      return (
        <>
          <AccountModal/>
        </>
      )      
    }
  }
  return (
    <>
    <div data-testid="home-page">
      {renderAccountSection()}
      { modalVisible && <AccountCreationModal onAccountCreated={handleAccountCreated}/>}
    </div>
      
    </>
    
  )

};

export default HomePage;