import { Component } from "react";
import styled from "styled-components";

const GGomem = styled.span`
  color: var(--waktaverse);
`;

export default class Gomem extends Component {
  render() {
    return (
      <>
        <span>GO</span>
        <GGomem>M</GGomem>
        <span>EM</span>
      </>
    )
  }
}
