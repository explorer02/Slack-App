import { ChangeEvent, useCallback, useState } from "react";

export const useInput = (
  initValue: string
): [string, (ev: ChangeEvent<HTMLInputElement>) => void] => {
  const [state, setState] = useState(initValue);
  const onChange = useCallback((ev: ChangeEvent<HTMLInputElement>) => {
    setState(ev.target.value);
  }, []);
  return [state, onChange];
};
