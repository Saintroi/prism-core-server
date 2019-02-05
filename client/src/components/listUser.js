import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import auth from '../auth';
import styled, { keyframes } from 'styled-components';
import createIcon from '../img/add-contact.svg'


const LIST_USERS = gql`
  query AllUsers {
    users {
      id
      name
      firstName
      lastName
      email
      cellPhone
      title
      location
    }
  }
`

const CURRENT_USER = gql`
  query CurrentUser {
    me {
      id
      name
      admin
    }
  }

`

const UserHeader = styled.div`
  color: #8298A3;
  display: grid;
  grid-template-columns: 2fr 2fr 3fr 2fr 2fr 1fr;
  grid-template-rows: 100%;
  align-items: end;

  span{
    font-size: 1.5vmin;
    text-align: center;

  }
`;

const UserCols = styled.div`
  padding: 1px 16px;
  height: 100%;
  width: auto;
  grid-area: content;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-template-rows: 2%;
  grid-auto-rows: 8%;
  grid-gap:10px

  @media screen and (max-width: 768px) {
    width: 100%;
    height: auto;
    position: relative;
}
`;

const UserRow = styled.div`
  color: black;
  background-color: white;
  border-radius: 25px;
  text-align: center;
  align-items: center;
  display: grid;
  grid-template-columns: 2fr 2fr 3fr 2fr 2fr 1fr;
  grid-template-rows: 100%;
  transition: background-color 300ms;

  span {
    font-size: 2vmin;
  }

  &:hover {
    background-color: #559FD3;
  }

`;

const StyledLink = styled(Link)`
  text-transform: uppercase;
  font-family: Helvetica, Arial, PT Sans Narrow, Arial Narrow, Arial, Helvetica, sans-serif;
  font-size: 1.5vmin;
  color: #00467E;
  width: 5%
  height: auto;
  transition: background-color 300ms;

  &:hover {
    background-color: #559FD3
    text-decoration: none;
  }

  &:focus, &:active {
    text-decoration: none;
  }

  img{
    width: 90%;
    height: 90%;
  }

`;

const HeadWrap = styled.div`
  display: flex;
  margin: 0;
  padding: 0;
  width: 100%;
  height: auto;
  grid-area: head;
  align-content: baseline;
  justify-content: center;

`;

const SearchBar = styled.input`
  margin: 5px;
  border-radius: 0px;
  width: 80%;
`;

function compare(a,b) {
  if (a.lastName < b.lastName)
    return -1;
  if (a.lastName > b.lastName)
    return 1;
  return 0;
}


class ListUser extends Component {

  state = {
    searchQuery: ''
  }

  handleSearchChange = (event) => {
    this.setState({searchQuery:event.target.value});
  }

  handleSearch = (users) => {
    let newUsers = []
    const str = this.state.searchQuery.toLowerCase()

    users.forEach(function(user) {
      console.log(user.name, user.cellPhone)
      if(user.name.toLowerCase().includes(str) || user.cellPhone.toLowerCase().includes(str)) newUsers.push(user);
    })

    return newUsers.sort(compare);
  }


  render(){
    return(
      <React.Fragment>
      <Query query= {LIST_USERS}>
        {({ loading, error, data}) => {
          if (loading) return <p>Loading...</p>;
          if (error){
            if(error.message === "GraphQL error: jwt malformed") return auth.signOut();
            return <p>{error.message}</p>;
          } 
    
          return (
            <React.Fragment>
            <HeadWrap>
              <SearchBar onChange={this.handleSearchChange.bind(this)} placeholder=" Search by name or cell #..." autoFocus />
              {
              (auth.isAdmin())? 
              <StyledLink to="/create" ><img src={createIcon} alt=""/></StyledLink> : null
              }
            </HeadWrap>
            <UserCols>

              <UserHeader>
                <span>NAME</span>
                <span>TITLE</span>
                <span>EMAIL</span>
                <span>CELL #</span>
                <span>LOCATION</span>
              </UserHeader>
              {!loading &&
                this.handleSearch(data.users).map(user => (
                  <UserRow key={user.id}>
                    <span>{ user.name }</span>
                    <span>{ user.title }</span>
                    <span>{ user.email }</span>
                    <span>{ user.cellPhone }</span>
                    <span>{ user.location }</span>
                    </UserRow>
                  ))}
              </UserCols>
              </React.Fragment>
            );
          }}
        </Query>
    
    
        <Query query={CURRENT_USER}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error){
            if(error.message === "GraphQL error: jwt malformed") return auth.signOut();
            return <p>{error.message}</p>;
          }
          if(data.me.admin) auth.setAdmin();
          return(<div></div>);
        }}
        </Query>
      </React.Fragment>
      );
    }
  }

  export default withRouter(ListUser);
