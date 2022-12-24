import {Component, ReactNode} from "react";
import styled, {css} from "styled-components";

type style = "primary" | "secondary" | "high" | "low" | "waktaverse";

interface P {
  style: style;
  children: ReactNode;
  text?: boolean;
  onClick?: () => void | Promise<void>;
}

const DefaultButton = styled.button<{ kind: style; text?: boolean; }>`
  transition: 150ms;
  cursor: pointer;
  color: white;
  border-radius: 0.375rem;
  padding: 0.75rem;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  border: none;
  outline: none;

  ${props => {
    const key = props.text ? "color" : "background-color";
    if (props.kind == "primary")
      return css`
        background-color: rgb(99 102 241);
        color: white;

        &:hover {
          ${key}: rgb(79 70 229);
        }
      `;
    if (props.kind == "secondary")
      return css`
        background-color: rgb(107 114 128);
        color: white;

        &:hover {
          ${key}: rgb(75 85 99);
        }
      `;
    if (props.kind == "high")
      return css`
        background-color: var(--waktaverse);
        color: white;

        &:hover {
          background-color: rgb(78 129 112);
          transform: scaleY(2.5);
        }
      `;
    if (props.kind == "low")
      return css`
        background-color: rgb(244 63 94);
        color: white;

        &:hover {
          background-color: rgb(159 18 57);
          transform: scaleY(0.5);
        }
      `;
  }}

  &:focus {
    outline: none;
  }
`;

export default class Button extends Component<P, {}> {
  constructor(props: P) {
    super(props);
  }

  choiceValue(value: boolean | undefined, defaultValue: boolean = true) {
    return value === undefined ? defaultValue : value;
  }

  render() {
    return (
      <DefaultButton
        onClick={() => {
          const clickFunction = this.props.onClick;
          if (typeof clickFunction === "function") clickFunction();
        }}
        kind={this.props.style}
        text={this.props.text}
        >
        {this.props.children}
      </DefaultButton>
    )
  }
}
