export const delay = (fun, secs, ...args) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const result = fun(...args);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    }, secs * 1000);
  });
};
