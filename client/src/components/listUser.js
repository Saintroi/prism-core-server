import React from 'react';
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import auth from '../auth';
import '../App.css';

const LIST_USERS = gql`
  query AllUsers {
    users {
      id
      firstName
      lastName
      email
      cellPhone
      title
      location
    }
  }
`

export default () => (
  <Query query={LIST_USERS}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error){
        if(error.message === "GraphQL error: jwt malformed") return auth.signOut();
        return <p>{error.message}</p>;
      } 

      return (
        <div className="col-sm-12">
          {!loading &&
            data.users.map(user => (
              <div className="col-sm-4" key={user.id}>
                <div className='pa3 bg-black-05 ma3'>

                    <div className='user'>
                      <h3 align="center"> { user.firstName }&nbsp; </h3>
                      <h3 align="center"> { user.lastName }&nbsp; </h3>
                      
                    </div>
                  </div>
                </div>
            ))}
        </div>
      );
    }}
  </Query>
);