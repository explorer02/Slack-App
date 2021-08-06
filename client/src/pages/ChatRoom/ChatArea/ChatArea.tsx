import React from "react";

import { ChatCompose } from "./ChatCompose/ChatCompose";
import { ChatDisplay } from "./ChatDisplay/ChatDisplay";
import { RoomTitle } from "./RoomTitle/RoomTitle";

import { ChatRoomMax } from "../../../types/ChatRoom";

import "./chat-area.css";

type ChatAreaProps = {
  chatRoom: ChatRoomMax;
  onMessageSend: (text: string) => void;
};

export const ChatArea = (props: ChatAreaProps) => {
  return (
    <div className="chat-area">
      <RoomTitle
        roomName={props.chatRoom.name}
        roomImage={props.chatRoom.roomImage}
      />
      <ChatDisplay
        messages={props.chatRoom.messages}
        members={props.chatRoom.members}
      />
      <ChatCompose onMessageSend={props.onMessageSend} />
    </div>
  );
};
