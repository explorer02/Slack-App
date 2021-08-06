import { getAllUsers } from "./users";
import { delay } from "./utils";

const validateLoginHelper = (id, password) => {
  const user = getAllUsers().find((user) => user.id === id);
  
  return user !== undefined && user.password === password;
};

export const validateLogin = (id, password) => {
  return delay(validateLoginHelper, 1, id, password);
};
