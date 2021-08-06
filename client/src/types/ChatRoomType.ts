import { MessageType } from "./MessageType";
import { UserType } from "./UserType";

export type ChatRoomType = {
  id: string;
  name: string;
  type: "duel" | "channel";
  image?: string;
  members: UserType[];
  messages: MessageType[];
};
