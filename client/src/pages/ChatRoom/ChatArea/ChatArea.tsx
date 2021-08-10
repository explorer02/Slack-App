import React, { useCallback, useContext } from "react";

import { ChatCompose } from "./ChatCompose/ChatCompose";
import { ChatDisplay } from "./ChatDisplay/ChatDisplay";
import { RoomTitle } from "./RoomTitle/RoomTitle";

import { ChatRoomMax } from "../../../types/ChatRoom";

import { getChatRoomUsers } from "../../../server/users";
import { CHATROOM_MAX_ATTRIBUTES, USER_ATTRIBUTES } from "../../../attributes";
import { getChatRoom } from "../../../server/chatRoom";
import { useQuery } from "../../../hooks/useQuery";
import { User } from "../../../types/User";
import { useMutation } from "../../../hooks/useMutation";
import { sendMessage } from "../../../server/message";
import { CurrentUserContext } from "../../../contexts/CurrentUserContext";
import { Message as MessageType } from "../../../types/Message";
import { DEFAULT_AVATAR } from "../../../constants";

import "./chat-area.css";

type ChatAreaProps = {
  chatRoomID: string | undefined;
};

export const ChatArea = (props: ChatAreaProps) => {
  const currentUser = useContext(CurrentUserContext);

  const fetchChatRoom = useCallback(
    () => getChatRoom(props.chatRoomID, CHATROOM_MAX_ATTRIBUTES),
    [props.chatRoomID]
  );
  const chatRoomQuery = useQuery<ChatRoomMax>(fetchChatRoom, {
    enabled: props.chatRoomID !== undefined,
    refetchInterval: 2,
  });
  const chatRoom = chatRoomQuery.data;

  const fetchUserList = useCallback(
    () => getChatRoomUsers(props.chatRoomID, USER_ATTRIBUTES),
    [props.chatRoomID]
  );
  const userListQuery = useQuery<User[]>(fetchUserList, {
    enabled: chatRoom !== undefined,
  });
  const members = userListQuery.data;

  const messageMutation = useMutation(sendMessage);
  const { mutate: messageMutate } = messageMutation;

  const handleMessageSend = useCallback(
    (text: string) => {
      if (currentUser !== undefined) {
        const newMsg: MessageType = {
          id: Date.now() + "",
          timestamp: Date.now(),
          text,
          sender_id: currentUser.id,
        };
        messageMutate(props.chatRoomID, newMsg);
      }
    },
    [currentUser, messageMutate, props.chatRoomID]
  );

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

  return (
    <div className="chat-area">
      <RoomTitle roomName={roomName} roomImage={roomImage} />
      <ChatDisplay messages={messageList} members={memberList} />
      <ChatCompose
        onMessageSend={handleMessageSend}
        disabled={
          chatRoom === undefined || messageMutation.status === "loading"
        }
      />
    </div>
  );
};
