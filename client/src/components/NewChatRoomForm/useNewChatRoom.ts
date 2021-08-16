import { useInput } from "hooks/useInput";
import { useCallback, useEffect, useMemo, useState } from "react";
import { SelectType } from "./Select/Select";

const rooms: SelectType = { dm: "Direct Message", channel: "Channel" };

export const useNewChatRoom = (users: SelectType) => {
  const [members, setMembers] = useState<string[]>([]);

  const [currentMember, handleMemberChange] = useInput("");
  const [currentRoom, handleRoomChange] = useInput("dm");
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
