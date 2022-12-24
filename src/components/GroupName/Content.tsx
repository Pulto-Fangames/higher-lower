import { Component } from "react";
import styled from "styled-components";

const GContent = styled.span`
  color: white;
`;

export default class Content extends Component {
  render() {
    return (
      <>
        <GContent>😎 콘텐츠</GContent>
      </>
    )
  }
}
