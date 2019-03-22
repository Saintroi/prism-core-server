import React, { Component } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    width: 50%;
`

const Circle = styled.div`
    width: 8px;
    height: 8px;
    border-radius: 50%;
    border-width:  1px;
    border-color: #00467E;
    background-color: #00467E;
    transition: transform 300ms;
    margin: 2px;
    
    .top{
        top: 0px
        transform: ${props => props.move ? "translate(-8, 8)" : ""};
    }

    .middle {
        top: 6px
    }

    .bottom {
        top: 12px
        transform: ${props => props.move ? "translate(8, 8)" : ""};
    }

`;




class DotMenu extends Component {
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
        <Wrapper onClick={this.handleClick} >
            <Circle className = "top" move={this.props.move}></Circle>
            <Circle className = "middle" move={this.props.move}></Circle>
            <Circle className = "bottom" move={this.props.move}></Circle>
        </Wrapper>
      )
    }
  }
  export default DotMenu