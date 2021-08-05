import { MouseEvent } from "react";
import "./styled-button.css";

type StyledButtonProps = {
  text: string;
  onClick?: (ev: MouseEvent<HTMLButtonElement>) => void;
  type: "button" | "submit" | "reset";
  disabled?: boolean;
};
const StyledButton = (props: StyledButtonProps) => {
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

export default StyledButton;
