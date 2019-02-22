import React, { Component } from 'react';
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import styled, {keyframes} from 'styled-components';
import PlusButton from './Animations/animatedPlusBtn';
import auth from '../auth';

// Animations
const slideAnimate = keyframes`
  from {
    transform: translateX(100%);
  }

  to {
    transform: none;
    }
`;

const btnUp = keyframes`
  from {
    transform: translate(0,0);
  }

  to {
    transform: translate(100%,);
    }
`;


// Queries
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
 // {...props} toggleCreate={this.toggleCreate} 

class CreateUser extends Component {

  constructor(props) {
    super(props);

    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);

    this.state = {
      createVisible: false,
    };
  }

  


  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
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
    console.log("EVENT");
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({
        createVisible: false
      });
    }
  }

    render(){
        return(
          <React.Fragment>
            <OpenBtn move={this.state.createVisible}><PlusButton click={this.toggleCreate} move={this.state.createVisible}></PlusButton></OpenBtn>
            <Mutation mutation={ADD_USER} onCompleted={() => window.location.href="/" }>
            {(createUser, { data, loading, error }) => (
              <FormWrapper ref={this.setWrapperRef} show={this.state.createVisible}>
                {
                (auth.isAdmin()) ? 
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
                  <ItemLabel> First: </ItemLabel>
                  <TextInput
                    type="text"
                    autoFocus
                    required
                    placeholder='First name of user'
                    ref={node => this.first = node} />
                  </InputWrapper>
                  
                <InputWrapper>
                  <ItemLabel> Last: </ItemLabel>
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
                  <ItemLabel> Cell: </ItemLabel>
                  <TextInput
                    type="tel"
                    min="1"
                    max="10"
                    placeholder='Cell number of user'
                    ref={node => this.cell = node} />
                  </InputWrapper>

                <InputWrapper>
                  <ItemLabel> Office: </ItemLabel>
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
      
      </React.Fragment>
          )
          }
}

export default CreateUser;