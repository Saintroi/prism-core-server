import React, { Component } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    transform: rotate(45deg);
    position: fixed;
    left: 1vw;
    top: 15px;
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



class CloseButton extends Component {
    constructor (props) {
        super(props)
        this.click = props.click;
      }

    render() {
      return (
        <Wrapper onClick={this.click}>
            <Bar className="horizontal"></Bar>
            <Bar className="vertical"></Bar>
        </Wrapper>
      )
    }
  }
  export default CloseButton