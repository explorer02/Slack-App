import React from "react";
import "./room-list.css";
import RoomSubList from "./RoomSubList/RoomSubList";
import { Room } from "./RoomType";

type RoomListProps = {
  onClickListItem: (id: string) => void;
  rooms: Room[];
  selectedRoomId: string;
};
export const RoomList = (props: RoomListProps) => {
  const dms = props.rooms.filter((room) => room.type === "duel");
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
