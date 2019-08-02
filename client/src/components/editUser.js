import React, { useState, useEffect } from 'react';
import { useMutation } from "react-apollo-hooks";
import styled from 'styled-components';
import DotMenu from './Animations/animatedDots';
import CloseButton from './Static/staticX';
import auth from '../auth';
import { gql } from "apollo-boost";

// Queries

const EDIT_USER = gql`

mutation updateUser($input: UserInput!){
  
  updateUser(input: $input){
   firstName
   lastName
   email
   title
   admin
   
 }
 }
`

const DELETE_USER = gql`

mutation deleteUser($input: UserInput!){
  
  deleteUser(input: $input){
   id
  }
 }
`

// Styles   


const FormWrapper = styled.div`
  position: fixed;
  padding-top: 30px;
  z-index: 13;
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
  margin-top: 10%;

`;

const DeleteBtn = styled.button`
  background: red;
  color: white;
  text-transform: uppercase;
  text-align: center;
  font-size: 2vmin;
  padding: 8px 16px;
  align-self: center;
  max-width: 70%;
  max-height: 40px;
  border-radius: 2px;
  margin-top: 10%;
  margin-bottom: auto;
`;

function EditUser(props) {

  const [createVisible, setCreateVisible] = useState(false);
  const [user, setUser] = useState(props.user);
  const [currUserId] = useState(auth.getId());
  const [wrapperRef, setWrapperRef] = useState(null)

  function handleClickOutside(event) {
    if (wrapperRef && !wrapperRef.contains(event.target)) {
      setCreateVisible(false);
    }
  }

  const updateInputValue = (propertyName) => event => {
    const newUser = {
      ...user,
      [propertyName]: event.target.value
    };
    setUser(newUser)
  }

  function toggleCreate(){
    setCreateVisible(!createVisible)
  };

  useEffect(() => {
    console.log("edit");
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  let dat = {}
  let editUser;
  let deleteUser;
  [editUser, dat] = useMutation(EDIT_USER);
  [deleteUser, dat] = useMutation(DELETE_USER);

  if (dat.loading) return <p>Loading...</p>
  if (dat.error) return <p>Error :( Please try again</p>

  let first, last, email, title, admin, location, cell, office, type = {};


  return(
    <React.Fragment>
      <DotMenu click={toggleCreate} move={createVisible}></DotMenu>
      <FormWrapper ref={setWrapperRef} show={createVisible}>
        <CloseButton click={toggleCreate}></CloseButton> 
        <form
          onSubmit={e => {
            editUser({ variables: {
                input:{
                    id: props.user.id,
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
          readOnly = {!auth.isAdmin()}
          autoFocus
          required
          placeholder='First name of user'
          value={user.firstName || ''}
          ref={node => first = node}
          onChange= {updateInputValue('firstName')} />
        </InputWrapper>
        
      <InputWrapper>
        <ItemLabel> Last: </ItemLabel>
        <TextInput
          type="text"
          readOnly = {!auth.isAdmin()}
          required
          placeholder='Last name of user'
          value={user.lastName || ''}
          ref={node => last = node}
          onChange= {updateInputValue('lastName')} />
        </InputWrapper>

      <InputWrapper>
        <ItemLabel> Email: </ItemLabel>
        <TextInput
          type="email"
          readOnly = {!auth.isAdmin()}
          required
          placeholder='first.last@prismsystems.com'
          value={user.email || ''}
          ref={node => email = node}
          onChange= {updateInputValue('email')} />
        </InputWrapper>

      <InputWrapper>
        <ItemLabel> Cell: </ItemLabel>
        <TextInput
          type="tel"
          readOnly = {!auth.isAdmin()}
          min="1"
          max="10"
          placeholder='(XXX) XXX-XXXX'
          value={user.cellPhone || ''}
          ref={node => cell = node}
          onChange= {updateInputValue('cellPhone')} />
        </InputWrapper>

      <InputWrapper>
        <ItemLabel> Office: </ItemLabel>
        <TextInput
          type="tel"
          readOnly = {!auth.isAdmin()}
          min="1"
          max="10"
          placeholder='(XXX) XXX-XXXX'
          value={user.officePhone || ''}
          ref={node => office = node}
          onChange= {updateInputValue('officePhone')} />
        </InputWrapper>

      <InputWrapper>
        <ItemLabel> Title: </ItemLabel>
        <TextInput
          type="text"
          readOnly = {!auth.isAdmin()}
          min="1"
          max="10"
          placeholder='Title of user'
          value={user.title || ''}
          ref={node => title = node}
          onChange= {updateInputValue('title')} />
        </InputWrapper>

      <InputWrapper>
        <ItemLabel> Location: </ItemLabel>
        <TextInput
          type="text"
          readOnly = {!auth.isAdmin()}
          min="1"
          max="10"
          placeholder='Office location of user'
          value={user.location || ''}
          ref={node => location = node}
          onChange= {updateInputValue('location')} />
        </InputWrapper>

      <InputWrapper>
        <ItemLabel> Type: &nbsp; </ItemLabel>
        <SelectInput
          value = {user.type || ''}
          ref={select => type = select}
          onChange= {updateInputValue('type')}
          name="type" >
          readOnly = {!auth.isAdmin()}
          <option value="">Select a type</option>
          <option value="employee">Employee</option>
          <option value="manager">Manager</option>
          <option value="executive">Executive</option>
        </SelectInput>
        </InputWrapper>
      {
      (auth.isAdmin()) ?
        <React.Fragment>
          <InputWrapper>
            <ItemLabel> Admin Priviledges:&nbsp;</ItemLabel>
            <CheckInput
              type="checkbox"
              ref={node => admin = node}
              checked = {user.admin }
              onChange= {updateInputValue('admin')}
            ></CheckInput>
            </InputWrapper>
            <AddBtn type="submit">Update User</AddBtn>
            <div></div>

          </React.Fragment>


        : <div></div>
      }
    
  </form>
  {(auth.isAdmin() && (user.id !== currUserId)) ?
        <DeleteBtn
          onClick = {e => {
            deleteUser({ variables: {
              input:{
                  id: user.id}
          }}).then(props.queryRefresh);
          toggleCreate();
          }}
        >Delete User
        </DeleteBtn>
      : <div></div>
    }
      </FormWrapper>
</React.Fragment>
    )
    }

export default EditUser;