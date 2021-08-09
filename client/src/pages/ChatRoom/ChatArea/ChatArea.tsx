import React, { useCallback } from "react";

import { ChatCompose } from "./ChatCompose/ChatCompose";
import { ChatDisplay } from "./ChatDisplay/ChatDisplay";
import { RoomTitle } from "./RoomTitle/RoomTitle";

import { ChatRoomMax } from "../../../types/ChatRoom";

import "./chat-area.css";
import { getMultipleUsers } from "../../../server/users";
import { CHATROOM_MAX_ATTRIBUTES, USER_ATTRIBUTES } from "../../../attributes";
import { getChatRoom } from "../../../server/chatRoom";
import { useQuery } from "../../../hooks/useQuery";
import { User } from "../../../types/User";

type ChatAreaProps = {
  onMessageSend: (text: string) => void;
  chatRoomID: string | undefined;
};

export const ChatArea = (props: ChatAreaProps) => {
  const fetchChatRoom = useCallback(
    () => getChatRoom(props.chatRoomID, CHATROOM_MAX_ATTRIBUTES),
    [props.chatRoomID]
  );

  const chatRoomQuery = useQuery(fetchChatRoom, {
    enabled: props.chatRoomID !== undefined,
  });

  const chatRoom: ChatRoomMax = chatRoomQuery.data;

  const fetchUserList = useCallback(
    () => getMultipleUsers(chatRoom.members, USER_ATTRIBUTES),
    [chatRoom]
  );

  const userListQuery = useQuery(fetchUserList, {
    enabled: chatRoom !== undefined,
  });
  const members: User[] = userListQuery.data;

  // console.log(props.chatRoomID, chatRoomQuery, userListQuery);

  if (chatRoom === undefined) return <p>Please Select a Chat</p>;
  if (userListQuery.status === "loading" || chatRoomQuery.status === "loading")
    return <p>Loading...</p>;
  return (
    <div className="chat-area">
      <RoomTitle roomName={chatRoom.name} roomImage={chatRoom.roomImage} />
      <ChatDisplay messages={chatRoom.messages} members={members} />
      <ChatCompose onMessageSend={props.onMessageSend} />
    </div>
  );
};
