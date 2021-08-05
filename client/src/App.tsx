import "./App.css";
import "./global.css";
import { Header } from "./components/Header/Header";
import { Login } from "./pages/Login/Login";
import { useState } from "react";
import { useCallback } from "react";
import { User } from "./types/User";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => Boolean(localStorage.getItem("loginToken")) || false
  );
  const [user, setUser] = useState<User>(undefined);
  const handleLoginComplete = useCallback((user: User) => {
    setUser(user);
    setIsLoggedIn(true);
    localStorage.setItem("loginToken", "true");
  }, []);

  return (
    <div className="App">
      <Header username={user ? user.name : "Profile"} />
      {!isLoggedIn && <Login onLoginComplete={handleLoginComplete} />}
    </div>
  );
}

export default App;
