import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { render, screen } from '@testing-library/react';

import { IConsent } from './contracts';
import { RootState } from '../../store';
import consents from './slice';
import CollectedConsents from './CollectedConsents';

describe('CollectedConsents', () => {
  const renderWithStore = (initialState?: RootState) => {
    const store = configureStore({
      reducer: combineReducers({
        consents
      }),
      preloadedState: initialState
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <CollectedConsents />
        </BrowserRouter>
      </Provider>
    );
  };

  const generateFakeData = (length: number): IConsent[] => {
    return Array.from({ length }, (_, i) => i).map((i) => {
      return {
        id: i.toString(),
        name: `User ${i}`,
        email: `user${i}@example.com`,
        newsletters: i % 2 === 0,
        ads: i % 2 !== 0,
        stats: i % 2 === 0
      };
    });
  };

  describe('initialize', () => {
    it('renders table', () => {
      renderWithStore();

      expect(screen.getByRole('table')).toBeInTheDocument();
    });

    it('renders name, email and consents given column', () => {
      renderWithStore();

      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('Email')).toBeInTheDocument();
      expect(screen.getByText('Consents given for')).toBeInTheDocument();
    });
  });

  describe('empty data', () => {
    it('shows no record exists', () => {
      renderWithStore();

      expect(screen.getByText(/No record exists/)).toBeInTheDocument();
    });
  });

  describe('preloaded data', () => {
    let data: IConsent[];

    beforeEach(() => {
      data = generateFakeData(10);
    });

    it('shows data', () => {
      renderWithStore({
        consents: {
          list: data,
          page: 1
        }
      });

      data.slice(0, 2).forEach((item, index) => {
        expect(screen.getByText(`User ${index}`)).toBeInTheDocument();
        expect(
          screen.getByText(`user${index}@example.com`)
        ).toBeInTheDocument();
      });
    });

    it('shows correct number of pages', () => {
      renderWithStore({
        consents: {
          list: data,
          page: 1
        }
      });

      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument();
      expect(screen.getByText('3')).toBeInTheDocument();
      expect(screen.getByText('4')).toBeInTheDocument();
      expect(screen.getByText('5')).toBeInTheDocument();
    });
  });
});
