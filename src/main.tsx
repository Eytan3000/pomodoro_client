import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
// import './index.css'

import { Provider } from 'react-redux';
import store from './store';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './utils/utils.ts';

// const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <Provider store={store}>
    <App />
    </Provider>
    </QueryClientProvider>
  </React.StrictMode>,
)
