import React from "react";
import { GrLogin } from "react-icons/gr";
import { AiOutlineMail } from "react-icons/ai";
import { StyledInput } from "./StyledInput/StyledInput";
import { RiLockPasswordFill } from "react-icons/ri";
import "./login.css";
import StyledButton from "./StyledButton/StyledButton";

export const Login = ({ onLogin }: { onLogin: (user: object) => void }) => {
  const handleLogin = (ev: MouseEvent) => {
    ev.preventDefault();
    onLogin({ name: "Ajay" });
  };
  return (
    <div className="login-container">
      <div className="login-title">
        Log in <GrLogin />
      </div>
      <form className="login-form">
        <StyledInput
          type="email"
          placeholder="user id"
          Icon={<AiOutlineMail />}
        />
        <StyledInput
          type="password"
          placeholder="password"
          Icon={<RiLockPasswordFill />}
        />
        <StyledButton text="Log in" onClick={handleLogin} />
        <p className="login-error">Error Logging in!</p>
        <StyledButton text="Create New Acount" onClick={() => {}} />
      </form>
    </div>
  );
};
