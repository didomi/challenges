import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import Api from './api';
import { consentsLoad } from './features/consent/slice';
import { store } from './store';

import App from './App';

store.dispatch(consentsLoad(Api));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
