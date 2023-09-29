import './navbarStyles.css'
import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, NavLink, Redirect } from 'react-router-dom';
import AuthPage from './components/AuthPage';
import DashboardPage from './components/DashboardPage';
import AddAccountPage from './components/AddAccountPage';
import SendMessagePage from './components/SendMessagePage';
import ViewResponsesPage from './components/ViewResponsesPage';
import Logout from './components/Logout'; // Import Logout


const Navigation = () => {
  return (
     <nav>
      <ul>
        <li>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </li>
        <li>
          <NavLink to="/add-account">Add Account</NavLink>
        </li>
        <li>
          <NavLink to="/send-message">Send Message</NavLink>
        </li>
        <li>
          <NavLink to="/view-responses">View Responses</NavLink>
        </li>
        <li>
          <NavLink to="/logout">Logout</NavLink>
        </li>
      </ul>
    </nav>
  );
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    // Simulate a successful login
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      {isAuthenticated && <Navigation />}
      <Switch>
        <Route exact path="/">
          <AuthPage onLogin={handleLogin} />
        </Route>
        <PrivateRoute
          path="/dashboard"
          component={DashboardPage}
          isAuthenticated={isAuthenticated}
        />
        <PrivateRoute
          path="/add-account"
          component={AddAccountPage}
          isAuthenticated={isAuthenticated}
        />
        <PrivateRoute
          path="/send-message"
          component={SendMessagePage}
          isAuthenticated={isAuthenticated}
        />
        <PrivateRoute
          path="/view-responses"
          component={ViewResponsesPage}
          isAuthenticated={isAuthenticated}
        />
        <Route path="/logout">
          <Logout onLogout={handleLogout} />
        </Route>
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default App;
