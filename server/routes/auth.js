const express = require("express");
const { AuthController } = require("../controller/auth-controller");
const { sendResponse } = require("./utils");
const router = express.Router();
const authController = new AuthController();

router.get("/", (req, res) => {
  sendResponse.unauthorized(res);
});

//login user with id and password
router.post("/login", async (req, res) => {
  const { id, password } = req.body;
  if (!id || !password) {
    return sendResponse.badRequest(res, "You didn't provide an id or password");
  }
  const result = await authController.verifyLogin(id, password);

  if (result)
    return sendResponse.success(res, "Success! You are now logged in!");

  sendResponse.unauthorized(res);
});

exports.authRoutes = router;
