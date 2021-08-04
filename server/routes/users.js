const express = require("express");
const { UserController } = require("../controller/user-controller");
const router = express.Router();
const userController = new UserController();

//all user route
router.get("/", (req, res) => {
  return res.send("All Users cannot be requested!!");
});

//get user by id
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const user = await userController.getUser(id);
  if (user) {
    delete user.password;
    delete user.chat_rooms;
    res.json(user);
  } else res.status(404).send({ message: "User not found" });
});

//create user
const requiredFields = ["id", "password", "name", "email"];
router.post("/new", async (req, res) => {
  const user = req.body.user;
  //if user not provided or all required fielsds not present
  const isUserValid = user && requiredFields.every((f) => user[f]);
  if (!isUserValid) {
    return res.status(400).json({
      message: "Please provide all the fields!!",
      requiredFields,
    });
  }

  const exists = await userController.getUser(user.id);
  if (exists)
    return res.status(400).json({
      message: "User already exists!!",
    });
  const result = await userController.saveUser(user);
  if (result) return res.json({ message: "Success!!", user });
  return res.status(400).json({
    message: "Unknown Error!!",
  });
});

exports.userRoutes = router;
