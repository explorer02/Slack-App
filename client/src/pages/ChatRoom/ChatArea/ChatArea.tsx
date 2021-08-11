import React, { useCallback, useContext } from "react";

import { ChatCompose } from "./ChatCompose/ChatCompose";
import { ChatDisplay } from "./ChatDisplay/ChatDisplay";
import { RoomTitle } from "./RoomTitle/RoomTitle";

import { ChatRoomMax } from "../../../types/ChatRoom";

import { CHATROOM_MAX_ATTRIBUTES, USER_ATTRIBUTES } from "../../../attributes";
import { useQuery } from "../../../hooks/useQuery";
import { User } from "../../../types/User";
import { useMutation } from "../../../hooks/useMutation";
import { CurrentUserContext } from "../../../contexts/CurrentUserContext";
import { Message as MessageType } from "../../../types/Message";
import { DEFAULT_AVATAR } from "../../../constants";

import "./chat-area.css";
import { ajaxClient } from "../../../ajaxClient";

type ChatAreaProps = {
  chatRoomID: string | undefined;
};

export const ChatArea = (props: ChatAreaProps) => {
  const currentUser = useContext(CurrentUserContext);

  const fetchChatRoom = useCallback(
    () =>
      ajaxClient.get(
        `/chats/${props.chatRoomID}?fields=${CHATROOM_MAX_ATTRIBUTES.join(",")}`
      ),
    [props.chatRoomID]
  );

  const chatRoomQuery = useQuery<ChatRoomMax>(fetchChatRoom, {
    enabled: props.chatRoomID !== undefined,
    refetchInterval: 2,
  });
  const chatRoom = chatRoomQuery.data;

  const fetchUserList = useCallback(
    () =>
      ajaxClient.get(
        `/chats/${props.chatRoomID}/users?fields=${USER_ATTRIBUTES.join(",")}`
      ),
    [props.chatRoomID]
  );
  const userListQuery = useQuery<User[]>(fetchUserList, {
    enabled: chatRoom !== undefined,
  });
  const members = userListQuery.data;

  const sendMessage = useCallback(
    (message: MessageType) =>
      ajaxClient.post(`/chats/${props.chatRoomID}/message`, { message }),
    [props.chatRoomID]
  );

  const messageMutation = useMutation(sendMessage);
  const { mutate: messageMutate } = messageMutation;

  const handleMessageSend = useCallback(
    (text: string) => {
      if (currentUser !== undefined) {
        const newMsg: MessageType = {
          id: "",
          timestamp: Date.now(),
          text,
          senderId: currentUser.id,
        };
        messageMutate(newMsg);
      }
    },
    [currentUser, messageMutate]
  );

  let roomName: string = "Please Select a ChatRoom",
    roomImage: string = DEFAULT_AVATAR,
    memberList: User[] = [],
    messageList: MessageType[] = [];
  if (chatRoom !== undefined) {
    roomName = chatRoom.id;
    roomImage = chatRoom.roomImage;
    if (members !== undefined) {
      messageList = chatRoom.messages;
      memberList = members;
      if (chatRoom.type === "dm") {
        const otherMember =
          members[0].id !== currentUser?.id ? members[0] : members[1];
        roomName = otherMember.name;
      }
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
