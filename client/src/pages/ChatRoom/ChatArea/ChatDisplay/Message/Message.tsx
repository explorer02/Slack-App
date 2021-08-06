import React from "react";
import { MessageType } from "../../../../../types/MessageType";
import { UserType } from "../../../../../types/UserType";
import "./message.css";

type MessageProps = {
  message: MessageType;
  user: UserType;
};
const getDate = (timestamp: number) => {
  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(timestamp);
};

export const Message = (props: MessageProps) => {
  if (props.user === undefined) return null;
  return (
    <div className="message-container">
      <img
        src={
          props.user.profilePicture ||
          "https://static.vecteezy.com/system/resources/previews/000/439/863/non_2x/vector-users-icon.jpg"
        }
        alt=""
      />
      <div>
        <p className="message-user">
          <span>{props.user.name}</span>
          <span>{getDate(props.message.timestamp)}</span>
        </p>
        <p className="message-text">{props.message.text}</p>
      </div>
    </div>
  );
};
