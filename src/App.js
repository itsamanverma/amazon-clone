import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/checkout">checkout</Route>
          <Route path="/login">login</Route>
          <Route path="/">Homepage</Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
