import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import LoginPage from './containers/LoginPage/LoginPage';
import HomePage from './containers/HomePage/HomePage';
import Navbar from './components/Navbar/Navbar';
import FundTransfer from './containers/FundTransfer/FundTransfer';

function App() {
  return (
    <Router>
      <Navbar/>
      <Switch>
        <Route path="/" exact component={LoginPage} />  
        <Route path="/login" component={LoginPage} />
        <Route path="/home" component={HomePage} />
        <Route path="/transfer" component={FundTransfer} />  
      </Switch>
    </Router>
  );
}

export default App;
