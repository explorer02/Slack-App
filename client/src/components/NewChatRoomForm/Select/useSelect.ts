import { useState, ChangeEvent } from "react";

export const useSelect = (
  initValue: string
): [string, (ev: ChangeEvent<HTMLSelectElement>) => void] => {
  const [state, setState] = useState<string>(initValue);
  const onChange = (ev: ChangeEvent<HTMLSelectElement>) => {
    setState(ev.target.value);
  };
  return [state, onChange];
};
