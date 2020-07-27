import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Headers from './components/Header/Header';
import './App.css';
import Home from './components/Home/Home';
import Checkout from './components/Checkout/Checkout';
import Login from './pages/Login/Login';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/checkout">
            <Headers  />
            <Checkout />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <Headers />
            <Home    />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
