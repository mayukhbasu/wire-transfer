import React from 'react';
import { render, screen } from '@testing-library/react';
import TransferFundForm from './TransferFundForm'; // Update the import path as necessary

describe('TransferFundForm Component', () => {
  test('renders "Hello world" text', () => {
    render(<TransferFundForm />);
    const helloWorldElement = screen.getByText('Hello world');
    expect(helloWorldElement).toBeInTheDocument();
  });

  // Additional tests can be added here as the component grows
});
