const express = require("express");
const { AuthController } = require("../controller/auth-controller");
const router = express.Router();
const authController = new AuthController();

router.get("/", (req, res) => {
  res
    .status(401)
    .json({ message: "You don't have permission to access this page!!" });
});
router.get("/login", async (req, res) => {
  const { id, password } = req.query;
  if (id === undefined || password === undefined) {
    return res
      .status(400)
      .json({ message: "You didn't provide an id or password" });
  }
  console.log(id, password);
  const result = await authController.verifyLogin(id, password);
  if (result) return res.json({ message: "Success! You are now logged in!" });
  return res.status(401).json({ message: "Something's wrong!! :(" });
});

exports.authRoutes = router;
