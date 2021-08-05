export type UserType =
  | {
      id: string;
      name: string;
      phone?: string;
      email?: string;
      lastOnline?: number;
      chatRooms?: string[];
      profilePicture?: string;
    }
  | undefined;
