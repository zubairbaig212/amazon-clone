import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import './App.css';
import { Checkout } from './components/Checkout/Checkout';
import { Header } from './components/Header/Header';
import { Home } from './components/Home/Home';
import Login from './components/Login/Login';
import { UseStateValue } from './components/StateContext/StateContext';
import { firebaseAuth } from './Firebase';
import { Elements } from '@stripe/react-stripe-js';
import { Payment } from './components/Payment/Payment';
import Orders from './components/Order/Orders';
import { Constants } from './components/Constant';

function App() {
  const { logIn, user } = UseStateValue();
  const location = useLocation();
  const [loggedIn, setLoggedIn] = useState(false);

  const loadStripeKey = loadStripe(Constants.apiKey);
  useEffect(() => {
    firebaseAuth().onAuthStateChanged(checkUser => {
      if (checkUser) {
        setLoggedIn(true);
        logIn(checkUser);

      }
      else {
        setLoggedIn(false);
        logIn(null);
      }
    })
  }, [user,])

  return (
    <div className="App">
      {location.pathname !== Constants.loginPath ? <Header /> : null}
      <Routes>
        <Route path={Constants.homePath} element={<Home />} />
        <Route path={Constants.checkoutPath} element={<Checkout />} />
        <Route path={Constants.paymentPath} element={<Elements stripe={loadStripeKey}><Payment /></Elements>} />
        <Route path={Constants.ordersPath} element={<Orders />} />

        <Route path={Constants.loginPath} element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
