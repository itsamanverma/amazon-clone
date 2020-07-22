import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Headers from './components/Header/Header';
import './App.css';
import Home from './components/Home/Home';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/checkout">
            <Headers />
            checkout
          </Route>
          <Route path="/login">
            login
          </Route>
          <Route path="/">
            <Headers />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
