import React, { useState, useCallback } from "react";

import { Header } from "./components/Header/Header";
import { Login } from "./pages/Login/Login";
import { ChatRoom } from "./pages/ChatRoom/ChatRoom";

import { CurrentUser } from "./types/User";

import "./App.css";
import "./global.css";
import { useQuery } from "./hooks/useQuery";
import { getUser } from "./server/users";
import { CURRENT_USER_ATTRIBUTES } from "./attributes";
import { CurrentUserContext } from "./contexts/CurrentUserContext";

function App() {
  const [uid, setUid] = useState<string | undefined>(undefined);
  const [enabled, setEnabled] = useState<boolean>(false);

  const fetchUser = useCallback(
    () => getUser(uid, CURRENT_USER_ATTRIBUTES),
    [uid]
  );

  const userQuery = useQuery(fetchUser, { enabled });
  const user: CurrentUser = userQuery.data;

  const handleLoginComplete = useCallback((id: string) => {
    setUid(id);
    setEnabled(true);
  }, []);

  let userName = "Profile";
  let page = <Login onLoginComplete={handleLoginComplete} />;

  if (user !== undefined) {
    userName = user.name;
    page = <ChatRoom />;
  }

  return (
    <CurrentUserContext.Provider value={user}>
      <div className="App">
        <Header userName={userName} />
        {page}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
