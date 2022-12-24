import { Component } from "react";
import styled from "styled-components";

const GGhost = styled.span`
  color: white;
`;

export default class Ghost extends Component {
  render() {
    return (
      <>
        <GGhost>👻 망령</GGhost>
      </>
    )
  }
}
