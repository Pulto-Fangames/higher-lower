import { Component } from "react";
import styled, {css} from "styled-components";
import AnimatedNumbers from "react-animated-numbers";
import Button from "./Button";
import FlexDiv from "../utils/styles/FlexDiv";

import Meme from "./GroupName/Meme";
import Gomem from "./GroupName/Gomem";
import Ghost from "./GroupName/Ghost";
import Music from "./GroupName/Music";
import Wakgood from "./GroupName/Wakgood";
import Content from "./GroupName/Content";
import Waktaverse from "./GroupName/Waktaverse";
import IsegyeIdol from "./GroupName/Isegye-idol";

interface P {
  member: Member;
  idx: number;
  onClick?: (choose: "high" | "low") => void;
  setResult?: () => void;
}

const DefaultCard = styled.div<{ member: Member }>`
  width: 100%;
  background-position: 50% 50%;
  ${props => {
    return css`
      background: linear-gradient(rgba(0, 0, 0, .6), rgba(0, 0, 0, .6)) 50% 50% / auto 100% no-repeat, #000000 url(${props.member.imageUrl}) 0% 0% / cover no-repeat;
    `;
  }}
`;

const CardContent = styled.div`
  justify-content: center;
  text-align: center;

  div.group {
    display: block;
    color: white;
    font-size: 1.5rem;
    line-height: 2rem;
  }
`;

const CardNickname = styled.span`
  color: white;
  font-size: 1.875rem;
  line-height: 2.25rem;
  font-weight: bold;

  @media (min-width: 768px) {
    font-size: 3.75rem;
      line-height: 1;
  }
`;

const AnimDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2.5rem;

  div.counting {
    display: flex;
    font-weight: bold;
    font-size: 1.5rem;
    line-height: 2rem;
    color: white;
  }

  span.subtext {
    color: white;
    margin-top: auto;
    margin-bottom: auto;
    margin-left: 0.5rem;
  }
`;

const MiddleCard = styled.div`
  justify-content: center;
  margin-top: 2.5rem;

  span.subtext {
    color: white;
    margin-top: auto;
    margin-bottom: auto;
  }
`;

const MemberCount = styled.div`
  color: white;
  margin-top: 2.5rem;
  font-weight: bold;
  font-size: 1.5rem;
  line-height: 2rem;
`;

const ShowText = styled.span`
  display: none;

  @media (min-width: 768px) {
    display: block;
  }
`;

export default class Card extends Component<P> {
  constructor(props: P) {
    super(props);
  }

  render() {
    return (
      <DefaultCard id={this.props.member.id} className="card" member={this.props.member}>
        <CardContent className="content">
          <div className="group">
            {
              this.props.member.group === "isedol" ?
              <IsegyeIdol />
              : this.props.member.group === "gomem" ?
              <Gomem />
              : this.props.member.group === "ghost" ?
              <Ghost />
              : this.props.member.group === "woowakgood" ?
              <Wakgood />
              : this.props.member.group === "waktaverse" ?
              <Waktaverse />
              : this.props.member.group === "content" ?
              <Content />
              : this.props.member.group === "music" ?
              <Music />
              : <Meme />
            }
          </div>
          <CardNickname>{this.props.member.nickname}</CardNickname>
          {
            this.props.member.status === "selected" && this.props.idx !== 0
            ?
              <AnimDiv>
                <div className="counting">
                  <AnimatedNumbers includeComma={true} animateToNumber={this.props.member.count ?? 0} fontStyle={{ fontSize: "1.5rem", lineHeight: "2rem" }} />회
                </div>
                <span className="subtext">검색되었어요.</span>
              </AnimDiv>
            :
            this.props.idx !== 0
            ?
              <MiddleCard>
                <Button style="high"
                  onClick={() => {
                    const clickFunction = this.props.onClick;
                    if (typeof clickFunction === "function") clickFunction("high");
                  }}
                  >
                  <FlexDiv>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
                    </svg>
                    <ShowText>더 많이</ShowText>
                  </FlexDiv>
                </Button>
                <Button style="low"
                  onClick={() => {
                    const clickFunction = this.props.onClick;
                    if (typeof clickFunction === "function") clickFunction("low");
                  }}
                  >
                  <FlexDiv>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                    </svg>
                    <ShowText>더 적게</ShowText>
                  </FlexDiv>
                </Button>
                <span className="subtext">검색되었어요.</span>
              </MiddleCard>
            :
            <MemberCount>{(this.props.member.count ?? 0).toLocaleString()}회</MemberCount>
          }
        </CardContent>
      </DefaultCard>
    )
  }
}