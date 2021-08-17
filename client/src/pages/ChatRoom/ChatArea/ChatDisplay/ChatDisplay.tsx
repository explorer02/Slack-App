import React, { useEffect, useRef } from "react";

import { Message } from "./Message/Message";

import { Message as MessageType } from "types/Message";
import { User } from "types/User";

import "./chat-display.css";
import { DEFAULT_USER } from "./../../../../constants";

type ChatDisplayProps = {
  messages: MessageType[];
  members: User[];
  onReachingTop: () => void;
};
const findUser = (userList: User[], id: String) => {
  return userList.find((user) => user && user.id === id) || DEFAULT_USER;
};
export const ChatDisplay = (props: ChatDisplayProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const { onReachingTop, messages } = props;
  useEffect(() => {
    const div = ref.current;
    // console.log(div?.clientHeight, div?.scrollHeight, div?.scrollTop);

    if (!div) return;
    let signalled = false;
    const scrollEvent = () => {
      const pixelFromTop = div.clientHeight - div.scrollHeight - div.scrollTop;
      if (pixelFromTop > -20 && !signalled) {
        onReachingTop();
        console.log(pixelFromTop, signalled);
        signalled = true;
      }
    };
    div.addEventListener("scroll", scrollEvent);
    return () => {
      div.removeEventListener("scroll", scrollEvent);
    };
  }, [onReachingTop, messages.length]);
  return (
    <div className="chat-display" ref={ref}>
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
