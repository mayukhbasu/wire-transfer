import './FundTransfer.css';

const FundTransfer = () => {
  return (
    <div data-testid="fund-transfer" className='container'>
      
      <div className="centered-box">
        <div className='account-transfers'>
          <button>Transfer Own Account</button>
          <button>Transfer Other Account</button>
        </div>
      </div>
    </div>
  );
};

export default FundTransfer;