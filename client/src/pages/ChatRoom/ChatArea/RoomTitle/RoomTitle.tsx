import React from "react";
import "./room-title.css";
type RoomTitleProps = {
  roomName: string;
  roomImage?: string;
};
const RoomTitle = (props: RoomTitleProps) => {
  return (
    <div className="room-title">
      <img
        src={
          props.roomImage ||
          "https://static.vecteezy.com/system/resources/previews/000/439/863/non_2x/vector-users-icon.jpg"
        }
        alt="user"
      />
      {props.roomName}
    </div>
  );
};

export default RoomTitle;
