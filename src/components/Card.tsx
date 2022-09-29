import { Component } from "react";

import AnimatedNumbers from "react-animated-numbers";

import Meme from "./GroupName/Meme";
import Gomem from "./GroupName/Gomem";
import Ghost from "./GroupName/Ghost";
import Music from "./GroupName/Music";
import Wakgood from "./GroupName/Wakgood";
import Content from "./GroupName/Content";
import Waktaverse from "./GroupName/Waktaverse";
import IsegyeIdol from "./GroupName/Isegye-idol";

import Button from "./Button";

interface P {
  member: Member;
  idx: number;
  onClick?: (choose: "high" | "low") => void;
  setResult?: () => void;
}

export default class Card extends Component<P> {
  constructor(props: P) {
    super(props);
  }

  render() {
    return (
      <div id={this.props.member.id} className="card w-full " style={{ background: `linear-gradient(rgba(0, 0, 0, .6), rgba(0, 0, 0, .6)) 50% 50% / auto 100% no-repeat, #000000 url(${this.props.member.imageUrl}) 0% 0% / cover no-repeat` }}>
        <div className="justify-center text-center mt-80">
          <div className="block text-2xl">
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
          <span className="text-white text-3xl md:text-6xl font-bold">{this.props.member.nickname}</span>
          {
            (this.props.member.status === "selected" && this.props.idx !== 0) ?
            <div className="mt-10 flex justify-center">
              <div className="flex font-bold text-2xl text-white">
                <AnimatedNumbers
                  includeComma={true}
                  animateToNumber={this.props.member.count ?? 0}
                  fontStyle={{ fontSize: "1.5rem", lineHeight: "2rem" }}
                  />
                회
              </div>
              <span className="ml-2 text-white my-auto">검색되었어요.</span>
            </div>
            : this.props.idx !== 0 ?
            (<>
              <div className="mt-10 flex justify-center">
                <Button
                  style="none"
                  className="bg-waktaverse hover:bg-hwaktaverse hover:scale-y-[2.5]"
                  onClick={() => {
                    const clickFunction = this.props.onClick;
                    if (typeof clickFunction === "function") {
                      clickFunction("high");
                    }
                  }}
                  >
                  <div className="flex">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
                    </svg>
                    <span className="hidden md:block">더 많이</span>
                  </div>
                </Button>
                <Button
                  style="none"
                  className="bg-rose-500 hover:bg-rose-800 hover:scale-y-50"
                  onClick={() => {
                    const clickFunction = this.props.onClick;
                    if (typeof clickFunction === "function") {
                      clickFunction("low");
                    }
                  }}
                  >
                  <div className="flex">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                    </svg>
                    <span className="hidden md:block">더 적게</span>
                  </div>
                </Button>
                <span className="text-white my-auto">검색되었어요.</span>
              </div>
            </>)
            : <div className="mt-10 font-bold text-2xl text-white">{(this.props.member.count ?? 0).toLocaleString()}회</div>
          }
        </div>
      </div>
    )
  }
}