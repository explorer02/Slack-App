import React from "react";

import { Message } from "./Message/Message";

import { Message as MessageType } from "../../../../types/Message";
import { User } from "../../../../types/User";

import "./chat-display.css";
import { DEFAULT_AVATAR } from "../../../../constants";

type ChatDisplayProps = {
  messages: MessageType[];
  members: User[];
};
const findUser = (userList: User[], id: String) => {
  return (
    userList.find((user) => user && user.id === id) || {
      id: "",
      name: "",
      profilePicture: DEFAULT_AVATAR,
    }
  );
};
export const ChatDisplay = (props: ChatDisplayProps) => {
  console.log(props.messages.reverse().map((message) => message.text));
  return (
    <div className="chat-display">
      {props.messages.map((message) => (
        <Message
          key={message.id}
          message={message}
          user={findUser(props.members, message.sender_id)}
        />
      ))}
    </div>
  );
};
