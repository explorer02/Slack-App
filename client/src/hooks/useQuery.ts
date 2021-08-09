import { useCallback } from "react";
import { useEffect, useState } from "react";

type QueryFunction = (...args: any[]) => Promise<any>;
type QueryOptions = {
  enabled?: boolean;
  refetchInterval?: number;
};

export const useQuery = (
  callback: QueryFunction,
  options: QueryOptions = { enabled: true, refetchInterval: -1 }
) => {
  const [status, setStatus] = useState<
    "idle" | "loading" | "error" | "success"
  >("idle");
  const [data, setData] = useState<any>(undefined);
  const [error, setError] = useState<Error | undefined>(undefined);

  const fetchQuery = useCallback(() => {
    setStatus("loading");
    callback()
      .then((res) => {
        setData(res);
        setError(undefined);
        setStatus("success");
      })
      .catch((err) => {
        setStatus("error");
        setData(undefined);
        setError(err);
      });
  }, [callback]);
  useEffect(() => {
    if (options.enabled) {
      fetchQuery();
    }
  }, [fetchQuery, options.enabled]);

  useEffect(() => {
    if (options.refetchInterval && options.refetchInterval > 0) {
      const id = setInterval(() => {
        fetchQuery();
        return () => {
          clearInterval(id);
        };
      }, options.refetchInterval * 1000);
    }
  }, [fetchQuery, options.refetchInterval]);

  return { status, data, error };
};
