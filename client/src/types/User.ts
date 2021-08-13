export type CurrentUser =
  | {
      id: string;
      name: string;
      profilePicture: string;
      chatRooms: string[];
    }
  | undefined;

export type User = {
  id: string;
  name: string;
  profilePicture: string;
};

// type UserMax = {
//   id: string;
//   name: string;
//   phone: string;
//   email: string;
//   chatRooms: string[];
//   lastOnline: number;
//   profilePicture: string;
// };
