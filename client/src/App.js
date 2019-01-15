import React, { Component } from 'react';
import {Route, withRouter} from 'react-router-dom';
import Nav from './components/nav';
import ListUser from './components/listUser';
import CreateUser from './components/createUser';
import Callback from './components/callback';
import './App.css';
import auth from './auth'
import GuardedRoute from './components/guardedRoute';



class App extends Component {

  state = {
    tryingSilent: true
  };

  async componentDidMount() {
    if (this.props.location.pathname === '/callback') return;
    try {
      await auth.silentAuth();
      this.setState({ tryingSilent: false });
      this.forceUpdate();
    } catch (err) {
      if (err.error === 'login_required') return;
      console.log(err.error);
    }
  }

  render() {
    if (auth.tokenLoading || auth.isAuthenticated) {
    return (
      <div>
        <Nav />
        <GuardedRoute exact path='/' component={ListUser} />
        <GuardedRoute exact path='/create' component={CreateUser} />
        <Route exact path='/callback' component={Callback} />
      </div>
    );
  }
  return 'Loading';
}
}

export default withRouter(App);