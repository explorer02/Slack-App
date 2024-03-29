import React from "react";

import { RoomSubList } from "./RoomSubList/RoomSubList";

import { ChatRoomMin } from "../../../types/ChatRoom";

import "./room-list.css";

type RoomListProps = {
  onClickListItem: (id: string) => void;
  rooms: ChatRoomMin[];
  selectedRoomId: string;
};

export const RoomList = (props: RoomListProps) => {
  const dms = props.rooms.filter((room) => room.type === "dm");
  const channels = props.rooms.filter((room) => room.type === "channel");

  return (
    <div className="room-list">
      <RoomSubList
        roomEntries={channels}
        title="Channels"
        onClickListItem={props.onClickListItem}
        selectedRoomId={props.selectedRoomId}
      />
      <RoomSubList
        roomEntries={dms}
        title="Direct Messages"
        onClickListItem={props.onClickListItem}
        selectedRoomId={props.selectedRoomId}
      />
    </div>
  );
};
