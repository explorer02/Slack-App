import { DELAY_TIME } from "./constants";
import { delay } from "./utils";

export const getAllChatRooms = () => {
  return JSON.parse(localStorage.getItem("chat_rooms"));
};

const getChatRoomHelper = (id, attributes) => {

    const result = getAllChatRooms().find((chatRoom) => chatRoom.id === id);
    
  if (result === undefined) throw new Error("ChatRoom not found!!");
  const chatRoom = {};
  attributes.forEach((attribute) => {
    chatRoom[attribute] = result[attribute];
  });
  return chatRoom;
};

export const getChatRoom = (id, attributes) => {
  return delay(getChatRoomHelper, DELAY_TIME, id, attributes);
};
export const getMultipleChatRooms = (ids, attributes) => {
  return delay(() => {
    return ids.map((id) => getChatRoomHelper(id, attributes));
  }, DELAY_TIME);
};
