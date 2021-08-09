import { DEFAULT_AVATAR } from "../constants";

const users = [
  {
    id: "sam",
    password: "1234",
    name: "Sam",
    phone: "+1 1234",
    email: "sam@abc.com",
    chatRooms: ["sam_malcolm", "channel1", "channel2"],
    profilePicture: DEFAULT_AVATAR,
  },
  {
    id: "john",
    password: "1234",
    name: "John",
    phone: "+1 1234",
    email: "john@abc.com",
    chatRooms: ["john_malcolm", "channel2"],
    profilePicture: DEFAULT_AVATAR,
  },
  {
    id: "jack",
    password: "1234",
    name: "Jack",
    phone: "+1 1234",
    email: "jack@abc.com",
    chatRooms: ["jack_malcolm", "channel1"],
    profilePicture: DEFAULT_AVATAR,
  },
  {
    id: "malcolm",
    password: "12345678",
    name: "malcolm",
    phone: "+1 1234",
    email: "malcolm@abc.com",
    chatRooms: [
      "sam_malcolm",
      "john_malcolm",
      "jack_malcolm",
      "channel1",
      "channel2",
    ],
    profilePicture: DEFAULT_AVATAR,
  },
];

const messageList = [
  {
    id: "m123",
    timestamp: 1628166241194,
    text: "Hello Sam",
    sender_id: "malcolm",
  },
  {
    id: "m124",
    timestamp: 1628166341194,
    text: "Hello Malcolm",
    sender_id: "sam",
  },
  {
    id: "m125",
    timestamp: 1628166441194,
    text: "Sup?",
    sender_id: "malcolm",
  },
  {
    id: "m126",
    timestamp: 1628166541194,
    text: "Sky's Up. See ya!",
    sender_id: "sam",
  },
];
const chatRooms = [
  {
    id: "sam_malcolm",
    name: "Sam",
    messages: messageList,
    type: "duel",
    members: ["sam", "malcolm"],
    roomImage: DEFAULT_AVATAR,
  },
  {
    id: "john_malcolm",
    name: "John",
    messages: [],
    type: "duel",
    members: ["john", "malcolm"],
    roomImage: DEFAULT_AVATAR,
  },
  {
    id: "jack_malcolm",
    name: "Jack",
    messages: [],
    type: "duel",
    members: ["jack", "malcolm"],
    roomImage: DEFAULT_AVATAR,
  },

  {
    id: "channel1",
    name: "Book Club",
    messages: [],
    type: "channel",
    members: ["sam", "jack", "malcolm"],
    roomImage: DEFAULT_AVATAR,
  },
  {
    id: "channel2",
    name: "ProGamer",
    messages: [],
    type: "channel",
    members: ["sam", "john", "malcolm"],
    roomImage: DEFAULT_AVATAR,
  },
];

export const populate = () => {
  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("chat_rooms", JSON.stringify(chatRooms));
};
