import React from "react";
import { MessageType } from "../../../../types/MessageType";
import { UserType } from "../../../../types/UserType";
import "./chat-display.css";
import { Message } from "./Message/Message";

type ChatDisplayProps = {
  messages: MessageType[];
  members: UserType[];
};
const findUser = (userList: UserType[], id: String) => {
  return (
    userList.find((user) => user && user.id === id) || { id: "", name: "" }
  );
};
const ChatDisplay = (props: ChatDisplayProps) => {
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

export default ChatDisplay;
