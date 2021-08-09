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
    console.log("Fetching Data");
    setStatus("loading");
    callback()
      .then((res) => {
        //TODO order
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

  // useEffect(() => {
  //   if (options.refetchInterval && options.refetchInterval > 0) {
  //     const id = setInterval(() => {
  //       fetchQuery();
  //     }, options.refetchInterval * 1000);
  //     return () => {
  //       clearInterval(id);
  //     };
  //   }
  // }, [fetchQuery, options.refetchInterval]);

  return { status, data, error };
};
