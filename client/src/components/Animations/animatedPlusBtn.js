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
    position: absolute;
    transform: ${props => props.move ? "rotate(45deg)" : ""};
    transition: transform 300ms;


`;

const Bar = styled.div`
    margin: 0 auto;
    position: absolute;
    background-color: #00467E;

    &.horizontal {
        width: 20px;
        height: 3px;
        top: 45%;
        left: 50%;
        margin-left: -10px;
        top: 50%;
        margin-top: -2.5px;
    }

    &.vertical {
        width: 3px;
        height: 20px;
        left: 50%;
        margin-left: -2.5px;
        top: 50%;
        margin-top: -10px;
    }


`;



class PlusButton extends Component {
    constructor (props) {
        super(props)
        this.click = props.click;
      }

    state = {
        move: this.props.move
    }

    handleClick = () => {
        this.setState({move:!this.state.move})
        this.click();
    }

    render() {
      return (
        <Circle onClick={this.handleClick} move={this.props.move}>
            <Bar className="horizontal"></Bar>
            <Bar className="vertical"></Bar>
        </Circle>
      )
    }
  }
  export default PlusButton