import "./App.css";
import "./global.css";
import { Header } from "./components/Header/Header";
import { Login } from "./pages/Login/Login";
import { useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => Boolean(localStorage.getItem("loginToken")) || false
  );
  const [user, setUser] = useState({});
  const handleLogin = (user: object) => {
    setUser(user);
    setIsLoggedIn(true);
    localStorage.setItem("loginToken", "true");
  };
  console.log(isLoggedIn);

  return (
    <div className="App">
      <Header user={isLoggedIn ? "Ajay" : "Profile"} />
      {!isLoggedIn && <Login onLogin={handleLogin} />}
    </div>
  );
}

export default App;
