import { ChangeEvent } from "react";

import "./styled-input.css";

type StyledInputProps = {
  Icon?: JSX.Element;
  type: string;
  placeholder?: string;
  value: string;
  onChange: (ev: ChangeEvent<HTMLInputElement>) => void;
  minLength?: number;
};

export const StyledInput = (props: StyledInputProps) => {
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
