import { Component } from "react";
import styled from "styled-components";

interface P {
  scores: {
    best: number;
    total: number;
  }
}

const ScoreContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: space-between;
  width: 100%;
  color: white;
  margin-top: 2.5rem;
  font-size: 1.125rem;
  line-height: 1.75rem;
`;

const ScoreOption = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
  margin-right: 1rem;
`;

const ScoreValue = styled.div`
  margin-left: auto;
  margin-right: auto;
  font-weight: bold;
`;

export default class Score extends Component<P> {
  constructor(props: P) {
    super(props);
  }

  render() {
    return (
      <ScoreContainer>
        <ScoreOption>
          <div>최고 점수</div>
          <ScoreValue>{this.props.scores.best.toLocaleString()}점</ScoreValue>
        </ScoreOption>
        <ScoreOption>
          <div>현재 점수</div>
          <ScoreValue>{this.props.scores.total.toLocaleString()}점</ScoreValue>
        </ScoreOption>
      </ScoreContainer>
    );
  }
}