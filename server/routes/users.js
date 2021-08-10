const express = require("express");
const { DEFAULT_AVATAR } = require("../constants");
const { ChatController } = require("../controller/chat-controller");
const { UserController } = require("../controller/user-controller");

const { extractFields, checkFields, sendResponse } = require("./utils");

const router = express.Router();
const userController = new UserController();
const chatController = new ChatController();

//all user route
router.get("/", (req, res) => {
  sendResponse.unauthorized(res);
});

//get user by id
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const user = await userController.getUser(id);

  if (!user) {
    return sendResponse.resourceNotFound(res, "User");
  }

  let fields = req.query.fields;

  if (fields === undefined) {
    fields = ["id"];
  } else fields = fields.split(",");

  const result = extractFields(user, fields);
  delete result.password;
  sendResponse.success(res, undefined, { result });
});

//create user
router.post("/", async (req, res) => {
  const requiredFields = ["id", "password", "name"];
  const user = req.body.user;
  const isUserValid = user && checkFields(user, requiredFields);

  if (!isUserValid) {
    return sendResponse.badRequest(res, "Please provide all the fields!!", {
      requiredFields,
    });
  }

  const exists = await userController.getUser(user.id);
  if (exists) return sendResponse.badRequest(res, "User already exists!!");

  const result = await userController.saveUser({
    ...user,
    chat_rooms: [],
    profilePicture: user.profilePicture || DEFAULT_AVATAR,
  });
  if (result) return res.json({ message: "Success!!" });
  sendResponse.unknownError(res);
});

//get all chats of a user
router.get("/:id/chats", async (req, res) => {
  const id = req.params.id;
  const user = await userController.getUser(id);

  if (!user) {
    return sendResponse.resourceNotFound(res, "User");
  }

  const chatRooms = await Promise.all(
    user.chat_rooms.map((cid) => chatController.getChatRoom(cid))
  );

  let fields = req.query.fields;

  if (fields === undefined) {
    fields = ["id"];
  } else fields = fields.split(",");

  const result = chatRooms.map((room) => extractFields(room, fields));

  sendResponse.success(res, undefined, { result });
});

exports.userRoutes = router;
