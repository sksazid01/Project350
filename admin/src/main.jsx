import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './i18n';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import router from './router/index';
import '/src/tailwind.css';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Suspense>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App>
            <RouterProvider router={router} />
          </App>
        </PersistGate>
      </Provider>
    </Suspense>
  </React.StrictMode>
);
