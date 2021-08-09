import { getAllChatRooms } from "./chatRoom";
import { DELAY_TIME } from "./constants";
import { delay } from "./utils";

export const sendMessageHelper = (roomId, message) => {
  const allChatRooms = getAllChatRooms();
  const chatRoom = allChatRooms.find((room) => room.id === roomId);
  if (chatRoom === undefined) {
    throw new Error("ChatRoom not found");
  }
  chatRoom.messages.push(message);
  console.log(chatRoom);
  localStorage.setItem("chat_rooms", JSON.stringify(allChatRooms));
};
export const sendMessage = (roomId, message) => {
  return delay(sendMessageHelper, DELAY_TIME, roomId, message);
};
