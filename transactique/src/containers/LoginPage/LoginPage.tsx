import React from 'react';
import './LoginPage.css';

const LoginPage = () => {

  const handleLogin = () => {
    window.location.href = 'http://localhost:3000/auth/google';
  }
  return (
    <div className="loginContainer" data-testid="login-page">
      <h1 className="title">Welcome to Wires</h1>
      <button className="googleButton" onClick={handleLogin}>
        Sign in with Google
      </button>
    </div>
  );
};

export default LoginPage;