import { useEffect, useState } from 'react';
import { fetchCustomerInfo } from '../../actions/customer-actions';
import { useDispatch } from '../../hooks/useDispatch';
import { useSelector } from 'react-redux';
import { Customer } from '../../models/Customer';
import { RootState } from '../../reducers';

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
  return (
    <div>{customerData ? customerData[0]?.displayName : ''}</div>
  )

};

export default HomePage;