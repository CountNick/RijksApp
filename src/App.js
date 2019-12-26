import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/pages/home';
import About from './components/pages/about';
import notFound from './components/pages/notFound';
import Navigation from './components/navigation'

function App() {
  return (
    
    <Router>
    
    <div className="App">

      <Navigation/>
      
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