const express = require("express");
const { DEFAULT_AVATAR } = require("../constants");
const { ChatController } = require("../controller/chat-controller");
const { UserController } = require("../controller/user-controller");

const { extractFields, checkFields, responseType } = require("./utils");

const router = express.Router();
const userController = new UserController();
const chatController = new ChatController();

//all user route
router.get("/", (req, res) => {
  responseType.sendUnauthorized(res);
});

//get user by id
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const user = await userController.getUser(id);

  if (!user) {
    return responseType.sendResourceNotFound(res, "User");
  }

  let fields = req.query.fields;

  if (fields === undefined) {
    fields = ["id"];
  } else fields = fields.split(",");

  const result = extractFields(user, fields);
  delete result.password;
  responseType.sendSuccess(res, undefined, { result });
});

//create user
router.post("/", async (req, res) => {
  const requiredFields = ["id", "password", "name"];
  const user = req.body.user;
  const isUserValid = user && checkFields(user, requiredFields);

  if (!isUserValid) {
    return responseType.sendBadRequest(res, "Please provide all the fields!!", {
      requiredFields,
    });
  }

  const exists = await userController.getUser(user.id);
  if (exists) return responseType.sendBadRequest(res, "User already exists!!");

  const result = await userController.saveUser({
    ...user,
    chatRooms: [],
    profilePicture: user.profilePicture || DEFAULT_AVATAR,
  });
  if (result) return responseType.sendSuccess(res);
  responseType.sendUnknownError(res);
});

//get all chats of a user
router.get("/:id/chats", async (req, res) => {
  const id = req.params.id;
  const user = await userController.getUser(id);

  if (!user) {
    return responseType.sendResourceNotFound(res, "User");
  }

  const chatRooms = await Promise.all(
    user.chatRooms.map((cid) => chatController.getChatRoom(cid))
  );

  let fields = req.query.fields;

  if (fields === undefined) {
    fields = ["id"];
  } else fields = fields.split(",");

  const result = chatRooms.map((room) => extractFields(room, fields));

  responseType.sendSuccess(res, undefined, { result });
});

exports.userRoutes = router;
