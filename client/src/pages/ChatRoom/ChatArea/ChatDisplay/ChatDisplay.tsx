import React from "react";

import { Message } from "./Message/Message";

import { Message as MessageType } from "types/Message";
import { User } from "types/User";

import "./chat-display.css";
import { DEFAULT_USER } from "./../../../../constants";

type ChatDisplayProps = {
  messages: MessageType[];
  members: User[];
};
const findUser = (userList: User[], id: String) => {
  return userList.find((user) => user && user.id === id) || DEFAULT_USER;
};
export const ChatDisplay = (props: ChatDisplayProps) => {
  return (
    <div className="chat-display">
      {props.messages
        .slice()
        .reverse()
        .map((message) => (
          <Message
            key={message.id}
            message={message}
            user={findUser(props.members, message.senderId)}
          />
        ))}
    </div>
  );
};
