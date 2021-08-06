import React, { useState, useCallback } from "react";

import { Header } from "./components/Header/Header";
import { Login } from "./pages/Login/Login";
import { ChatRoom } from "./pages/ChatRoom/ChatRoom";

import { CurrentUser } from "./types/User";

import "./App.css";
import "./global.css";
import { DEFAULT_AVATAR } from "./constants";

function App() {
  const [user, setUser] = useState<CurrentUser>(undefined);
  const handleLoginComplete = useCallback(() => {
    setUser({
      profilePicture: DEFAULT_AVATAR,
      chatRooms: [],
      name: "Malcolm",
      id: "malcolm",
    });
  }, []);

  let userName = "Profile";
  let page = <Login onLoginComplete={handleLoginComplete} />;

  if (user !== undefined) {
    userName = user.name;
    page = <ChatRoom />;
  }

  return (
    <div className="App">
      <Header userName={userName} />
      {page}
    </div>
  );
}

export default App;
