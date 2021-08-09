import { DELAY_TIME } from "./constants";
import { delay } from "./utils";

export const getAllUsers = () => {
  return JSON.parse(localStorage.getItem("users"));
};

const getUserHelper = (id, attributes) => {
  const result = getAllUsers().find((user) => user.id === id);
  if (result === undefined) throw new Error("User not found!!");
  const user = {};
  attributes.forEach((attribute) => {
    user[attribute] = result[attribute];
  });
  return user;
};
export const getUser = (id, attributes) => {
  return delay(getUserHelper, DELAY_TIME, id, attributes);
};
export const getMultipleUsers = (ids, attributes) => {
  return delay(() => {
    return ids.map((id) => getUserHelper(id, attributes));
  }, DELAY_TIME);
};
