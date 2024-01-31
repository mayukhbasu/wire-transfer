import { useSelector } from 'react-redux';
import './FundTransfer.css';
import { RootState } from '../../reducers';
import { useEffect } from 'react';
import { useDispatch } from '../../hooks/useDispatch';
import { fetchExistingCustomerAccount } from '../../actions/existing-customer-account-actions';
import TransferFundForm from '../../components/TransferFundComponents/TransferFundForm/TransferFundForm';

const FundTransfer = () => {

  const accounts = useSelector((state: RootState) => state.getExistingCustomerAccounts.data.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchExistingCustomerAccount())
  }, [dispatch]);
  return (
    <div data-testid="fund-transfer" className='container'>
      
      <div className="centered-box">
        <div className='account-transfers'>
          <button>Transfer Own Account</button>
          <button>Transfer Other Account</button>
        </div>
          <TransferFundForm accounts={accounts}/>
      </div>
    </div>
  );
};

export default FundTransfer;