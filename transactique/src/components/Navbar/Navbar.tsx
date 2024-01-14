import './Navbar.css'
import { Link } from 'react-router-dom';


const Navbar = () => {
  return (
    <div>
      <nav className='container-fluid'>
        <ul>
          <li>
            <li><Link to="/home"><strong className='nav-logo'>MoneyTrans</strong></Link>
            
            </li>
          </li>
        </ul>
        <ul>
        
            
            <li><Link to="/transfer">Transfer Funds</Link></li>
            <li><Link to="/transfer">Logout</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;