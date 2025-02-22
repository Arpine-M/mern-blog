import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';  
import {Provider} from 'react-redux';
import {store} from './redux/store/store.js';

const queryClient = new QueryClient();


const stripePromise = loadStripe('pk_test_51Qv3avFTyestwOawqP0X16q8S2dxIJ6ltOT11wFSxNuaEJwrguKNkZiN80oZBCj1FUAva8D6Pnco5keMWmxPlrTj0088YO8DTP');
const options = {
  mode: 'payment',
  currency: 'usd',
  amount: 1099,
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <Elements stripe={stripePromise} options={options}>
        <App />
      </Elements>
    </Provider>
    <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>,
)
