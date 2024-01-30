import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import App from './App';
import LoginPage from './containers/LoginPage/LoginPage';
import HomePage from './containers/HomePage/HomePage';
import Navbar from './components/Navbar/Navbar';
import FundTransfer from './containers/FundTransfer/FundTransfer';

// Mock the child components
jest.mock('./containers/LoginPage/LoginPage', () => () => <div>LoginPage</div>);
jest.mock('./containers/HomePage/HomePage', () => () => <div>HomePage</div>);
jest.mock('./components/Navbar/Navbar', () => () => <div>Navbar</div>);
jest.mock('./containers/FundTransfer/FundTransfer', () => () => <div>FundTransfer</div>);

describe('App Component', () => {
  it('renders LoginPage for root path', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('LoginPage')).toBeInTheDocument();
  });

  it('renders LoginPage for /login path', () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('LoginPage')).toBeInTheDocument();
  });

  it('renders HomePage for /home path', () => {
    render(
      <MemoryRouter initialEntries={['/home']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('HomePage')).toBeInTheDocument();
    expect(screen.queryByText('Navbar')).toBeInTheDocument();
  });

  it('renders FundTransfer for /transfer path', () => {
    render(
      <MemoryRouter initialEntries={['/transfer']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('FundTransfer')).toBeInTheDocument();
    expect(screen.queryByText('Navbar')).toBeInTheDocument();
  });

  it('does not render Navbar on the login and root path', () => {
    const { rerender } = render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.queryByText('Navbar')).not.toBeInTheDocument();

    rerender(
      <MemoryRouter initialEntries={['/login']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.queryByText('Navbar')).not.toBeInTheDocument();
  });
});
