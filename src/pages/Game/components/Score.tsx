import { Component } from "react";

interface P {
  scores: {
    best: number;
    total: number;
  }
}

export default class Score extends Component<P> {
  constructor(props: P) {
    super(props);
  }

  render() {
    return (
      <div className="absolute flex w-full justify-between text-white text-lg mt-10">
        <div className="flex flex-col mx-4">
          <div>최고 점수</div>
          <div className="mx-auto font-bold">{this.props.scores.best.toLocaleString()}점</div>
        </div>
        <div className="flex flex-col mx-4">
          <div>현재 점수</div>
          <div className="mx-auto font-bold">{this.props.scores.total.toLocaleString()}점</div>
        </div>
      </div>
    );
  }
}