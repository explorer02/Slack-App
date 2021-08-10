const express = require("express");
const { DEFAULT_AVATAR } = require("../constants");
const { ChatController } = require("../controller/chat-controller");
const { UserController } = require("../controller/user-controller");
const { extractFields, checkFields, sendResponse } = require("./utils");

const router = express.Router();

const chatController = new ChatController();
const userController = new UserController();

router.get("/", (req, res) => {
  sendResponse.unauthorized(res);
});
//get chatroom by id
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const chatRoom = await chatController.getChatRoom(id);

  if (!chatRoom) {
    return sendResponse.resourceNotFound(res, "ChatRoom");
  }

  let fields = req.query.fields;

  if (fields === undefined) {
    fields = ["id"];
  } else fields = fields.split(",");

  const result = extractFields(chatRoom, fields);

  sendResponse.success(res, undefined, { result });
});

//create new chatroom
router.post("/", async (req, res) => {
  const requiredFields = ["id", "members", "type"];
  const chatRoom = req.body.chat_room;
  const isValidChatRoom = chatRoom && checkFields(chatRoom, requiredFields);

  if (!isValidChatRoom) {
    sendResponse.badRequest(res, "Please provide all the fields!!", {
      requiredFields,
    });
  }

  const exists = await chatController.getChatRoom(chatRoom.id);
  if (exists) return sendResponse.badRequest(res, "ChatRoom already exists!!");

  const result = await chatController.createChatRoom({
    ...chatRoom,
    messages: [],
    roomImage: chatRoom.roomImage || DEFAULT_AVATAR,
  });
  if (result) {
    userController.addChatRoom(chatRoom.members, result.id);
    return sendResponse.success(res, undefined, { result });
  }
  return sendResponse.unknownError(res);
});

//add message to chatroom
router.post("/:id/message", async (req, res) => {
  const requiredFields = ["timestamp", "text", "sender_id"];
  const roomId = req.params.id;
  const message = req.body.message;
  if (!message) {
    return sendResponse.badRequest(res, "Error!!  message object is missing");
  }
  const isMessageValid = message && checkFields(message, requiredFields);
  if (!isMessageValid) {
    return sendResponse.badRequest(
      res,
      "Please provide all the fields!!",
      requiredFields
    );
  }
  const isValidChatRoom = await chatController.getChatRoom(roomId);
  if (!isValidChatRoom) {
    return sendResponse.resourceNotFound(res, "ChatRoom");
  }

  const result = await chatController.addMessage(roomId, {
    ...message,
    id: roomId + "_" + message.timestamp,
  });
  if (result) return sendResponse.success(res);
  return sendResponse.unknownError(res);
});

//get all users of a chat room
router.get("/:id/users", async (req, res) => {
  const id = req.params.id;
  const chatRoom = await chatController.getChatRoom(id);

  if (!chatRoom) {
    return sendResponse.resourceNotFound(res, "ChatRoom");
  }

  const users = await Promise.all(
    chatRoom.members.map((uid) => userController.getUser(uid))
  );

  let fields = req.query.fields;

  if (fields === undefined) {
    fields = ["id"];
  } else fields = fields.split(",");

  const result = users.map((user) => extractFields(user, fields));

  sendResponse.success(res, undefined, { result });
});

exports.chatRoutes = router;
