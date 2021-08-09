import { useCallback } from "react";
import { useState } from "react";

type MutationFunction = (...args: any[]) => Promise<any>;
type MutationOptions = {
  onMutate?: () => void;
  onError?: () => void;
  onSuccess?: () => void;
  onSettled?: () => void;
};

export const useMutation = (
  callback: MutationFunction,
  options?: MutationOptions
) => {
  const [data, setData] = useState<any>(undefined);
  const [error, setError] = useState<Error | undefined>(undefined);

  const [status, setStatus] = useState<
    "loading" | "success" | "error" | "idle"
  >("idle");
  const mutate = useCallback(
    (...args: any[]) => {
      setStatus("loading");
      options?.onMutate?.();
      callback(...args)
        .then((res) => {
          options?.onSuccess?.();
          setStatus("success");
          setData(res);
          setError(undefined);
        })
        .catch((err) => {
          setStatus("error");
          setData(undefined);
          setError(err);
        })
        .finally(() => {
          options?.onSettled?.();
        });
    },
    [callback, options]
  );
  const reset = useCallback(() => {
    setStatus("idle");
    setData(undefined);
    setError(undefined);
  }, []);
  return {
    mutate,
    status,
    data,
    error,
    reset,
  };
};
