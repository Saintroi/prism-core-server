import React, { Component } from 'react';
import styled from 'styled-components';

const Circle = styled.div`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border-style: solid;
    border-width: 1px;
    border-color: #00467E;
    background-color: transparent;
    position: relative;

`;

const Bar = styled.div`
    margin: 0 auto;
    position: absolute;
    background-color: #00467E;
    transition: transform 300ms;

    transform: ${props => props.active ? "rotate(45deg)" : ""};

    &.horizontal {
        width: 60%;
        height: 5%;
        top: 45%;
        left: 20%;
    }

    &.vertical {
        width: 5%;
        height: 60%;
        left: 45%;
        top: 20%;
    }


`;



class PlusButton extends Component {
    constructor (props) {
        super(props)
            
        this.click = props.click;
      }

    state = {
        isActive: false
    }

    handleClick = () => {
        this.setState({isActive:!this.state.isActive})
        this.click();
    }

    render() {
      return (
        <Circle onClick={this.handleClick}>
            <Bar className="horizontal" active={this.state.isActive}></Bar>
            <Bar className="vertical" active={this.state.isActive}></Bar>
        </Circle>
      )
    }
  }
  export default PlusButton