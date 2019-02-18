import React, { Component } from 'react';
import {Route, withRouter} from 'react-router-dom';
import Nav from './components/nav';
import ListUser from './components/listUser';
import Callback from './components/callback';
import CreateUser from './components/createUser';
import './App.css';
import auth from './auth'
import GuardedRoute from './components/guardedRoute';
import posed, { PoseGroup } from 'react-pose';
import styled from 'styled-components';

// Animations

const SlideCreate = posed.div({
  enter: {
    x: '90%',
    opacity: 1,
    transition: {duration: 300}
  },

  exit: {
    x: '-100%',
    opacity: 0,
    transition: {duration: 300}
  }
})

const gridProps = {
  default: {
    width: '100vw', 
    transition: { duration: 300}
  },
  move: {
    width: '80vw', 
    transition: {duration: 300}
  }
}


// Styles

const AppWrapper = styled.div`
  display: flex;

`;

const Grid = styled(posed.div(gridProps))`
  background-color: #F4F4F4
  display: grid;
  grid-template-areas:
    "nav head"
    "nav content";

  grid-template-columns: 200px 1fr;
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

    this.toggleCreate = this.toggleCreate.bind(this)
  }

  state = {
    tryingSilent: true,
    createVisible: false
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

  toggleCreate = () => {
    this.setState({
      createVisible: !this.state.createVisible
    });
  };

  render() {
    if (auth.tokenLoading || auth.isAuthenticated) {
    return (
      <PoseGroup toggleCreate={this.toggleCreate}>
        <AppWrapper key="app" >
          <Grid pose={this.state.createVisible ? 'move' : 'default'}>
          <Nav />
          <GuardedRoute exact path='/' component={(props) => <ListUser {...props} toggleCreate={this.toggleCreate} />}></GuardedRoute>
          <Route exact path='/callback' component={Callback} />
          </Grid>
          {this.state.createVisible &&
          <SlideCreate key="create">
            <CreateUser></CreateUser>
          </SlideCreate>}
        </AppWrapper>
      </PoseGroup>
    );
  }
  return 'Loading';
}
}

export default withRouter(App);