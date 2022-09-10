import { Component, ReactNode } from "react";

interface P {
  style: "primary" | "secondary" | "none";
  className?: string;
  children: ReactNode;
  background?: boolean;
  onClick?: () => void | Promise<void>;
}

export default class Button extends Component<P, {}> {
  constructor(props: P) {
    super(props);
  }

  choiceValue(value: boolean | undefined, defaultValue: boolean = true) {
    return value === undefined ? defaultValue : value;
  }

  render() {
    return (
      <button
        className={[
          "transition", "cursor-pointer", "rounded-md", "p-3", "outline-none", "focus:outline-none", "mx-2",
          this.props.style === "primary"
          ? ["bg-indigo-500", "text-white", this.choiceValue(this.props.background) ? "hover:bg-indigo-600" : "hover:text-indigo-600"].join(" ")
          :
          this.props.style === "secondary"
          ? ["bg-gray-500", "text-white", this.choiceValue(this.props.background) ? "hover:bg-gray-600" : "hover:text-gray-600"].join(" ")
          : ["text-white", this.choiceValue(this.props.background) ? "hover:bg-gray-500" : "hover:text-gray-500", "mx-2", "py-2", "px-1"].join(" "),
          this.props.className
        ].join(" ").trim()}
        onClick={() => {
          const clickFunction = this.props.onClick;
          if (typeof clickFunction === "function") {
            clickFunction();
          }
        }}
        >
        {this.props.children}
      </button>
    )
  }
}