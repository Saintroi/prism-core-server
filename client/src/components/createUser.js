import React, { Component } from 'react';
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import styled from 'styled-components';
import auth from '../auth';


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

const FormWrapper = styled.div`
  padding: 1px 16px;
  height: 100%;
  grid-area: content;

  @media screen and (max-width: 768px) {
    width: 100%;
    height: auto;
    position: relative;
}
`;

const InputWrapper = styled.div`
  display: block;
  padding: 20px;
`;

const TextInput = styled.input`
  display: inline-block;
  margin-left: 20px;
  height: auto;
  width: 60%;
  padding: 5px;
`;

const ItemLabel = styled.label`
  display: inline-block;
  text-align: Right;
  width: 30%
  height: auto;
`;

const SelectInput = styled.select`
  display: inline-block;
  margin-left: 20px;
  height: auto;
  width: 60%;
  padding: 5px;
`;

const CheckInput = styled.input`
  display: inline-block;
  -ms-transform: scale(1.5); /* IE */
  -moz-transform: scale(1.5); /* FF */
  -webkit-transform: scale(1.5); /* Safari and Chrome */
  -o-transform: scale(1.5); /* Opera */
  vertical-align: middle;
  width: 50%;
  padding: 5px;
  float: right;
`;

const AddBtn = styled.button`
  background: #00467E;
  color: white;
  width: 30%;
  height: auto;
  font-size: 16px;
  text-transform: uppercase;
  margin-left: 40%;
`;

class CreateUser extends Component {
    render(){
        return(
        <Mutation mutation={ADD_USER} onCompleted={() => window.location.href="/" }>
        {(createUser, { data, loading, error }) => (
          <FormWrapper>
            {
            (auth.isAdmin())? 
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
              
            <InputWrapper>
              <ItemLabel> First Name: </ItemLabel>
              <TextInput
                type="text"
                autoFocus
                required
                placeholder='First name of user'
                ref={node => this.first = node} />
              </InputWrapper>
              
            <InputWrapper>
              <ItemLabel> Last Name: </ItemLabel>
              <TextInput
                type="text"
                required
                placeholder='Last name of user'
                ref={node => this.last = node} />
              </InputWrapper>

            <InputWrapper>
              <ItemLabel> Email: </ItemLabel>
              <TextInput
                type="email"
                required
                placeholder='Email of user'
                ref={node => this.email = node} />
              </InputWrapper>

            <InputWrapper>
              <ItemLabel> Cell Phone: </ItemLabel>
              <TextInput
                type="tel"
                min="1"
                max="10"
                placeholder='Cell number of user'
                ref={node => this.cell = node} />
              </InputWrapper>

            <InputWrapper>
              <ItemLabel> Office Phone: </ItemLabel>
              <TextInput
                type="tel"
                min="1"
                max="10"
                placeholder='Office number of user'
                ref={node => this.office = node} />
              </InputWrapper>

            <InputWrapper>
              <ItemLabel> Title: </ItemLabel>
              <TextInput
                type="text"
                min="1"
                max="10"
                placeholder='Title of user'
                ref={node => this.title = node} />
              </InputWrapper>

            <InputWrapper>
              <ItemLabel> Location: </ItemLabel>
              <TextInput
                type="text"
                min="1"
                max="10"
                placeholder='Office location of user'
                ref={node => this.location = node} />
              </InputWrapper>

            <InputWrapper>
              <ItemLabel> Type: &nbsp; </ItemLabel>
              <SelectInput
                ref={select => this.type = select}
                name="type" >
                <option value="">Select a type</option>
                <option value="employee">Employee</option>
                <option value="manager">Manager</option>
                <option value="executive">Executive</option>
              </SelectInput>
              </InputWrapper>

            <InputWrapper>
              <ItemLabel> Admin Priviledges:&nbsp;</ItemLabel>
              <CheckInput
                type="checkbox"
                ref={node => this.admin = node}
              ></CheckInput>
              </InputWrapper>

            {loading && <p>Loading...</p> }
            {error && <p>Error :( Please try again</p>}

            <AddBtn type="submit">Add User</AddBtn>
            </form>
            : <p>Error: Unauthorized</p>
            }
        </FormWrapper>
      )}
    </Mutation>
        )
    }
}

export default CreateUser;