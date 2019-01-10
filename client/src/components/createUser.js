import React, { Component } from 'react';
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";

const ADD_USER = gql`

mutation addUser($input: UserInput!){
  
  createUser(input: $input){
   firstName
   lastName
   email
   title
   admin
   
 }
 }

`

class CreateUser extends Component {
    render(){
        return(
        <Mutation mutation={ADD_USER} onCompleted={() => window.location.href="/" }>
        {(createUser, { data, loading, error }) => (
          <div>
            <div className='w-100 pa4 flex justify-center'>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  createUser({ variables: {
                      input:{
                          firstName: this.first.value,
                          lastName: this.last.value,
                          email: this.email.value,
                          title: this.title.value,
                          admin: this.admin.checked,
                          location: this.location.value,
                          cellPhone: this.cell.value,
                          officePhone: this.office.value,
                          type: this.type.value
                   }
                  }});
  
                  this.first.value = "";
                  this.last.value = "";
                  this.email.value = "";
                  this.title.value = "";
                  this.admin.value = "";
                  this.location.value = "";
                  this.cell.value = "";
                  this.office.value = "";
                  this.type.value = "";
                }}
              >
  
  
              <div style={{ maxWidth: 400 }} className=''>
                <label> First Name: </label>
                <input
                  className='w-100 pa3 mv2'
                  type="text"
                  required
                  placeholder='First name of user'
                  ref={node => this.first = node} />
  
                <label> Last Name: </label>
                <input
                  className='w-100 pa3 mv2'
                  type="text"
                  required
                  placeholder='Last name of user'
                  ref={node => this.last = node} />
  
                <label> Email: </label>
                <input
                  className='w-100 pa3 mv2'
                  type="email"
                  required
                  placeholder='Email of user'
                  ref={node => this.email = node} />
  
                <label> Cell Phone: </label>
                <input
                  className='w-100 pa3 mv2'
                  type="tel"
                  min="1"
                  max="10"
                  placeholder='Cell number of user'
                  ref={node => this.cell = node} />
  
                <label> Office Phone: </label>
                <input
                  className='w-100 pa3 mv2'
                  type="tel"
                  min="1"
                  max="10"
                  placeholder='Office number of user'
                  ref={node => this.office = node} />
  
  
                <label> Title: </label>
                <input
                  className='w-100 pa3 mv2'
                  type="text"
                  min="1"
                  max="10"
                  placeholder='Title of user'
                  ref={node => this.title = node} />
  
  
                <label> Location: </label>
                <input
                  className='w-100 pa3 mv2'
                  type="text"
                  min="1"
                  max="10"
                  placeholder='Office location of user'
                  ref={node => this.location = node} />
  
              <label> Type: &nbsp; </label>
                <select
                  ref={select => this.type = select}
                  name="type" >
                  <option value="">Select a type</option>
                  <option value="employee">Employee</option>
                  <option value="manager">Manager</option>
                  <option value="executive">Executive</option>
                </select> <br></br>

                    <label> Admin Priviledges: &nbsp;</label>
                    <input
                    type="checkbox"
                    ref={node => this.admin = node} />
                    </div>
  
              {loading && <p>Loading...</p> }
              {error && <p>Error :( Please try again</p>}
  
              <button type="submit">Add User</button>
              </form>
            </div>
          </div>
        )}
    </Mutation>
        )
    }
}

export default CreateUser;