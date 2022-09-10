import { Component } from "react"

interface P {
  status: "playing" | "success" | "fail" | "none";
}

export default class VScard extends Component<P> {
   constructor(props: P) {
    super(props);
   }

  render() {
    return (
      <div
        className={["vs-card", "absolute", "transition", "duration-700",
          this.props.status === "playing" ?
          "bg-hwaktaverse"
          : this.props.status === "success" ?
          "bg-emerald-500"
          : this.props.status === "fail" ?
          "bg-rose-500"
          : "bg-black",
          "w-16", "h-16", "rounded-full", "text-center", "text-3xl", "cursor-grab", "top-1/2", "left-1/2"].join(" ")}
        onClick={() => {
          alert("헨타이!!! 어딜 누르시는거에욧!!!");
        }}
        >
        <div className="flex text-white font-bold w-full h-full items-center justify-center z-40">
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
      </div>
    )
  }
}