import { Component } from "react";
import styled from "styled-components";

const GWaktaverse = styled.span`
  color: var(--waktaverse);
`;

export default class Waktaverse extends Component {
  render() {
    return (
      <GWaktaverse>왁타버스</GWaktaverse>
    )
  }
}
