import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/authPageStyles.css';

const AuthPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const history = useHistory();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async () => {
    if (!username || !password) {
      setError('Please enter both username and password.');
      return;
    }

    setLoading(true);
    setError('');

    // Simulate a login delay for 1.5 seconds (replace with actual login logic)
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simulate a successful login
    const token = 'a_fake_token'; // Replace this with your actual authentication logic
    console.log('Logged in! Token:', token);
    onLogin(token);
    history.push('/dashboard'); // Redirect to the dashboard after login
  };

  return (
    <div>
      <h1>Log in to Continue</h1>
      {error && <div className="error-message">{error}</div>}
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={handleUsernameChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <button onClick={handleLogin} disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </div>
  );
};

export default AuthPage;
