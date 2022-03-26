import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { render, screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';

import { IApi } from '../../api';
import consents from './slice';
import GiveConsent from './GiveConsent';

describe('GiveConsent', () => {
  const renderWithStore = (api: IApi) => {
    const store = configureStore({
      reducer: combineReducers({
        consents
      })
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <GiveConsent api={api} />
        </BrowserRouter>
      </Provider>
    );
  };

  const nameTextBox = () =>
    screen.getByPlaceholderText('Name') as HTMLInputElement;

  const emailTextBox = () =>
    screen.getByPlaceholderText('Email') as HTMLInputElement;

  const newslettersCheckBox = () =>
    screen.getByLabelText(/newsletters/) as HTMLInputElement;

  const adsCheckBox = () =>
    screen.getByLabelText(/targeted ads/) as HTMLInputElement;

  const statsCheckBox = () =>
    screen.getByLabelText(/visit statistics/) as HTMLInputElement;

  const submitButton = () => screen.getByRole('button') as HTMLButtonElement;

  describe('initialize', () => {
    it('renders form', () => {
      renderWithStore({} as unknown as IApi);

      expect(nameTextBox()).toBeInTheDocument();
      expect(emailTextBox()).toBeInTheDocument();
      expect(newslettersCheckBox()).toBeInTheDocument();
      expect(adsCheckBox()).toBeInTheDocument();
      expect(statsCheckBox()).toBeInTheDocument();
      expect(submitButton()).toBeInTheDocument();
    });
  });

  describe('validation', () => {
    describe('empty name', () => {
      it('shows name is required', async () => {
        renderWithStore({} as unknown as IApi);
        user.click(submitButton());

        expect(
          await screen.findByText(/Name is a required field/)
        ).toBeInTheDocument();
      });
    });

    describe('empty email', () => {
      it('shows email is required', async () => {
        renderWithStore({} as unknown as IApi);

        user.type(nameTextBox(), 'User');
        user.click(submitButton());

        expect(
          await screen.findByText(/Email is a required field/)
        ).toBeInTheDocument();
      });
    });

    describe('invalid email', () => {
      it('shows valid email is required', async () => {
        renderWithStore({} as unknown as IApi);

        user.type(nameTextBox(), 'User');
        user.type(emailTextBox(), 'invalid email');
        user.click(submitButton());

        expect(
          await screen.findByText(/must be a valid email/)
        ).toBeInTheDocument();
      });
    });

    describe('no consent checked', () => {
      it('shows one of the checkbox must be checked', async () => {
        renderWithStore({} as unknown as IApi);

        user.type(nameTextBox(), 'User');
        user.type(emailTextBox(), 'user@example.com');
        user.click(submitButton());

        expect(
          await screen.findByText(/checkbox must be checked/)
        ).toBeInTheDocument();
      });
    });
  });

  describe('submit', () => {
    it('makes api call', async () => {
      const apiCreateConsent = jest.fn(() =>
        Promise.resolve(Date.now().toString())
      );

      const api = {
        createConsent: apiCreateConsent
      } as unknown as IApi;

      renderWithStore(api);

      user.type(nameTextBox(), 'User');
      user.type(emailTextBox(), 'user@example.com');
      user.click(newslettersCheckBox());
      user.click(adsCheckBox());
      user.click(statsCheckBox());
      user.click(submitButton());

      await waitFor(() => {
        expect(apiCreateConsent).toHaveBeenCalledWith({
          name: 'User',
          email: 'user@example.com',
          newsletters: true,
          ads: true,
          stats: true
        });
      });
    });
  });
});
