import React, { useState, useCallback } from "react";

import { Header } from "./components/Header/Header";
import { Login } from "./pages/Login/Login";
import { ChatRoom } from "./pages/ChatRoom/ChatRoom";

import { CurrentUser } from "./types/User";

import "./App.css";
import "./global.css";
import { useQuery } from "./hooks/useQuery";
import { CURRENT_USER_ATTRIBUTES } from "./attributes";
import { CurrentUserContext } from "./contexts/CurrentUserContext";
import { ajaxClient } from "./ajaxClient";

function App() {
  const [uid, setUid] = useState<string | undefined>(undefined);
  const fetchUser = useCallback(
    () =>
      ajaxClient.get<CurrentUser>(
        `/users/${uid}?fields=${CURRENT_USER_ATTRIBUTES.join(",")}`
      ),
    [uid]
  );

  const userQuery = useQuery<CurrentUser>(fetchUser, {
    enabled: uid !== undefined,
  });
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
