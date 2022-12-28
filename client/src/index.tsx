import React from 'react';
import './index.scss'
import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import App from './App';
import Spinner from './components/Spinner';

const container = document.getElementById('root')!;
const root = createRoot(container);
let persistor = persistStore(store)

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={<Spinner />} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

