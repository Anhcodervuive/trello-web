import { createRoot } from 'react-dom/client'
import CssBaseline from '@mui/material/CssBaseline';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
import { ToastContainer } from 'react-toastify';

// Cấu hình MUI dialog
import { ConfirmProvider } from 'material-ui-confirm';

// Cấu hình redux store
import { Provider } from 'react-redux';
import { store } from '~/redux/store.js';

// Cấu hình react-router-dom với browser router
import { BrowserRouter } from 'react-router-dom';

// Cấu hình redux persist
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'

const persistor = persistStore(store)

import App from './App.jsx'
import theme from './theme.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter basename='/'>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <CssVarsProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <ConfirmProvider defaultOptions={{
            dialogProps: { maxWidth: 'xs' },
            confirmationButtonProps: { variant: 'outlined' },
            cancellationButtonProps: { color: 'inherit' }
          }}>
            <CssBaseline />
            <App />
            <ToastContainer />
          </ConfirmProvider>
        </CssVarsProvider>
      </PersistGate>
    </Provider>
  </BrowserRouter>
)
