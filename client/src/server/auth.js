import { DELAY_TIME } from "./constants";
import { getAllUsers } from "./users";
import { delay } from "./utils";

const validateLoginHelper = (id, password) => {
  const user = getAllUsers().find((user) => user.id === id);
  const res = user !== undefined && user.password === password;
  if (!res) throw new Error("Invalid UserID or password...");
  return res;
};

export const validateLogin = (id, password) => {
  return delay(validateLoginHelper, DELAY_TIME, id, password);
};
