import { useEffect } from 'react';
import { fetchCustomerInfo } from '../../actions/customer-actions';
import { useDispatch } from '../../hooks/useDispatch';

const HomePage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCustomerInfo())
  })
  return (
    <div>
      In the home screen
    </div>
  );
};

export default HomePage;