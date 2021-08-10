import React, { MouseEvent, useCallback, useState } from "react";

import { ChatRoomMin } from "../../../../types/ChatRoom";

import "./room-sub-list.css";

type RoomSubListProps = {
  title: string;
  roomEntries: ChatRoomMin[];
  onClickListItem: (id: string) => void;
  selectedRoomId: string;
};

const downArrow = "▼";
const rightArrow = "►";

export const RoomSubList = (props: RoomSubListProps) => {
  const [showList, setShowList] = useState(true);

  const handleToggleList = useCallback(() => setShowList((c) => !c), []);

  const handleClick = (ev: MouseEvent<HTMLLIElement>) => {
    if (ev?.currentTarget?.dataset?.id !== undefined)
      props.onClickListItem(ev.currentTarget.dataset.id);
  };
  return (
    <div className="room-sub-list-container">
      <p className="room-sub-list-title" onClick={handleToggleList}>
        <button className="room-sub-list-expand">
          {showList ? downArrow : rightArrow}
        </button>
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
                "room-sub-list-item " +
                (props.selectedRoomId === entry.id
                  ? "room-sub-list-item-selected"
                  : "")
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
