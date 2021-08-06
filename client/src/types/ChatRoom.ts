import { Message } from "./Message";
import { User } from "./User";

export type ChatRoomMin = {
  id: string;
  name: string;
  type: "duel" | "channel";
};

export type ChatRoomMax = {
  id: string;
  name: string;
  type: "duel" | "channel";
  roomImage: string;
  members: User[];
  messages: Message[];
};
