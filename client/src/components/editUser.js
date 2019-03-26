import React, { Component } from 'react';
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import styled from 'styled-components';
import DotMenu from './Animations/animatedDots';
import CloseButton from './Static/staticX';
import auth from '../auth';


// Queries
const ADD_USER = gql`

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

  const OpenBtn = styled.div`
    z-index: 9;
    transition: transform 200ms;
    transform: ${props => props.move ? "translate(-24vw, -5px)" : ""};
    justify-self: center;

    &:hover{
        transform: rotate(90deg)
    }
  
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

class EditUser extends Component {

  constructor(props) {
    super(props);

    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.updateInputValue = this.updateInputValue.bind(this);

    this.state = {
      createVisible: false,
      user: this.props.user
    };
    console.log(this.state.user);

  }

  


  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  updateInputValue = (propertyName) => event => {
    const { user } = this.state;
    const newUser = {
      ...user,
      [propertyName]: event.target.value
    };
    this.setState({ user: newUser });
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  toggleCreate = () => {
    this.setState({
      createVisible: !this.state.createVisible
    });
  };

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({
        createVisible: false
      });
    }
  }

    render(){
        return(
          <React.Fragment>
            <OpenBtn move={this.state.createVisible}><DotMenu click={this.toggleCreate} move={this.state.createVisible}></DotMenu></OpenBtn>
            <Mutation mutation={ADD_USER} onCompleted={this.props.queryRefresh}>
            {(createUser, { data, loading, error }) => (
              <FormWrapper ref={this.setWrapperRef} show={this.state.createVisible}>
                <CloseButton click={this.toggleCreate}></CloseButton> 
                <form
                  onSubmit={e => {
                    e.preventDefault();
                    createUser({ variables: {
                        input:{
                            id: this.props.user.id,
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
                <ItemLabel> First: </ItemLabel>
                <TextInput
                  type="text"
                  autoFocus
                  required
                  placeholder='First name of user'
                  value={this.state.user.firstName || ''}
                  ref={node => this.first = node}
                  onChange= {this.updateInputValue('firstName')} />
                </InputWrapper>
                
              <InputWrapper>
                <ItemLabel> Last: </ItemLabel>
                <TextInput
                  type="text"
                  required
                  placeholder='Last name of user'
                  value={this.state.user.lastName || ''}
                  ref={node => this.last = node}
                  onChange= {this.updateInputValue('lastName')} />
                </InputWrapper>

              <InputWrapper>
                <ItemLabel> Email: </ItemLabel>
                <TextInput
                  type="email"
                  required
                  placeholder='first.last@prismsystems.com'
                  value={this.state.user.email || ''}
                  ref={node => this.email = node}
                  onChange= {this.updateInputValue('email')} />
                </InputWrapper>

              <InputWrapper>
                <ItemLabel> Cell: </ItemLabel>
                <TextInput
                  type="tel"
                  min="1"
                  max="10"
                  placeholder='(XXX) XXX-XXXX'
                  value={this.state.user.cellPhone || ''}
                  ref={node => this.cell = node}
                  onChange= {this.updateInputValue('cellPhone')} />
                </InputWrapper>

              <InputWrapper>
                <ItemLabel> Office: </ItemLabel>
                <TextInput
                  type="tel"
                  min="1"
                  max="10"
                  placeholder='(XXX) XXX-XXXX'
                  value={this.state.user.officePhone || ''}
                  ref={node => this.office = node}
                  onChange= {this.updateInputValue('officePhone')} />
                </InputWrapper>

              <InputWrapper>
                <ItemLabel> Title: </ItemLabel>
                <TextInput
                  type="text"
                  min="1"
                  max="10"
                  placeholder='Title of user'
                  value={this.state.user.title || ''}
                  ref={node => this.title = node}
                  onChange= {this.updateInputValue('title')} />
                </InputWrapper>

              <InputWrapper>
                <ItemLabel> Location: </ItemLabel>
                <TextInput
                  type="text"
                  min="1"
                  max="10"
                  placeholder='Office location of user'
                  value={this.state.user.location || ''}
                  ref={node => this.location = node}
                  onChange= {this.updateInputValue('location')} />
                </InputWrapper>

              <InputWrapper>
                <ItemLabel> Type: &nbsp; </ItemLabel>
                <SelectInput
                  value = {this.state.user.type || ''}
                  ref={select => this.type = select}
                  onChange= {this.updateInputValue('type')}
                  name="type" >
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
                      ref={node => this.admin = node}
                      value = {this.state.user.admin || ''}
                      onChange= {this.updateInputValue('admin')}
                    ></CheckInput>
                    </InputWrapper>
                    <AddBtn type="submit">Update User</AddBtn>
                    <div></div>

                  </React.Fragment>


                : <div></div>
              }

              {loading && <p>Loading...</p> }
              {error && <p>Error :( Please try again</p>}
            
          </form>
          {(auth.isAdmin()) ?
            <Mutation mutation={DELETE_USER} onCompleted={this.props.queryRefresh}>
              {(deleteUser, { data, loading, error }) => (
                <DeleteBtn
                  onClick = {e => {
                    deleteUser({ variables: {
                      input:{
                          id: this.state.user.id}
                  }});
                  this.toggleCreate();
                  }}
                >Delete User
                  {loading && <p>Loading...</p> }
                  {error && <p>Error Deleting, Please try again</p>}
                </DeleteBtn>
                )}
              </Mutation>
              : <div></div>
            }
              </FormWrapper>
            )}
          </Mutation>
      </React.Fragment>
          )
          }
}

export default EditUser;