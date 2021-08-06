import { useRef, useState } from "react";

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
  const data = useRef<any>(undefined);
  const error = useRef<any>(undefined);

  const [status, setStatus] = useState<
    "loading" | "success" | "error" | "idle"
  >("idle");
  console.log("[usemutation]", data.current, error.current);
  return {
    mutate: (...args: any[]) => {
      setStatus("loading");
      options?.onMutate?.();
      callback(...args)
        .then((res) => {
          console.log(res);
          options?.onSuccess?.();
          data.current = res;
          setStatus("success");
          console.log(data.current);
        })
        .catch((err) => {
          err.current = err;
          options?.onError?.();
          setStatus("error");
        })
        .finally(() => {
          options?.onSettled?.();
        });
    },
    status,
    data: data.current,
    error: error.current,
    reset() {
      setStatus("idle");
      data.current = undefined;
      error.current = undefined;
    },
  };
};
