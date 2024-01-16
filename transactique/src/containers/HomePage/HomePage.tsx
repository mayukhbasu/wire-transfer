import { useEffect, useState } from 'react';
import { fetchCustomerInfo } from '../../actions/get-customer-actions';
import { useDispatch } from '../../hooks/useDispatch';
import { useSelector } from 'react-redux';
import { Customer } from '../../models/Customer';
import { RootState } from '../../reducers';
import AccountDetails from '../../components/AccountDetails/AccountDetails';
import './HomePage.css';
import AccountModal from '../../components/AccountModal/AccountModal';

const HomePage = () => {
  const dispatch = useDispatch();
  const [customerData, setCustomerData] = useState<Customer[] | null>(null);
  const customerInfo = useSelector((state: RootState) => state.customer.data);
  
  useEffect(() => {
    dispatch(fetchCustomerInfo());
  }, [dispatch]);

  useEffect(() => {
    //Update local state when the Redux store's state changes
    setCustomerData(customerInfo);
  }, [customerInfo]);

  const renderAccountSection = () => {
    if(customerData && customerData.length > 0) {
      return (
        <AccountDetails displayName={customerData[0].displayName} accounts={customerData[0].accounts}/>
      )
    } else if(customerData && customerData.length === 0) {
      console.log(customerData)
      return (
        <>
          <AccountModal/>
        </>
        
      )
      //alert("Would you like to create a new Account?")
    }
  }
  return (
    <>
      <div className='account-details'>
        {renderAccountSection()}
      </div>
    </>
    
  )

};

export default HomePage;