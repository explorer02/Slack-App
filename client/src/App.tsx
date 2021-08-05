import "./App.css";
import "./global.css";
import { Header } from "./components/Header/Header";
import { Login } from "./pages/Login/Login";
import { useState } from "react";
import { useCallback } from "react";
import { UserType } from "./types/UserType";
import { ChatRoom } from "./pages/ChatRoom/ChatRoom";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => Boolean(localStorage.getItem("loginToken")) || false
  );
  const [user, setUser] = useState<UserType>(undefined);
  const handleLoginComplete = useCallback((user: UserType) => {
    setUser(user);
    setIsLoggedIn(true);
    localStorage.setItem("loginToken", "true");
  }, []);

  return (
    <div className="App">
      <Header username={user?.name || "Profile"} />
      {!isLoggedIn ? (
        <Login onLoginComplete={handleLoginComplete} />
      ) : (
        <ChatRoom />
      )}
    </div>
  );
}

export default App;
