import React from "react";
import "./chat-room.css";
import { RoomList } from "./RoomList/RoomList";
import { ChatArea } from "./ChatArea/ChatArea";
import { Room } from "./RoomList/RoomType";

const dms: Room[] = [
  { id: "sam_malcolm", name: "Sam" },
  { id: "john_malcolm", name: "John" },
  { id: "jack_malcolm", name: "Jack" },
];
const channels: Room[] = [
  { id: "channel1", name: "Book Club" },
  { id: "channel2", name: "ProGamer" },
];

export const ChatRoom = () => {
  const loadChatRoom = (id: string) => {};
  return (
    <div className="chat-room">
      <RoomList onClickListItem={loadChatRoom} dms={dms} channels={channels} />
      <ChatArea />
    </div>
  );
};
