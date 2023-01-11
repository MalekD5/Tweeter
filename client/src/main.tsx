import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { NextUIProvider, createTheme } from '@nextui-org/react';
import { Provider } from 'react-redux';
import { store } from 'redux/Store';
import './main.css';

const theme = createTheme({
  type: 'dark'
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <NextUIProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path='/*' element={<App />} />
          </Routes>
        </BrowserRouter>
      </NextUIProvider>
    </Provider>
  </React.StrictMode>
);
