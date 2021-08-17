import { Message } from "./Message";
import { User } from "./User";
import { ROOM_CHANNEL, ROOM_DM } from "constant";

export type ChatRoomMin = {
  id: string;
  name: string;
  type: "dm" | "channel";
};

export type ChatRoomMax = {
  id: string;
  name: string;
  type: "dm" | "channel";
  roomImage: string;
  members: User[];
  messages: Message[];
};
