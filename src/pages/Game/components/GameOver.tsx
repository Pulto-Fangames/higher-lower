import { Component } from "react";

import Button from "../../../components/Button";

interface P {
  ments: string[][];
  mentIdx: number;
  scores: {
    best: number;
    total: number;
  }
}

export default class GameOver extends Component<P> {
  constructor(props: P) {
    super(props);
  }

  render() {
    return (
      <div className="flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 focus:outline-none">
        <div className="relative z-50 mt-20 mx-auto text-3xl">
          <span className="text-rose-600 text-5xl font-[Goseogu]">게임 오버!</span>
          <div className="mt-4 text-white font-bold">
            <div>당신의 점수는</div>
            <div className="mt-2 text-gray-400">
              <span>{this.props.scores.total.toLocaleString()}점</span>
              <span className="text-base">{this.props.ments[this.props.mentIdx][Math.floor(this.props.ments[this.props.mentIdx].length * Math.random())]}</span>
            </div>
          </div>
          <div className="mt-4 text-white font-bold">
            <div>최고 점수는</div>
            <div className="flex mt-2 text-gray-400">
              <span>{this.props.scores.best}점</span>
              {this.props.scores.best < this.props.scores.total && <>
                <span>&gt;</span>
                <span className="flex text-bestscore">
                  {this.props.scores.total.toLocaleString()}점
                  <div className="bestscore text-2xl text-bestscore font-bold">(+{this.props.scores.total - this.props.scores.best})</div><div className="bestscore text-2xl text-bestscore font-bold">(+{this.props.scores.total - this.props.scores.best})</div>v
                </span>
              </>}
            </div>
          </div>
          <Button
            style="secondary"
            className="text-xl ml-0 mt-2 p-1"
            onClick={() => {
              location.reload();
            }}
            >
            <span>다시하기</span>
          </Button>
        </div>
        <div className="fixed inset-0 z-40 bg-black opacity-50" />        
      </div>
    )
  }
}