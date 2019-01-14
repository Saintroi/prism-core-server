import React, { Component } from 'react';
import {Route, withRouter} from 'react-router-dom';
import Nav from './components/nav';
import ListUser from './components/listUser';
import CreateUser from './components/createUser';
import Callback from './components/callback';
import './App.css';

class App extends Component {

  render() {
    return (
      <div>
        <Nav />
        <Route exact path='/' component={ListUser} />
        <Route exact path='/create' component={CreateUser} />
        <Route exact path='/callback' component={Callback} />
      </div>
    );
  }
}

export default withRouter(App);