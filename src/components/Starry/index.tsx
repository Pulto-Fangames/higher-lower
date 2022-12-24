import { Component, ReactNode } from "react";
import styled from "styled-components";
import Snowflakes from "./Snowflakes";

interface P {
  children?: ReactNode;
}

const Wrap = styled.div`
  position: relative;
  overflow: hidden;
  height: 100vh;
`;

export default class Starry extends Component<P> {
  render() {
    return (
      <Wrap>
        <Snowflakes />
        {this.props.children}
      </Wrap>
    )
  }
}
