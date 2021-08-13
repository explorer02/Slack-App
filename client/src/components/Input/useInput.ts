import { ChangeEvent, useCallback, useState } from "react";

type UseInputReturn = [string, (ev: ChangeEvent<HTMLInputElement>) => void];

export const useInput = (initValue: string): UseInputReturn => {
  const [state, setState] = useState(initValue);
  const onChange = useCallback((ev: ChangeEvent<HTMLInputElement>) => {
    setState(ev.target.value);
  }, []);
  return [state, onChange];
};
