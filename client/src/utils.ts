export const delayTask = (task: () => void, seconds: number) => {
  setTimeout(task, seconds * 1000);
};
