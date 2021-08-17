const express = require("express");
const {
  DEFAULT_AVATAR,
  CHATROOM_MAIN_ATTRIBUTES,
  CHATROOM_DM,
  CHATROOM_CHANNEL,
  DEFAULT_CHATROOM_NAME,
  USER_FIELDS,
  DEFAULT_MESSAGE_COUNT,
} = require("./constants");
const { ChatController } = require("../controller/chat-controller");
const { UserController } = require("../controller/user-controller");
const { extractFields, checkFields, responseType } = require("./utils");

const router = express.Router();

const chatController = new ChatController();
const userController = new UserController();

router.get("/", (req, res) => {
  responseType.sendUnauthorized(res);
});
//get chatroom by id
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  let uid = req.query.id;
  const chatRoom = await chatController.getChatRoom(id);
  const user = await userController.getUser(uid);

  if (!chatRoom) {
    return responseType.sendResourceNotFound(res, "ChatRoom");
  }
  if (!user || !chatRoom.members.includes(uid)) {
    return responseType.sendUnauthorized(res);
  }

  let name = "";
  if (chatRoom.type === CHATROOM_CHANNEL) {
    name = chatRoom.id;
  } else {
    const otherUserId =
      chatRoom.members[0] === uid ? chatRoom.members[1] : chatRoom.members[0];
    const otherUser = await userController.getUser(otherUserId);
    if (!otherUser) name = DEFAULT_CHATROOM_NAME;
    else name = otherUser.name;
  }
  chatRoom.name = name;

  const result = extractFields(chatRoom, CHATROOM_MAIN_ATTRIBUTES);

  //pagination
  const lastId = req.query.lastId;
  const count = req.query.count || DEFAULT_MESSAGE_COUNT;
  if (lastId === undefined) {
    result.messages = result.messages.slice(-count);
  } else {
    const index = result.messages.findIndex(
      (messages) => messages.id === lastId
    );
    if (index !== -1) {
      result.messages = result.messages.slice(
        Math.max(index - count, 0),
        index
      );
    } else {
      result.messages = result.messages.slice(-count);
    }
  }
  responseType.sendSuccess(res, undefined, { result });
});

//create new chatroom
router.post("/", async (req, res) => {
  const requiredFields = ["id", "members", "type"];
  const chatRoom = req.body.chatRoom;
  const isValidChatRoom = chatRoom && checkFields(chatRoom, requiredFields);

  if (!isValidChatRoom) {
    return responseType.sendBadRequest(res, "Please provide all the fields!!", {
      requiredFields,
    });
  }
  const exists = await chatController.getChatRoom(chatRoom.id);
  if (exists)
    return responseType.sendBadRequest(res, "ChatRoom already exists!!");

  const result = await chatController.createChatRoom({
    ...chatRoom,
    messages: [],
    roomImage: chatRoom.roomImage || DEFAULT_AVATAR,
  });
  if (result) {
    userController.addChatRoom(chatRoom.members, result.id);
    return responseType.sendSuccess(res, undefined, { result });
  }
  return responseType.sendUnknownError(res);
});

//add message to chatroom
router.post("/:id/message", async (req, res) => {
  const requiredFields = ["timestamp", "text", "senderId"];
  const roomId = req.params.id;
  const message = req.body.message;
  if (!message) {
    return responseType.sendBadRequest(
      res,
      "Error!!  message object is missing"
    );
  }
  const isMessageValid = message && checkFields(message, requiredFields);

  if (!isMessageValid) {
    return responseType.sendBadRequest(res, "Please provide all the fields!!", {
      requiredFields,
    });
  }
  const chatRoom = await chatController.getChatRoom(roomId);
  if (!chatRoom) {
    return responseType.sendResourceNotFound(res, "ChatRoom");
  }
  if (!chatRoom.members.includes(message.senderId)) {
    return responseType.sendUnauthorized(res);
  }

  const result = await chatController.addMessage(roomId, {
    ...message,
    id: roomId + "_" + message.timestamp,
  });
  if (result) return responseType.sendSuccess(res);
  return responseType.sendUnknownError(res);
});

//get all users of a chat room
router.get("/:id/users", async (req, res) => {
  const id = req.params.id;
  const chatRoom = await chatController.getChatRoom(id);

  if (!chatRoom) {
    return responseType.sendResourceNotFound(res, "ChatRoom");
  }

  const users = await Promise.all(
    chatRoom.members.map((uid) => userController.getUser(uid))
  );

  const result = users.map((user) => extractFields(user, USER_FIELDS));

  responseType.sendSuccess(res, undefined, { result });
});

exports.chatRoutes = router;
