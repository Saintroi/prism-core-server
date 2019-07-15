import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import auth from '../auth';
import styled from 'styled-components';
import LoadingDots from './Animations/animatedLoading';
import CreateUser from './createUser';
import EditUser from './editUser';


const LIST_USERS = gql`
  query AllUsers {
    users {
      id
      name
      firstName
      lastName
      email
      cellPhone
      officePhone
      title
      location
      type
      admin
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
  grid-template-columns: 2fr 3fr 2fr 2fr 2fr 1fr;
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
  grid-template-rows: .02fr;
  grid-auto-rows: .08fr;
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
  grid-template-columns: 2fr 3fr 2fr 2fr 2fr 1fr;
  grid-template-rows: 1fr;
  grid-gap: 5px;
  transition: background-color 300ms;
  font-family: Helvetica, Arial, PT Sans Narrow, Arial Narrow, Arial, Helvetica, sans-serif;
  font-size: 1.5vmin;

  span {
    font-size: 2vmin;
  }

  &:hover {
    background-color: #559FD3;
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
  margin-top: 8px;
  border-radius: 0px;
  width: 80%;
  text-indent 5px;
`;


function compare(a,b) {
  if (a.lastName < b.lastName)
    return -1;
  if (a.lastName > b.lastName)
    return 1;
  return 0;
}


function ListUser(props) {

  const [loading, setLoading] = useState(true)

  const [searchQuery, setSearchQuery] = useState('');
  const search = React.createRef();

  function handleSearchChange(event) {
    setSearchQuery(event.target.value);
    search.current.focus();
  }

  function handleSearch(users) {
    let newUsers = []
    const str = searchQuery.toLowerCase()

    users.forEach(function(user) {
      if(user.name.toLowerCase().includes(str) || user.cellPhone.toLowerCase().includes(str)) newUsers.push(user);
    })

    return newUsers.sort(compare);
  }

  useEffect(() => {

    !loading && search.current.focus()

  });


    return(
      <React.Fragment>
        <Query query={CURRENT_USER}>
        {({ loading, error, data }) => {
          if (loading) return <LoadingDots></LoadingDots>;
          if (error){
            if(error.message === "GraphQL error: jwt malformed") return auth.signOut();
            return <p>{error.message}</p>;
          }
          if(data.me.admin) auth.setAdmin();
          auth.setId(data.me.id);
          return(<div></div>);
        }}
        </Query>

      <Query 
        query = {LIST_USERS} 
        pollInterval={60000}
      >
        {({ loading, error, data, refetch}) => {
          if (loading) return <LoadingDots></LoadingDots>;
          if (error){
            console.error(error.message)
            return auth.signOut();
            }
            setLoading(false);
          return (
            <React.Fragment>
              <CreateUser queryRefresh = {() => refetch()}></CreateUser>
            <HeadWrap>
              <SearchBar onChange={handleSearchChange} placeholder=" Search by name or cell #..." ref={search}/>
            </HeadWrap>
            <UserCols>

              <UserHeader>
                <span>NAME</span>
                <span>EMAIL</span>
                <span>OFFICE #</span>
                <span>CELL #</span>
                <span>LOCATION</span>
              </UserHeader>
              {!loading &&
                handleSearch(data.users).map(user => (
                  <UserRow key={user.id}>
                    <span>{ user.name }</span>
                    <span>{ user.email }</span>
                    <span>{ user.officePhone }</span>
                    <span>{ user.cellPhone }</span>
                    <span>{ user.location }</span>
                    <EditUser user = {user} queryRefresh = {() => refetch()}></EditUser>
                    </UserRow>
                  ))}
              </UserCols>
              </React.Fragment>
            );
          }}
        </Query>
      </React.Fragment>
      );
    }

  export default withRouter(ListUser);
