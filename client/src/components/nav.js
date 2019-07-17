import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import auth from '../auth';
import dirIcon from '../img/contacts.svg'
import styled from 'styled-components';
import logo from '../img/PrismLogo.png';

// styles

const NavWrap = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  margin: 0;
  padding: 0;
  width: 150px;
  position fixed;
  height: 100%;
  overflow: auto;
  grid-area: nav;

  @media screen and (max-width: 768px) {
      width: 100%;
      height: auto;
      position: relative;
      border-width: 0px 0px 1px 0px;
      flex-direction: row;


  }
`;

const NavList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column

  @media screen and (max-width: 768px) {
    flex-direction: row;
    display: inline-flex;
  }
`;

const NavLink = styled.li`
  display: flex;
  align-self: center;
  justify-content: flex-start;
  padding: 20px;
  margin: auto;
  text-align: center;
  border-style: solid;
  width: 100%;
  height: 100%;
  border-width: 0px;
  transition: background-color 300ms, border-width 300ms;

  &:hover {
    text-decoration: none;
    border-color: #00467E;
    border-width: 0px 0px 0px 3px;
    background-color: #559FD3

  }

  @media screen and (max-width: 768px) {
    display: inline-flex
    height: 100%;
    width: auto;
    margin-bottom: 10px;
    border-width: 0px;
    justify-content: center;

    &:hover {
      text-decoration: none;
      border-color: #00467E;
      border-width: 3px 0px 0px 0px;
      background-color: #559FD3
  
    }
  }
`;

const StyledLink = styled(Link)`
  text-transform: uppercase;
  font-family: Helvetica, Arial, PT Sans Narrow, Arial Narrow, Arial, Helvetica, sans-serif;
  font-size: 1.5vmin;
  color: #00467E;
  width: 100%;
  height: 100%;

  &:focus, &:active, &:hover{
    text-decoration: none;
  }

  img{
    width: 2.5vmin
    height: 2.5vmin
  }

`;

const LogButton = styled.button`
  background: #00467E;
  color: white;
  width: 90%;
  height: auto;
  font-size: 2vmin;
  text-transform: uppercase;
  margin-bottom: 10px;
  margin-left: 5px;
  margin-top: auto;

  @media screen and (max-width: 768px) {
    display: inline-flex
    height: 80%;
    width: auto;
    margin-bottom: 10px;
    margin-left: auto;
  }

`;

const PrismLogo = styled.div`
  width: 90%;
  height: auto;
  align-self: flex-end;
  margin: 10px 10px 20px 10px;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

//JSX

function Nav(props) {

  const logout = () => {
    auth.logout();
    props.history.replace('/');
  };


  return (
    <NavWrap>
      <PrismLogo> <img src={logo} alt="Prism Systems, Inc."></img> </PrismLogo>
      <NavList>

        <NavLink>
        {
          (auth.isAuthenticated()) ? <StyledLink to="/"> <img src={dirIcon} alt=""/>&nbsp;&nbsp; Directory</StyledLink> : ''
        }
      </NavLink>
      
      </NavList>
      
      {
        (auth.isAuthenticated()) ? (<LogButton onClick={() => logout()}>Log out </LogButton>) : (<LogButton onClick={() => auth.login()}>Log In</LogButton>)
      }
    </NavWrap>

    );
  }

export default withRouter(Nav);