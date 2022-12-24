import { Component } from "react";
import styled from "styled-components";

const GIsedol = styled.span`
  color: var(--pink);
`;

export default class IsegyeIdol extends Component {
  render() {
    return (
      <>
        <span>이세</span>
        <GIsedol>계 아이</GIsedol>
        <span>돌</span>
      </>
    )
  }
}
