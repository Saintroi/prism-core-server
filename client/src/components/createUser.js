import React, { useState, useEffect } from 'react';
import { useMutation } from "react-apollo-hooks";
import styled from 'styled-components';
import PlusButton from './Animations/animatedPlusBtn';
import auth from '../auth';
import { gql } from "apollo-boost";


// Mutations

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

// Styles   

const FormWrapper = styled.div`
  position: fixed;
  padding-top: 30px;
  z-index: 10;
  top: 0;
  left: 70vw;
  width: 30vw;
  height: 100%;
  background-color: white;
  display: flex:
  flex-direction: column;
  justify-content: center;
  align-items: center
  overflow-x: hidden;

  transition: transform 300ms;
  transform: ${props => props.show ? "translate(0, 0)" : "translate(100%, 0)"};

  font-size: 1.3vmin;
  `;

  const OpenBtn = styled.div`
    position: fixed;
    top: 12px;
    left: 95vw;
    z-index: 11;

    transition: transform 300ms;
    transform: ${props => props.move ? "translate(-24vw, -5px)" : ""};
  
`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;

`;

const TextInput = styled.input`
  display: inline-block;
  align-self: flex-end;
  margin-left: auto;
  padding: 15px;
  flex: 1 1 50%;
  max-width: 70%;
  max-height: 40px;
  @media only screen and (max-width: 1030px) {
    max-width: 100%;
  }
`;

const ItemLabel = styled.label`
  display: inline-block;
  text-align: center;

  @media only screen and (max-width: 1030px) {
    display: none;
  }
`;

const SelectInput = styled.select`
  display: inline-block;
  align-self: flex-end;
  margin-left: auto;
  padding: 15px;
  flex: 1 1 50%;
  max-width: 70%;
  max-height: 40px;
  @media only screen and (max-width: 1030px) {
    max-width: 100%;
  }
`;

const CheckInput = styled.input`
  display: inline-block;
  align-self: flex-start;
  flex: 0 1 50%;
  @media only screen and (max-width: 1030px) {
    max-width: 100%;
  }
`;

const AddBtn = styled.button`
  background: #00467E;
  color: white;
  text-transform: uppercase;
  text-align: center;
  font-size: 2vmin;
  padding: 8px 16px;
  align-self: center;
  max-width: 70%;
  max-height: 40px;
  border-radius: 2px;
  margin-left: 30%;
  margin-top: 10%;

`;

//JSX

function CreateUser(props) {


  const [createVisible, setCreateVisible] = useState(false);

  const [wrapperRef, setWrapperRef] = useState(null)


  function toggleCreate() {
    setCreateVisible(!createVisible);
  }

  function handleClickOutside(event) {
    if (wrapperRef && !wrapperRef.contains(event.target)) {
      setCreateVisible(false);
    }
  }

  useEffect(() => {
    console.log("create")

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  const [createUser, {loading, error }] = useMutation(ADD_USER);

  /*const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [admin, setAdmin] = useState("");
  const [location, setLocation] = useState("");
  const [cell, setCell] = useState("");
  const [office, setOffice] = useState("");
  const [type, setType] = useState("");*/

   let first, last, email, title, admin, location, cell, office, type = {};


  return(
    <React.Fragment>
      {auth.isAdmin() && <OpenBtn move={createVisible}><PlusButton click={toggleCreate} move={createVisible}></PlusButton></OpenBtn>}
      <FormWrapper ref={setWrapperRef} show={createVisible}>
        {
        (auth.isAdmin()) ? 
          <form
            onSubmit={e => {
              createUser({ variables: {
                  input:{
                      firstName: first.value,
                      lastName: last.value,
                      email: email.value,
                      title: title.value,
                      admin: admin.checked,
                      location: location.value,
                      cellPhone: cell.value,
                      officePhone: office.value,
                      type: type.value
              }
              }}).then(props.queryRefresh);

              first.value = "";
              last.value = "";
              email.value = "";
              title.value = "";
              admin.value = "";
              location.value = "";
              cell.value = "";
              office.value = "";
              type.value = "";

            e.preventDefault();
            }}
          >
          
        <InputWrapper>
          <ItemLabel> First: </ItemLabel>
          <TextInput
            type="text"
            autoFocus
            required
            placeholder='First name of user'
            ref={node => first = node} />
          </InputWrapper>
          
        <InputWrapper>
          <ItemLabel> Last: </ItemLabel>
          <TextInput
            type="text"
            required
            placeholder='Last name of user'
            ref={node => last = node} />
          </InputWrapper>

        <InputWrapper>
          <ItemLabel> Email: </ItemLabel>
          <TextInput
            type="email"
            required
            placeholder='first.last@prismsystems.com'
            ref={node => email = node} />
          </InputWrapper>

        <InputWrapper>
          <ItemLabel> Cell: </ItemLabel>
          <TextInput
            type="tel"
            min="1"
            max="10"
            placeholder='(XXX) XXX-XXXX'
            ref={node => cell = node} />
          </InputWrapper>

        <InputWrapper>
          <ItemLabel> Office: </ItemLabel>
          <TextInput
            type="tel"
            min="1"
            max="10"
            placeholder='(XXX) XXX-XXXX'
            ref={node => office = node} />
          </InputWrapper>

        <InputWrapper>
          <ItemLabel> Title: </ItemLabel>
          <TextInput
            type="text"
            min="1"
            max="10"
            placeholder='Title of user'
            ref={node => title = node} />
          </InputWrapper>

        <InputWrapper>
          <ItemLabel> Location: </ItemLabel>
          <TextInput
            type="text"
            min="1"
            max="10"
            placeholder='Office location of user'
            ref={node => location = node} />
          </InputWrapper>

        <InputWrapper>
          <ItemLabel> Type: &nbsp; </ItemLabel>
          <SelectInput
            ref={select => type = select}
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
            ref={node => admin = node}
          ></CheckInput>
          </InputWrapper>

        {loading && <p>Loading...</p> }
        {error && <p>Error :( Please try again</p>}

        <AddBtn type="submit">Add User</AddBtn>
        </form>
        : <p>Error: Unauthorized</p>
        }
    </FormWrapper>
</React.Fragment>
    );
  }

export default CreateUser;