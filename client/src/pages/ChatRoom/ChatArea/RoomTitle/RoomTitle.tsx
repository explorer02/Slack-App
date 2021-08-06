import React from "react";

import "./room-title.css";

type RoomTitleProps = {
  roomName: string;
  roomImage: string;
};

export const RoomTitle = (props: RoomTitleProps) => {
  return (
    <div className="room-title">
      <img src={props.roomImage} alt="user" className="room-title-room-image" />
      {props.roomName}
    </div>
  );
};
