import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Home from './components/home';
import About from './components/about';
import notFound from './components/notFound';

function App() {
  return (
    
    <Router>
    
    <div className="App">
      <nav>
      <ul class = "nav">
        <li>
          <Link to = "/">Home</Link>
        </li>
        <li>
        <Link to = "/about">About</Link>
        </li>
      </ul>
      </nav>
      
      <div>
        <Switch>
          <Route exact path = "/" component= {Home}/>
          <Route exact path = "/about" component= {About}/>
          <Route exact path = "*" component = {notFound}/>
        </Switch>
      </div>

    </div>
    </Router>
  );
}

export default App;