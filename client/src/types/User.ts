export type User =
  | {
      id: string;
      name: string;
      phone: string;
      email: string;
      lastOnline: number;
      chatRooms?: string[];
    }
  | undefined;
