import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet
} from "react-router-dom";
import Header from './components/Header/Header';
import './App.css';
import Home from './components/Home/Home';
import Checkout from './components/Checkout/Checkout';
import Login from './pages/Login/Login';
import Profile from './pages/Profile/Profile';
import Account from './pages/Account/Account';
import Orders from './pages/Orders/Orders';
import Category from './pages/Category/Category';
import Prime from './pages/Prime/Prime';
import Sell from './pages/Sell/Sell';
import CustomerService from './pages/CustomerService/CustomerService';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import PasswordReset from './pages/PasswordReset/PasswordReset';
import SearchResults from './pages/SearchResults/SearchResults';
import Payment from './components/Payment/Payment';
import { useStateValue } from './StateProvider';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const promise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY || "");

const MainLayout = () => (
  <>
    <Header />
    <Outlet />
  </>
);

function App() {
  const [, dispatch] = useStateValue();

  useEffect(() => {
    const unsubcribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
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

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password" element={<PasswordReset />} />

          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/account" element={<Account />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/payment" element={
              <Elements stripe={promise}>
                <Payment />
              </Elements>
            } />
            <Route path="/category/prime" element={<Prime />} />
            <Route path="/category/sell" element={<Sell />} />
            <Route path="/category/customer-service" element={<CustomerService />} />
            <Route path="/category/:categoryName" element={<Category />} />
            <Route path="/product/:productId" element={<ProductDetail />} />
            <Route path="/search/:query" element={<SearchResults />} />
            <Route path="/help" element={<div>Amazon Help</div>} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
