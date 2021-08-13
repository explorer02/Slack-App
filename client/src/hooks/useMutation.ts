import { useCallback, useState } from "react";

type MutationFunction = (...args: any[]) => Promise<any>;

type MutationState<T> = {
  status: "idle" | "loading" | "error" | "success";
  data: T | undefined;
  error: Error | undefined;
};

export function useMutation<T>(callback: MutationFunction) {
  const [state, setState] = useState<MutationState<T>>({
    status: "idle",
    data: undefined,
    error: undefined,
  });

  const mutate = useCallback(
    (...args: any[]) => {
      setState((s) => ({ ...s, status: "loading" }));
      callback(...args)
        .then((res) => {
          setState({ status: "success", data: res, error: undefined });
        })
        .catch((err) => {
          setState({ status: "error", data: undefined, error: err });
        })
        .finally(() => {});
    },
    [callback]
  );
  const reset = useCallback(() => {
    setState({ status: "idle", data: undefined, error: undefined });
  }, []);
  return {
    mutate,
    ...state,
    reset,
  };
}
