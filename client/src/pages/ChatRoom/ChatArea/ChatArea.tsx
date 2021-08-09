import React, { useCallback, useContext } from "react";

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
import { useMutation } from "../../../hooks/useMutation";
import { sendMessage } from "../../../server/message";
import { CurrentUserContext } from "../../../contexts/CurrentUserContext";
import { Message as MessageType } from "../../../types/Message";
import { DEFAULT_AVATAR } from "../../../constants";

type ChatAreaProps = {
  // onMessageSend: (text: string) => void;
  chatRoomID: string | undefined;
};

export const ChatArea = (props: ChatAreaProps) => {
  const currentUser = useContext(CurrentUserContext);

  const fetchChatRoom = useCallback(
    () => getChatRoom(props.chatRoomID, CHATROOM_MAX_ATTRIBUTES),
    [props.chatRoomID]
  );

  const chatRoomQuery = useQuery(fetchChatRoom, {
    enabled: props.chatRoomID !== undefined,
    refetchInterval: 2,
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

  const messageMutation = useMutation(sendMessage);

  const handleMessageSend = useCallback(
    (text: string) => {
      if (currentUser !== undefined) {
        const newMsg: MessageType = {
          id: Date.now() + "",
          timestamp: Date.now(),
          text,
          sender_id: currentUser.id,
        };
        messageMutation.mutate(props.chatRoomID, newMsg);
      }
    },
    [currentUser, messageMutation, props.chatRoomID]
    //TODO: optimize
  );

  // console.log(chatRoomQuery, userListQuery, messageMutation);

  let roomName: string = "Please Select a ChatRoom",
    roomImage: string = DEFAULT_AVATAR,
    memberList: User[] = [],
    messageList: MessageType[] = [];
  if (chatRoom !== undefined) {
    roomName = chatRoom.name;
    roomImage = chatRoom.roomImage;
    if (members !== undefined) {
      messageList = chatRoom.messages;
      memberList = members;
    }
  }
  // if (chatRoom === undefined) return <p>Please Select a Chat</p>;
  // if (userListQuery.status === "loading" || chatRoomQuery.status === "loading")
  //   return <p>Loading...</p>;

  return (
    <div className="chat-area">
      <RoomTitle roomName={roomName} roomImage={roomImage} />
      <ChatDisplay messages={messageList} members={memberList} />
      <ChatCompose onMessageSend={handleMessageSend} />
    </div>
  );
};
