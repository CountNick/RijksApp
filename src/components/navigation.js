import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

class Navigation extends React.Component {
  render() {
  return (
    
    <React.Fragment>
      <nav>
      <ul className = "nav">
        <li>
          <Link to = "/">Home</Link>
        </li>
        <li>
        <Link to = "/about">About</Link>
        </li>
      </ul>
      </nav>
    </React.Fragment>
  )
}
}
export default Navigation