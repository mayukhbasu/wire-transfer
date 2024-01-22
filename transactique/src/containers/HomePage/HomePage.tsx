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
import { fetchAvailableAccounts } from '../../actions/available-accounts-actions';

const HomePage = () => {
  const dispatch = useDispatch();
  const [customerData, setCustomerData] = useState<Customer[] | null>(null);
  const [availableAccounts, setAvailableAccounts] = useState<string[]>([])

  const customerInfo = useSelector((state: RootState) => state.customer.data);
  const availableAccountsInfo = useSelector((state: RootState) => state.accounts.data.data)
  const [addNewAccountFlag, setAddNewAccountFlag] = useState(false);
  
  useEffect(() => {
    dispatch(fetchCustomerInfo());
    dispatch(fetchAvailableAccounts())
  }, [dispatch]);

  useEffect(() => {
    //Update local state when the Redux store's state changes
    setCustomerData(customerInfo);
    setAvailableAccounts(availableAccountsInfo)
  }, [customerInfo, availableAccountsInfo]);

  const addNewAccount = () => {
    setAddNewAccountFlag(!addNewAccountFlag);
  }
  console.log(availableAccounts);
  const renderAccountSection = () => {
    if(customerData && customerData.length > 0) {
      return (
        <>
          <AccountDetails displayName={customerData[0].displayName} 
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
      {renderAccountSection()}
      {addNewAccountFlag && <AccountCreationModal/>}
    </>
    
  )

};

export default HomePage;