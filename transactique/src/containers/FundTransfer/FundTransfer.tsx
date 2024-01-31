import './FundTransfer.css';

const FundTransfer = () => {
  return (
    <div data-testid="fund-transfer" className='container'>
      
      <div className="centered-box">
        <div className='account-transfers'>
          <button>Transfer Own Account</button>
          <button>Transfer Other Account</button>
        </div>
        <div className='main'>
          <select className='mainAccount' name="cars" id="cars">
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="mercedes">Mercedes</option>
            <option value="audi">Audi</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FundTransfer;