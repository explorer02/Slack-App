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
  lastOnline: number;
  chat_rooms: string[];
};

type ChatRoom = {
  id: string;
  members: string[];
  messages: Message[];
};
