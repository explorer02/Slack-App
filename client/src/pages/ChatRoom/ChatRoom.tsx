import React, { useState, useCallback, useContext } from "react";

import { RoomList } from "./RoomList/RoomList";
import { ChatArea } from "./ChatArea/ChatArea";

import { ChatRoomMin } from "../../types/ChatRoom";

import { CHATROOM_MIN_ATTRIBUTES } from "../../attributes";
import { useQuery } from "../../hooks/useQuery";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./chat-room.css";
import { ajaxClient } from "../../ajaxClient";

export const ChatRoom = () => {
  const [chatRoomID, setChatRoomID] = useState<string | undefined>();
  const currentUser = useContext(CurrentUserContext);

  const fetchChatRoomsMin = useCallback(
    () =>
      ajaxClient.get(
        `/users/${currentUser?.id}/chats?fields=${CHATROOM_MIN_ATTRIBUTES.join(
          ","
        )}`
      ),
    [currentUser?.id]
  );

  const chatRoomListMinQuery = useQuery<ChatRoomMin[]>(fetchChatRoomsMin);
  const chatRoomListMin = chatRoomListMinQuery.data;

  const loadChatRoom = useCallback((id: string) => {
    setChatRoomID(id);
  }, []);

  if (
    chatRoomListMinQuery.status === "loading" ||
    chatRoomListMinQuery.status === "idle"
  )
    return <p>Loading....</p>;
  if (chatRoomListMinQuery.status === "error")
    return (
      <p>{chatRoomListMinQuery.error?.message || "Some Error Occured...."}</p>
    );
  return (
    <div className="chat-room">
      <RoomList
        onClickListItem={loadChatRoom}
        rooms={chatRoomListMin || []}
        selectedRoomId={chatRoomID || ""}
      />
      <ChatArea chatRoomID={chatRoomID} />
    </div>
  );
};
