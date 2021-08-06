export const getAllUsers = () => {
  return JSON.parse(localStorage.getItem("users"));
};
