import React from "react";
import { ChatRoomType } from "../../../types/ChatRoomType";
import "./chat-area.css";
import ChatCompose from "./ChatCompose/ChatCompose";
import ChatDisplay from "./ChatDisplay/ChatDisplay";
import RoomTitle from "./RoomTitle/RoomTitle";

type ChatAreaProps = {
  chatRoom: ChatRoomType;
  onMessageSend: (text: string) => void;
};

export const ChatArea = (props: ChatAreaProps) => {
  return (
    <div className="chat-area">
      <RoomTitle
        roomName={props.chatRoom.name}
        roomImage={props.chatRoom.image}
      />
      <ChatDisplay
        messages={props.chatRoom.messages}
        members={props.chatRoom.members}
      />
      <ChatCompose onMessageSend={props.onMessageSend} />
    </div>
  );
};
