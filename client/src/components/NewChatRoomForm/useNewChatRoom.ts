import { useInput } from "pages/Login/useInput";
import { useCallback, useEffect, useMemo, useState } from "react";
import { SelectType } from "./Select/Select";
import { useSelect } from "./Select/useSelect";

export const useNewChatRoom = (users: SelectType) => {
  const [members, setMembers] = useState<string[]>([]);

  const [currentMember, handleMemberChange] = useSelect("");
  const [currentRoom, handleRoomChange] = useSelect("dm");
  const [roomName, handleRoomNameChange] = useInput("");

  useEffect(() => {
    setMembers((members) => {
      const isMemberThere =
        currentMember === "" || members.includes(currentMember);
      return isMemberThere ? members : [...members, currentMember];
    });
  }, [currentMember]);

  const removeMember = useCallback((id: string) => {
    setMembers((m) => m.filter((el) => el !== id));
  }, []);

  const memberNames = useMemo<string[]>(
    () => members.map((id) => users[id]),
    [members, users]
  );

  const rooms: SelectType = { dm: "Direct Message", channel: "Channel" };

  return {
    currentMember,
    members,
    currentRoom,
    rooms,
    roomName,
    handleRoomNameChange,
    removeMember,
    memberNames,
    handleMemberChange,
    handleRoomChange,
  };
};
