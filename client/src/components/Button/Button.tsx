import { MouseEvent } from "react";

import "./button.css";

type ButtonProps = {
  text: string;
  onClick?: (ev: MouseEvent<HTMLButtonElement>) => void;
  type: "button" | "submit" | "reset";
  disabled?: boolean;
};

export const Button = (props: ButtonProps) => {
  return (
    <button
      onClick={props.onClick}
      type={props.type}
      className="styled-button"
      disabled={props.disabled || false}
    >
      {props.text}
    </button>
  );
};
