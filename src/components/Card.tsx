import { Component } from "react";

import waktaverse from "../utils/res/waktaverse";

import AnimatedNumbers from "react-animated-numbers";

import Wakgood from "./GroupName/Wakgood";
import Gomem from "./GroupName/Gomem";
import Ghost from "./GroupName/Ghost";
import IsegyeIdol from "./GroupName/Isegye-idol";
import Waktaverse from "./GroupName/Waktaverse";

import Button from "./Button";

interface P {
  id: string;
  status: Status;
  count?: number;
  onClick?: (choose: "high" | "low") => void;
  setResult?: () => void;
}

interface S {
  member?: WaktaverseMember;
}

export default class Card extends Component<P, S> {
  constructor(props: P) {
    super(props);
  }

  async componentDidMount() {
    this.setState({ member: waktaverse.find(m => m.id === this.props.id) });
  }

  render() {
    return (
      <div id={this.props.id} className="w-full" style={{ background: `linear-gradient(rgba(0, 0, 0, .6), rgba(0, 0, 0, .6)) 50% 50% / auto 100% no-repeat, #ffffff url(${this.state?.member?.imageUrl}) 0% 0% / cover no-repeat` }}>
        <div className="justify-center text-center mt-80">
          <div className="block text-2xl">
            {
              this.state?.member?.group === "isedol" ?
              <IsegyeIdol />
              : this.state?.member?.group === "gomem" ?
              <Gomem />
              : this.state?.member?.group === "ghost" ?
              <Ghost />
              : this.state?.member?.group === "woowakgood" ?
              <Wakgood />
              : this.state?.member?.group === "waktaverse" ?
              <Waktaverse />
              : <></>
            }
          </div>
          <span className="text-white text-3xl md:text-6xl font-bold">{this.state?.member?.nickname}</span>
          {
            this.props.status === "selected" ?
            <div className="mt-10 flex justify-center">
              <div className="flex font-bold text-2xl text-white">
                <AnimatedNumbers
                  includeComma={true}
                  animateToNumber={this.props.count ?? 0}
                  fontStyle={{ fontSize: "1.5rem", lineHeight: "2rem" }}
                  />
                회
              </div>
              <span className="ml-2 text-white my-auto">검색되었어요.</span>
            </div>
            : this.props.status !== "start" ?
            (<>
              <div className="mt-12 flex justify-center">
                <Button
                  style="none"
                  className="bg-waktaverse hover:bg-hwaktaverse hover:scale-y-150"
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
            : <div className="mt-10 font-bold text-2xl text-white">{(this.props.count ?? 0).toLocaleString()}회</div>
          }
        </div>
      </div>
    )
  }
}