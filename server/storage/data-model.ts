type Message = {
  id: string;
  timestamp: number;
  text: string;
  sender_id: string;
};

type User = {
  id: string;
  password: string;
  name: string;
  email: string;
  phone: string;
  profilePicture: string;
  lastOnline: number;
  chat_rooms: string[];
};

type ChatRoom = {
  id: string;
  name?: string;
  type: "duel" | "channel";
  members: string[];
  messages: Message[];
};
