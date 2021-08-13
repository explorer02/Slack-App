import React, { useState, useCallback } from "react";

import { Header } from "./components/Header/Header";
import { Login } from "./pages/Login/Login";
import { ChatRoom } from "./pages/ChatRoom/ChatRoom";

import "./App.css";
import "./global.css";
import { useQuery } from "./hooks/useQuery";
import { CurrentUserContext } from "./contexts/CurrentUserContext";

import { User } from "types/User";
import { USER_ATTRIBUTES } from "attributes";

function App() {
  const [uid, setUid] = useState<string | undefined>(undefined);

  const userQuery = useQuery<User>(
    `/users/${uid}?fields=${USER_ATTRIBUTES.join(",")}`,
    {
      enabled: uid !== undefined,
    }
  );
  const user = userQuery.data;

  const handleLoginComplete = useCallback((id: string) => {
    setUid(id);
  }, []);

  let page = <Login onLoginComplete={handleLoginComplete} />;

  if (user !== undefined) {
    page = <ChatRoom />;
  }

  return (
    <CurrentUserContext.Provider value={user}>
      <div className="App">
        <Header userName={user?.name} />
        {page}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
