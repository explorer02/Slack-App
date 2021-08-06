import { ChangeEvent } from "react";

import "./input.css";

type InputProps = {
  Icon?: JSX.Element;
  type: string;
  placeholder?: string;
  value: string;
  onChange: (ev: ChangeEvent<HTMLInputElement>) => void;
  minLength?: number;
};

export const Input = (props: InputProps) => {
  return (
    <div className="styled-input">
      {props.Icon}
      <input
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        minLength={props.minLength}
        required
      ></input>
    </div>
  );
};
