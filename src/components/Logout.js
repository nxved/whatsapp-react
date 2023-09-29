import React from 'react';
import { useHistory } from 'react-router-dom';

const Logout = ({ onLogout }) => {
  const history = useHistory();

  const handleLogout = () => {
    onLogout();
    history.push('/'); // Redirect to the authentication page
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default Logout;
