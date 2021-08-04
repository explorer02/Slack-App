import { useCallback, useState } from "react";

import "./styled-input.css";

type StyledInputProps = {
  Icon?: JSX.Element;
  type: string;
  placeholder?: string;
};

export const StyledInput = (props: StyledInputProps) => {
  const [state, setState] = useState("");
  const handleChange = useCallback((ev) => setState(ev.target.value), []);
  return (
    <div className="styled-input">
      {props.Icon}
      <input
        type={props.type}
        placeholder={props.placeholder}
        value={state}
        onChange={handleChange}
        required
      ></input>
    </div>
  );
};
