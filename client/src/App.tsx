import React, { useState, useCallback } from "react";

import { Header } from "./components/Header/Header";
import { Login } from "./pages/Login/Login";
import { ChatRoom } from "./pages/ChatRoom/ChatRoom";

import { CurrentUser } from "./types/User";

import "./App.css";
import "./global.css";

function App() {
  const [user, setUser] = useState<CurrentUser>(undefined);
  const handleLoginComplete = useCallback((user: CurrentUser) => {
    setUser(user);
    localStorage.setItem("loginToken", "true");
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
