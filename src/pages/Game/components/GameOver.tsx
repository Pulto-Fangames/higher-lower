import { Component } from "react";
import styled from "styled-components";

import Button from "../../../components/Button";

interface P {
  ments: string[][];
  mentIdx: number;
  scores: {
    best: number;
    total: number;
  }
}

const GameOverProp = styled.div`
  display: flex;
  position: fixed;
  overflow-y: hidden;
  overflow-y: auto;
  inset: 0;
  z-index: 50;

  &:focus {
    outline: none;
  }
`;

const GameOverAwning = styled.div`
  position: fixed;
  background-color: black;
  opacity: 0.5;
  inset: 0;
  z-index: 40;
`;

const Container = styled.div`
  position: relative;
  margin-top: 5rem;
  margin-left: auto;
  margin-right: auto;
  font-size: 1.875rem;
  line-height: 2.25rem;
  z-index: 50;
`;

const GameOverText = styled.span`
  color: rgb(225 29 72);
  font-size: 3rem;
  line-height: 1;
  font-family: "Gosegu";
`;

const StatusContainer = styled.div`
  margin-top: 1rem;
  color: white;
  font-weight: bold;

  div.score {
    margin-top: 0.5rem;
    color: rgb(156 163 173);

    span.ment {
      font-size: 1rem;
      line-height: 1.5rem;
    }
  }
`;

const BestScoreContainer = styled.div`
  margin-top: 1rem;
  color: white;
  font-weight: bold;

  div.status {
    display: flex;
    margin-top: 0.5rem;
    color: rgb(156, 163, 175);

    span.bs-con {
      display: flex;
      color: rgb(29, 206, 145);

      div.bestscore {
        text-shadow: 0 0 7px rgb(29, 206, 145);
        font-weight: bold;
        font-size: 1.5rem;
        line-height: 2rem;
        color: rgb(29, 206, 145);
      }
    }
  }
`;

export default class GameOver extends Component<P> {
  constructor(props: P) {
    super(props);
  }

  render() {
    return (
      <GameOverProp>
        <Container>
          <GameOverText>게임 오버!</GameOverText>
          <StatusContainer>
            <div>당신의 점수는</div>
            <div className="score">
              <span>{this.props.scores.total.toLocaleString()}점</span>
              <span className="ment">{this.props.ments[this.props.mentIdx][Math.floor(this.props.ments[this.props.mentIdx].length * Math.random())]}</span>
            </div>
          </StatusContainer>
          <BestScoreContainer>
            <div>최고 점수는</div>
            <div className="status">
              <span>{this.props.scores.best}점</span>
              {this.props.scores.best < this.props.scores.total && <>
                <span>👉</span>
                <span className="bs-con">
                  {this.props.scores.total.toLocaleString()}점
                  <div className="bestscore">(+{this.props.scores.total - this.props.scores.best})</div>
                </span>
              </>}
            </div>
          </BestScoreContainer>
          <Button style="secondary"
            onClick={() => {
              location.reload();
            }}
            >
            <span>다시하기</span>
          </Button>
        </Container>
        <GameOverAwning />
      </GameOverProp>
    )
  }
}