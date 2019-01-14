import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import auth from '../auth';
import '../App.css';

class Nav extends Component {

  logout = () => {
    auth.logout();
    this.props.history.replace('/');
  };


  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="navbar-header">
          <Link className="navbar-brand" to="/">Prism Directory</Link>
        </div>
        <ul className="nav navbar-nav">
          <li>
            {
             (auth.isAuthenticated()) ? <Link to="/">All Employees</Link> : ''
            }
          </li>
          <li>
            {
              (auth.isAuthenticated()) ? <Link to="/create">Create Employee</Link> : ''

            }
          </li>
        </ul>
        <ul className="nav navbar-nav navbar-right">
          <li>
          {
           (auth.isAuthenticated()) ? (<button className="btn btn-danger log" onClick={() => this.logout()}>Log out </button>) : (<button className="btn btn-info log" onClick={() => auth.login()}>Log In</button>)
          }
          </li>
        </ul>
      </nav>
    );
  }
}

export default withRouter(Nav);