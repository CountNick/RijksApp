//require('dotenv').config()
import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Home from './components/home';
import About from './components/about';


function App() {
  return (
    <Router>
    <div className="App">
      <ul>
        <li>
          <Link to = "/">Home</Link>
        </li>
        <li>
        <Link to = "/about">About</Link>
        </li>
      </ul>
      <div>
        <Switch>
          <Route exact path = "/" component= {Home}/>
          <Route exact path = "/about" component= {About}/>
        </Switch>
      </div>

    </div>
    </Router>
  );
}

export default App;
