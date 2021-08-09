import { DELAY_TIME } from "./constants";
import { delay } from "./utils";

export const getAllUsers = () => {
  return JSON.parse(localStorage.getItem("users"));
};

const getUserHelper = (id) => {
  const result = getAllUsers().find((user) => user.id === id);
  if (result === undefined) throw new Error("User not found!!");
  return result;
};
export const getUser = (id) => {
  return delay(getUserHelper, DELAY_TIME, id);
};
