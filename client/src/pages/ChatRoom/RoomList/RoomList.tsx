import React from "react";
import "./room-list.css";
import RoomSubList from "./RoomSubList/RoomSubList";
import { Room } from "./RoomType";

type RoomListProps = {
  onClickListItem: (id: string) => void;
  dms: Room[];
  channels: Room[];
};
export const RoomList = (props: RoomListProps) => {
  return (
    <div className="room-list">
      <RoomSubList
        roomEntries={props.channels}
        title="Channels"
        onClickListItem={props.onClickListItem}
      />
      <RoomSubList
        roomEntries={props.dms}
        title="Direct Messages"
        onClickListItem={props.onClickListItem}
      />
    </div>
  );
};
