const express = require("express");
const { ChatController } = require("../controller/chat-controller");
const { UserController } = require("../controller/user-controller");
const {
  USER_FIELDS,
  DEFAULT_AVATAR,
  CHATROOM_SIDEBAR_FIELDS,
} = require("./constants");

const { extractFields, checkFields, responseType } = require("./utils");

const router = express.Router();
const userController = new UserController();
const chatController = new ChatController();

//all user route
router.get("/", async (req, res) => {
  const users = await userController.getAllUsers();
  if (!users) return responseType.sendResourceNotFound(res, "Users");
  const result = users.map((u) => extractFields(u, USER_FIELDS));
  responseType.sendSuccess(res, undefined, { result });
});

//get user by id
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const user = await userController.getUser(id);

  if (!user) {
    return responseType.sendResourceNotFound(res, "User");
  }

  const result = extractFields(user, USER_FIELDS);
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
    user.chatRooms.map(async (cid) => {
      const room = await chatController.getChatRoom(cid);
      if (room.type === "channel") room.name = room.id;
      else {
        const otherUserId =
          room.members[0] === id ? room.members[1] : room.members[0];
        room.name = (await userController.getUser(otherUserId)).name;
      }
      return extractFields(room, CHATROOM_SIDEBAR_FIELDS);
    })
  );
  responseType.sendSuccess(res, undefined, { result: chatRooms });
});

exports.userRoutes = router;
