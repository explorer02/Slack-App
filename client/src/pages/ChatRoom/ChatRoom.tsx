import React, { useState } from "react";
import "./chat-room.css";
import { RoomList } from "./RoomList/RoomList";
import { ChatArea } from "./ChatArea/ChatArea";
import { Room } from "./RoomList/RoomType";
import { ChatRoomType } from "../../types/ChatRoomType";
import { UserType } from "../../types/UserType";
import { MessageType } from "../../types/MessageType";

const chatRoomListSome: Room[] = [
  { id: "sam_malcolm", name: "Sam", type: "duel" },
  { id: "john_malcolm", name: "John", type: "duel" },
  { id: "jack_malcolm", name: "Jack", type: "duel" },
  { id: "channel1", name: "Book Club", type: "channel" },
  { id: "channel2", name: "ProGamer", type: "channel" },
];
const members: UserType[] = [
  {
    id: "sam",
    name: "Sam",
  },
  {
    id: "john",
    name: "John",
  },
  {
    id: "jack",
    name: "Jack",
  },
  {
    id: "malcolm",
    name: "Malcolm",
  },
];

const messageList: MessageType[] = [
  {
    id: "m123",
    timestamp: 1628166241194,
    text: "Hello Sam",
    sender_id: "malcolm",
  },
  {
    id: "m124",
    timestamp: 1628166341194,
    text: "Hello Malcolm",
    sender_id: "sam",
  },
  {
    id: "m125",
    timestamp: 1628166441194,
    text: "Sup?",
    sender_id: "malcolm",
  },
  {
    id: "m126",
    timestamp: 1628166541194,
    text: "Sky's Up. See ya!",
    sender_id: "sam",
  },
];
const chatRoomListAll: ChatRoomType[] = [
  {
    id: "sam_malcolm",
    name: "Sam",
    messages: messageList,
    type: "duel",
    members: [members[0], members[3]],
  },
  {
    id: "john_malcolm",
    name: "John",
    messages: [],
    type: "duel",
    members: [members[1], members[3]],
  },
  {
    id: "jack_malcolm",
    name: "Jack",
    messages: [],
    type: "duel",
    members: [members[2], members[3]],
  },

  {
    id: "channel1",
    name: "Book Club",
    messages: [],
    type: "channel",
    members: [members[0], members[2], members[3]],
  },

  {
    id: "channel2",
    name: "ProGamer",
    messages: [],
    type: "channel",
    members: [members[0], members[1], members[3]],
  },
];

export const ChatRoom = () => {
  const [chatRoom, setChatRoom] = useState<ChatRoomType>(chatRoomListAll[0]);
  const loadChatRoom = (id: string) => {
    setChatRoom(
      (c) => chatRoomListAll.find((chatRoom) => chatRoom.id === id) || c
    );
  };
  const handleMessageSend = (text: string) => {
    const newMsg: MessageType = {
      id: Date.now() + "",
      timestamp: Date.now(),
      text,
      sender_id: "malcolm",
    };
    setChatRoom({ ...chatRoom, messages: [...chatRoom.messages, newMsg] });
  };
  return (
    <div className="chat-room">
      <RoomList
        onClickListItem={loadChatRoom}
        rooms={chatRoomListSome}
        selectedRoomId={chatRoom.id}
      />
      <ChatArea chatRoom={chatRoom} onMessageSend={handleMessageSend} />
    </div>
  );
};
