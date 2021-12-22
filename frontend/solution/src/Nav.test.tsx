import { BrowserRouter } from 'react-router-dom';

import { render, screen } from '@testing-library/react';

import Nav from './Nav';

describe('Nav', () => {
  const renderWithRouter = () => {
    render(
      <BrowserRouter>
        <Nav />
      </BrowserRouter>
    );
  };

  describe('initialize', () => {
    it('renders navigation links', () => {
      renderWithRouter();

      expect(screen.getByText('Give Consent')).toBeInTheDocument();
      expect(screen.getByText('Collected Consents')).toBeInTheDocument();
    });
  });
});
