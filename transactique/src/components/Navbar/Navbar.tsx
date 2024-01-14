import './Navbar.css'
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
  const history = useHistory();
  const handleLogout = async() => {
    try {
      await axios.get('/auth/logout');
      history.push('/login');
    }catch (error) {
      console.error('Logout failed:', error);
    }
  }
  return (
    <div>
      <nav className='container-fluid'>
        <ul>
          <li>
            <Link to="/home"><strong className='nav-logo'>MoneyTrans</strong></Link>
          </li>
        </ul>
        <ul>
            <Link to="/transfer"><li>Transfer Funds</li></Link>
            <li onClick={handleLogout}>Logout</li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;