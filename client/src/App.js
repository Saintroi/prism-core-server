import React, { Component } from 'react';
import {Route, withRouter} from 'react-router-dom';
import Nav from './components/nav';
import ListUser from './components/listUser';
import Callback from './components/callback';
import CreateUser from './components/createUser';
import './App.css';
import auth from './auth'
import GuardedRoute from './components/guardedRoute';
import styled, { keyframes } from 'styled-components';

// Styles  


const AppWrapper = styled.div`
position: relative;
`;

const Grid = styled.div`
  background-color: #F4F4F4
  display: grid;
  grid-template-areas:
    "nav head"
    "nav content";

  grid-template-columns: 150px 1fr;
  grid-template-rows: 50px 1fr;
  grid-auto-columns: 300px;
  grid-gap: 10px;
  transition: 300ms;
  height: 100vh;

  @media only screen and (max-width: 768px) {
    grid-template-areas:
      "nav"
      "head"
      "content";

    grid-template-columns: 1fr;
    grid-template-rows: 8vh 5vh 1fr;
  }
`;

// JSX

class App extends Component {

  constructor(props){
    super(props)
  }

  state = {
    tryingSilent: true,
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
      <AppWrapper key="app" >
        <Grid move={this.state.createVisible}>
        <Nav />
        <GuardedRoute exact path='/' component={ListUser}></GuardedRoute>
        <Route exact path='/callback' component={Callback} />
        </Grid>
      </AppWrapper>
    );
  }
  return 'Loading';
}
}

export default withRouter(App);