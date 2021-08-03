const express = require("express");
const { ChatController } = require("../controller/chat-controller");
const { UserController } = require("../controller/user-controller");
const router = express.Router();
const chatController = new ChatController();
const userController = new UserController();

router.get("/", (req, res) => {
  res.status(400).json({ message: "Please request chat_room with id!!" });
});
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const data = await chatController.getChatRoom(id);
  if (!data) {
    return res.status(404).json({ message: "ChatRoom not found!" });
  }
  res.json(data);
});

const requiredFields = ["members"];
router.post("/new", async (req, res) => {
  const chatRoom = req.body.chat_room;
  const isValidChatRoom = chatRoom && requiredFields.every((f) => chatRoom[f]);
  if (!isValidChatRoom) {
    return res.status(400).json({
      message: "Please provide all the fields!!",
      requiredFields,
    });
  }
  const exists = await chatController.getChatRoom(chatRoom.id);
  if (exists)
    return res.status(400).json({
      message: "ChatRoom already exists!!",
    });

  const result = await chatController.createChatRoom(
    chatRoom.members,
    chatRoom.id
  );
  if (result) {
    userController.addChatRoom(chatRoom.members, result.id);
    return res.json({ message: "Success!!", chat_room: result });
  }
  return res.status(400).json({
    message: "Unknown Error!!",
  });
});

exports.chatRoutes = router;
