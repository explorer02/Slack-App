import { Message } from "types/Message";
import { User } from "types/User";

export type ChatRoomSidebar = {
  id: string;
  name: string;
  type: "dm" | "channel";
};

export const CHATROOM_SIDEBAR_ATTRIBUTES = ["id", "type", "name"];

export type ChatRoomMain = {
  id: string;
  name: string;
  type: "dm" | "channel";
  roomImage: string;
  members: User[];
  messages: Message[];
};

export const CHATROOM_MAIN_ATTRIBUTES = [
  "id",
  "type",
  "name",
  "roomImage",
  "members",
  "messages",
];
