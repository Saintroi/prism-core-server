import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import '../App.css';

class Nav extends Component {

  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="navbar-header">
          <Link className="navbar-brand" to="/">Prism Directory</Link>
        </div>
        <ul className="nav navbar-nav">
          <li>
            <Link to="/">All Employees</Link>
          </li>
          <li>
            <Link to="/create">Create Employee</Link>
          </li>
        </ul>
        <ul className="nav navbar-nav navbar-right">
          <li><button className="btn btn-info log">Log In</button></li>
        </ul>
      </nav>
    );
  }
}

export default withRouter(Nav);