import React from "react";

import { Message as MessageType } from "../../../../../types/Message";
import { User } from "../../../../../types/User";

import "./message.css";

type MessageProps = {
  message: MessageType;
  user: User;
};
const getDateFromMillis = (timestamp: number) => {
  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(timestamp);
};

export const Message = (props: MessageProps) => {
  if (props.user === undefined) return null;
  return (
    <div className="message-container">
      <img src={props.user.profilePicture} alt="" className="message-profile-pic"/>
      <div>
        <p className="message-user">
          <span className="message-username">{props.user.name}</span>
          <span className="message-time">{getDateFromMillis(props.message.timestamp)}</span>
        </p>
        <p className="message-text">{props.message.text}</p>
      </div>
    </div>
  );
};
