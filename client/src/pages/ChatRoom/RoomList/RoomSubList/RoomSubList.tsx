import React, { MouseEvent, useState } from "react";
import { Room } from "../RoomType";
import "./room-sub-list.css";

type RoomSubListProps = {
  title: string;
  roomEntries: Room[];
  onClickListItem: (id: string) => void;
  selectedRoomId: string;
};

const downArrow = "▼";
const rightArrow = "►";

const RoomSubList = (props: RoomSubListProps) => {
  const [showList, setShowList] = useState(true);
  const handleToggleList = () => setShowList((c) => !c);
  const handleClick = (ev: MouseEvent<HTMLLIElement>) => {
    console.log(ev.currentTarget.dataset.id);
    if (ev?.currentTarget?.dataset?.id !== undefined)
      props.onClickListItem(ev.currentTarget.dataset.id);
  };
  return (
    <div className="room-sub-list-container">
      <p className="room-sub-list-title" onClick={handleToggleList}>
        <button>{showList ? downArrow : rightArrow}</button>
        {props.title}
      </p>
      {showList && (
        <ul>
          {props.roomEntries.map((entry) => (
            <li
              onClick={handleClick}
              data-id={entry.id}
              key={entry.id}
              className={
                props.selectedRoomId === entry.id
                  ? "room-sub-list-selected"
                  : ""
              }
            >
              {entry.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RoomSubList;
