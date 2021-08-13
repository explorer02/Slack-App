import { useCallback } from "react";
import { useEffect, useState } from "react";

type QueryFunction = () => Promise<any>;
type QueryOptions = {
  enabled?: boolean;
  refetchInterval?: number;
};
type QueryState<T> = {
  status: "idle" | "loading" | "error" | "success";
  data: T | undefined;
  error: Error | undefined;
};

export function useQuery<T>(
  callback: QueryFunction,
  options: QueryOptions = { enabled: true, refetchInterval: -1 }
) {
  const [state, setState] = useState<QueryState<T>>({
    status: "idle",
    data: undefined,
    error: undefined,
  });

  const fetchQuery = useCallback(() => {
    setState((s) => ({ ...s, status: "loading" }));
    callback()
      .then((res) => {
        setState({ status: "success", data: res, error: undefined });
      })
      .catch((err) => {
        setState({ status: "error", data: undefined, error: err });
      });
  }, [callback]);
  useEffect(() => {
    if (options.enabled === true) {
      fetchQuery();
      if (options.refetchInterval && options.refetchInterval > 0) {
        const id = setInterval(() => {
          fetchQuery();
        }, options.refetchInterval * 1000);
        return () => {
          clearInterval(id);
        };
      }
    }
  }, [fetchQuery, options.enabled, options.refetchInterval]);

  return state;
}
