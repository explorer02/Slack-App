import React, { useState, useCallback, useContext } from "react";

import { RoomList } from "./RoomList/RoomList";
import { ChatArea } from "./ChatArea/ChatArea";

import { ChatRoomMin } from "../../types/ChatRoom";

import { CHATROOM_MIN_ATTRIBUTES } from "../../attributes";
import { useQuery } from "../../hooks/useQuery";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./chat-room.css";
import { ajaxClient } from "../../ajaxClient";
import Modal from "../../components/Modal/Modal";
import NewChatRoomForm from "../../components/NewChatRoomForm/NewChatRoomForm";

export const ChatRoom = () => {
  const [chatRoomID, setChatRoomID] = useState<string | undefined>();
  // const [refreshCount, setRefreshCount] = useState(-1);
  const currentUser = useContext(CurrentUserContext);
  const [showNewChatRoomDialog, setShowNewChatRoomDialog] =
    useState<boolean>(false);

  const handleNewChatRoomDialogToggle = useCallback(
    () => setShowNewChatRoomDialog((c) => !c),
    []
  );
  const handleNewChatRoomCreate = useCallback(() => {
    // setRefreshCount((rc) => rc + 1);
    setShowNewChatRoomDialog(false);
  }, []);

  const fetchChatRoomsMin = useCallback(
    () =>
      ajaxClient.get(
        `/users/${currentUser?.id}/chats?fields=${CHATROOM_MIN_ATTRIBUTES.join(
          ","
        )}`
      ),
    [currentUser?.id]
  );

  const chatRoomListMinQuery = useQuery<ChatRoomMin[]>(fetchChatRoomsMin, {
    enabled: true,
    refetchInterval: 2,
    // refresh: refreshCount,
  });

  const chatRoomListMin = chatRoomListMinQuery.data;

  const loadChatRoom = useCallback((id: string) => {
    setChatRoomID(id);
  }, []);

  // if (
  //   chatRoomListMinQuery.status === "loading" ||
  //   chatRoomListMinQuery.status === "idle"
  // )
  //   return <p>Loading....</p>;
  if (chatRoomListMinQuery.status === "error")
    return (
      <p>{chatRoomListMinQuery.error?.message || "Some Error Occured...."}</p>
    );
  return (
    <div className="chat-room">
      {showNewChatRoomDialog && (
        <Modal>
          <NewChatRoomForm
            onCancel={handleNewChatRoomDialogToggle}
            onSuccess={handleNewChatRoomCreate}
          />
        </Modal>
      )}
      <RoomList
        onClickListItem={loadChatRoom}
        onClickNewChatRoom={handleNewChatRoomDialogToggle}
        rooms={chatRoomListMin || []}
        selectedRoomId={chatRoomID || ""}
      />
      <ChatArea chatRoomID={chatRoomID} />
    </div>
  );
};
