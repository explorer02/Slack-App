import React, { useState, useCallback, useContext } from "react";

import { RoomList } from "./RoomList/RoomList";
import { ChatArea } from "./ChatArea/ChatArea";

import { Message } from "../../types/Message";
import { ChatRoomMin } from "../../types/ChatRoom";

import "./chat-room.css";
import { getMultipleChatRooms } from "../../server/chatRoom";
import { CHATROOM_MIN_ATTRIBUTES } from "../../attributes";
import { useQuery } from "../../hooks/useQuery";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

// const chatRoomListMin: ChatRoomMin[] = [
//   { id: "sam_malcolm", name: "Sam", type: "duel" },
//   { id: "john_malcolm", name: "John", type: "duel" },
//   { id: "jack_malcolm", name: "Jack", type: "duel" },
//   { id: "channel1", name: "Book Club", type: "channel" },
//   { id: "channel2", name: "ProGamer", type: "channel" },
// ];
// const members: User[] = [
//   {
//     id: "sam",
//     name: "Sam",
//     profilePicture: DEFAULT_AVATAR,
//   },
//   {
//     id: "john",
//     name: "John",
//     profilePicture: DEFAULT_AVATAR,
//   },
//   {
//     id: "jack",
//     name: "Jack",
//     profilePicture: DEFAULT_AVATAR,
//   },
//   {
//     id: "malcolm",
//     name: "Malcolm",
//     profilePicture: DEFAULT_AVATAR,
//   },
// ];

// const messageList: Message[] = [
//   {
//     id: "m123",
//     timestamp: 1628166241194,
//     text: "Hello Sam",
//     sender_id: "malcolm",
//   },
//   {
//     id: "m124",
//     timestamp: 1628166341194,
//     text: "Hello Malcolm",
//     sender_id: "sam",
//   },
//   {
//     id: "m125",
//     timestamp: 1628166441194,
//     text: "Sup?",
//     sender_id: "malcolm",
//   },
//   {
//     id: "m126",
//     timestamp: 1628166541194,
//     text: "Sky's Up. See ya!",
//     sender_id: "sam",
//   },
// ];
// const chatRoomListMax: ChatRoomMax[] = [
//   {
//     id: "sam_malcolm",
//     name: "Sam",
//     messages: messageList,
//     type: "duel",
//     members: [members[0], members[3]],
//     roomImage: DEFAULT_AVATAR,
//   },
//   {
//     id: "john_malcolm",
//     name: "John",
//     messages: [],
//     type: "duel",
//     members: [members[1], members[3]],
//     roomImage: DEFAULT_AVATAR,
//   },
//   {
//     id: "jack_malcolm",
//     name: "Jack",
//     messages: [],
//     type: "duel",
//     members: [members[2], members[3]],
//     roomImage: DEFAULT_AVATAR,
//   },

//   {
//     id: "channel1",
//     name: "Book Club",
//     messages: [],
//     type: "channel",
//     members: [members[0], members[2], members[3]],
//     roomImage: DEFAULT_AVATAR,
//   },

//   {
//     id: "channel2",
//     name: "ProGamer",
//     messages: [],
//     type: "channel",
//     members: [members[0], members[1], members[3]],
//     roomImage: DEFAULT_AVATAR,
//   },
// ];

export const ChatRoom = () => {
  const [chatRoomID, setChatRoomID] = useState<string | undefined>();
  const currentUser = useContext(CurrentUserContext);

  const fetchChatRoomsMin = useCallback(
    () => getMultipleChatRooms(currentUser?.chatRooms, CHATROOM_MIN_ATTRIBUTES),
    [currentUser]
  );

  const chatRoomListMinQuery = useQuery(fetchChatRoomsMin);
  const chatRoomListMin: ChatRoomMin[] = chatRoomListMinQuery.data;

  const loadChatRoom = (id: string) => {
    setChatRoomID(id);
  };

  const handleMessageSend = useCallback((text: string) => {
    const newMsg: Message = {
      id: Date.now() + "",
      timestamp: Date.now(),
      text,
      sender_id: "malcolm",
    };
    // setChatRoom((c) => ({ ...c, messages: [...c.messages, newMsg] }));
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
  // if (chatRoomListMinQuery.status === "success") return <p>Sucess!!</p>;
  return (
    <div className="chat-room">
      <RoomList
        onClickListItem={loadChatRoom}
        rooms={chatRoomListMin}
        selectedRoomId={chatRoomID || ""}
      />
      <ChatArea
        // chatRoom={chatRoom}
        chatRoomID={chatRoomID}
        onMessageSend={handleMessageSend}
      />
    </div>
  );
};
