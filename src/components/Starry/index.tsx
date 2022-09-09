import { Component, ReactNode } from "react";
import styled from "styled-components";

import Snowflakes from "./Snowflakes";

const Wrap = styled.div`
  position: relative;
`;

interface P {
  children?: ReactNode;
}

export default class Starry extends Component<P> {
  render() {
    return (
      <Wrap className="relative overflow-hidden h-screen">
        <Snowflakes />
        {this.props.children}
      </Wrap>
    )
  }
}