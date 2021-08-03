const express = require("express");
const { UserController } = require("../controller/user-controller");
const router = express.Router();
const userController = new UserController();

router.get("/", (req, res) => {
  return res.send("All Users cannot be requested!!");
});
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const user = await userController.getUser(id);
  if (user) res.json(user);
  else res.status(404).send({ message: "User not found" });
});

const requiredFields = ["id", "password", "name", "email"];
router.post("/new", async (req, res) => {
  const user = req.body.user;

  const isUserValid = user && requiredFields.every((f) => user[f]);
  if (!isUserValid)
    return res.json({
      message: "Please provide all the fields!!",
      requiredFields,
    });

  const exists = await userController.getUser(user.id);
  if (exists)
    return res.json({
      message: "User already exists!!",
    });
  const result = await userController.saveUser(user);
  if (result) return res.json({ message: "Success!!", user });
  return res.json({
    message: "Unknown Error!!",
  });
});

exports.userRoutes = router;
