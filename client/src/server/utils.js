export const delay = (fun, secs, ...args) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(fun(...args));
    }, secs * 1000);
  });
};
