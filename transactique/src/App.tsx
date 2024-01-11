import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import LoginPage from './containers/LoginPage/LoginPage';
import HomePage from './containers/HomePage/HomePage';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/home" component={HomePage} />
        <Route path="/" exact component={LoginPage} />  
      </Switch>
    </Router>
  );
}

export default App;
