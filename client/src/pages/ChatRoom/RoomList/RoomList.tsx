import React, { useMemo } from "react";

import { RoomSubList } from "./RoomSubList/RoomSubList";

import "./room-list.css";
import { ChatRoomMin } from "types/ChatRoom";
import { Button } from "components/Button/Button";

type RoomListProps = {
  onClickListItem: (id: string) => void;
  onClickNewChatRoom: () => void;
  rooms: ChatRoomMin[];
  selectedRoomId: string;
};

export const RoomList = (props: RoomListProps): JSX.Element => {
  const dms = useMemo(
    () => props.rooms.filter((room) => room.type === "dm"),
    [props.rooms]
  );
  const channels = useMemo(
    () => props.rooms.filter((room) => room.type === "channel"),
    [props.rooms]
  );

  return (
    <div className="room-list">
      <Button
        onClick={props.onClickNewChatRoom}
        type="button"
        text="New Chat"
      />

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

RoomList.defaultProps = {
  rooms: [],
  onClickListItem: (id: string) => {},
  onClickNewChatRoom: () => {},
  selectedRoomId: "",
};
