import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Header from './components/Header/Header';
import './App.css';
import Home from './components/Home/Home';
import Checkout from './components/Checkout/Checkout';
import Login from './pages/Login/Login';
import Profile from './pages/Profile/Profile';
import Category from './pages/Category/Category';
import Prime from './pages/Prime/Prime';
import Sell from './pages/Sell/Sell';
import CustomerService from './pages/CustomerService/CustomerService';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import PasswordReset from './pages/PasswordReset/PasswordReset';
import Payment from './components/Payment/Payment';
import { useStateValue } from './StateProvider';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const promise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY || "");

function App() {

  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    const unsubcribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        // user is logged in
        dispatch({
          type: "SET_USER",
          user: authUser
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null
        });
      }
    });
    return () => {
      unsubcribe();
    }
  }, [dispatch]);

  // console.log(user);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/profile" element={
            <>
              <Header />
              <Profile />
            </>
          } />
          <Route path="/category/prime" element={
            <>
              <Header />
              <Prime />
            </>
          } />
          <Route path="/category/sell" element={
            <>
              <Header />
              <Sell />
            </>
          } />
          <Route path="/category/customer-service" element={
            <>
              <Header />
              <CustomerService />
            </>
          } />
          <Route path="/category/:categoryName" element={
            <>
              <Header />
              <Category />
            </>
          } />
          <Route path="/product/:productId" element={
            <>
              <Header />
              <ProductDetail />
            </>
          } />
          <Route path="/checkout" element={
            <>
              <Header />
              <Checkout />
            </>
          } />
          <Route path="/payment" element={
            <>
              <Header />
              <Elements stripe={promise}>
                <Payment />
              </Elements>
            </>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password" element={<PasswordReset />} />
          <Route path="/" element={
            <>
              <Header />
              <Home />
            </>
          } />
          <Route path="/help" element={
            <>
              <Header />
              Amazon
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
