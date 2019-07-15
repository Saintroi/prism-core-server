import React, { useEffect} from 'react';
import {Route, withRouter} from 'react-router-dom';
import Nav from './components/nav';
import ListUser from './components/listUser';
import Callback from './components/callback';
import ErrorBoundary from './components/errorBoundary';
import './App.css';
import auth from './auth'
import GuardedRoute from './components/guardedRoute';
import styled from 'styled-components';

// Styles  

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

function App(props) {

  useEffect(() => {
    if (props.location.pathname === '/callback') return;

    async function tryAuth(){
    try {
      await auth.silentAuth();
      this.forceUpdate();
    } catch (err) {
      if (err.error === 'login_required') return;
      console.error(err.error);
    }
  }

  tryAuth();
  });

  const finished = (auth.tokenLoading || auth.isAuthenticated)

  if(!finished){
    return 'Loading';
  }

  return (
    <ErrorBoundary>
      <Grid >
      <Nav />
      <GuardedRoute exact path='/' component={ListUser}></GuardedRoute>
      <Route exact path='/callback' component={Callback} />
      </Grid>
    </ErrorBoundary>
  );
}

export default withRouter(App);