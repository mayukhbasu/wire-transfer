import { useEffect, useState } from 'react';
import { fetchCustomerInfo } from '../../actions/customer-actions';
import { useDispatch } from '../../hooks/useDispatch';
import { useSelector } from 'react-redux';
import { Customer } from '../../models/Customer';
import { RootState } from '../../reducers';
import AccountDetails from '../../components/AccountDetails/AccountDetails';
import './HomePage.css';

const HomePage = () => {
  const dispatch = useDispatch();
  const [customerData, setCustomerData] = useState<Customer[] | null>(null);
  const [displayName, setDisplayName] = useState('');

  const customerInfo = useSelector((state: RootState) => state.customer.data);
  const customerName = useSelector((state: RootState) => state.customer)
  useEffect(() => {
    dispatch(fetchCustomerInfo());
  }, [dispatch]);

  useEffect(() => {
    //Update local state when the Redux store's state changes
    setCustomerData(customerInfo);
  }, [customerInfo]);
  return (
    <div className='account-details'>
      {
        customerData && customerData.length > 0 && (
          <AccountDetails accounts={customerData[0].accounts}/>
        )
      }
    </div>
  )

};

export default HomePage;