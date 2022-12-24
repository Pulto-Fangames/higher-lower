import {Component} from "react"
import styled, {css} from "styled-components";

type kind = "playing" | "success" | "fail" | "none";

interface P {
  status: kind;
}

const VSCard = styled.div<{ status: kind }>`
  display: flex;
  position: absolute;
  align-items: center;
  justify-content: center;
  top: 50%;
  left: 50%;
  width: 4rem;
  height: 4rem;
  border-radius: 9999px;
  text-align: center;
  font-size: 1.875rem;
  line-height: 2.25rem;
  transform: translate(-50%, -50%);
  cursor: grab;

  ${(props) => css`
    background-color: ${props.status === "playing"
      ? "rgb(78, 129, 112)"
      : props.status === "success"
      ? "rgb(16, 185, 129)"
      : props.status === "fail"
      ? "rgb(244, 63, 94)"
      : "black"};
  `}

  div {
    display: flex;
    color: white;
    font-weight: bold;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    z-index: 40;
    animation: vs 1s ease-in-out .5s infinite alternate;

    @keyframes vs {
      0% {
        transform: scale(1);
      }  
      100% {
        transform: scale(1.25);
      }
    }
  }
`;

export default class VScard extends Component<P> {
   constructor(props: P) {
    super(props);
   }

  render() {
    return (
      <VSCard
        status={this.props.status}
        onClick={() => {
          alert("헨타이!!! 어딜 누르시는거에욧!!!");
        }}
        >
        <div>
          {
            this.props.status === "playing" ?
            "VS"
            : this.props.status === "success" ?
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            : this.props.status === "fail" ?
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            : "VS"
          }
        </div>
      </VSCard>
    )
  }
}
