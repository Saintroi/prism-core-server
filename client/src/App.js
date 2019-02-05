import React, { Component } from 'react';
import {Route, withRouter} from 'react-router-dom';
import Nav from './components/nav';
import ListUser from './components/listUser';
import CreateUser from './components/createUser';
import Callback from './components/callback';
import './App.css';
import auth from './auth'
import GuardedRoute from './components/guardedRoute';
import styled from 'styled-components';

const AppWrapper = styled.div`
  background-color: #F4F4F4
  display: grid;
  grid-template-areas:
    "nav head"
    "nav content";

  grid-template-columns: 200px 1fr;
  grid-template-rows: 50px 1fr;
  grid-gap: 10px;
  
  height: 100vh;

  @media only screen and (max-width: 768px) {
    grid-template-areas:
      "nav"
      "head"
      "content"

    grid-template-columns: 1fr 200px;
    grid-template-rows:
      minmax(75px, auto)
      1fr minmax(75px, auto)
      auto;
  }
`;


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
      <AppWrapper>
        <Nav />
        <GuardedRoute exact path='/' component={ListUser} />
        <GuardedRoute exact path='/create' component={CreateUser} />
        <Route exact path='/callback' component={Callback} />
      </AppWrapper>
    );
  }
  return 'Loading';
}
}

export default withRouter(App);