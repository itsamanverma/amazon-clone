import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Header from './components/Header/Header';
import './App.css';
import Home from './components/Home/Home';
import Checkout from './components/Checkout/Checkout';
import Login from './pages/Login/Login';
import Payment from './components/Payment/Payment';
import { useStateValue } from './StateProvider';
import { auth } from './firebase';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const promise = loadStripe("pk_test_51HQbdZAxFXfllBdK2a4aRUjx0gZdVkamCLibSXushOmmwgjfKQb7DeUPvB4lf9G9bDuxbAJuzRR5ILNOFzqUQK9t00pVwCvBso");

function App() {

  const [{ user }, dispatch] = useStateValue();
  /* using the useEffect concept */
  /*  */

  useEffect(() => {
    const unsubcribe = auth.onAuthStateChanged((authUser) => {
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

  console.log(user);


  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <Header />
            <Home />
          </Route>
          <Route path="/help">
            <Header />
              Amazon
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
