import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MantineProvider, type MantineTheme } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { QueryClientProvider } from 'react-query';
import { queryClient } from './api/api';
import './main.css';

const theme: Partial<MantineTheme> = {
  colorScheme: 'dark',
  focusRing: 'auto',
  components: {
    Input: {
      styles: {
        input: {
          backgroundColor: '#000',
          fontSize: '1.1rem',
          padding: '1.5rem 0.5rem'
        }
      }
    },
    Modal: {
      styles: {
        root: {
          backgroundColor: '#000'
        },
        body: {
          backgroundColor: '#000'
        },
        content: {
          borderRadius: '1rem'
        },
        header: {
          backgroundColor: '#000'
        }
      }
    }
  }
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
        <ModalsProvider>
          <BrowserRouter>
            <Routes>
              <Route path='/*' element={<App />} />
            </Routes>
          </BrowserRouter>
        </ModalsProvider>
      </MantineProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
