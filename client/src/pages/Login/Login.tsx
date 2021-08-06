import React, { FormEvent, useState } from "react";

import { GrLogin } from "react-icons/gr";
import { AiOutlineMail } from "react-icons/ai";
import { Input } from "./Input/Input";
import { RiLockPasswordFill } from "react-icons/ri";
import { Button } from "../../components/Button/Button";

import { useInput } from "./useInput";

import { DEFAULT_AVATAR } from "../../constants";

import { CurrentUser } from "../../types/User";

import "./login.css";

type LoginProps = {
  onLoginComplete: (u: CurrentUser) => void;
};

export const Login = (props: LoginProps) => {
  const [id, handleIDChange] = useInput("");
  const [password, handlePasswordChange] = useInput("");
  const [loginError, setLoginError] = useState<string>("");

  const handleLogin = (ev: FormEvent) => {
    ev.preventDefault();
    if (password !== "1234") {
      setLoginError("Error Logging in!!");
      return;
    }

    props.onLoginComplete({
      profilePicture: DEFAULT_AVATAR,

      chatRooms: [],
      name: "Malcolm",
      id: "malcolm",
    });
  };

  return (
    <div className="login-container">
      <div className="login-title">
        Log in <GrLogin />
      </div>
      <form className="login-form" onSubmit={handleLogin}>
        <Input
          type="text"
          placeholder="user id"
          Icon={<AiOutlineMail />}
          value={id}
          onChange={handleIDChange}
          minLength={3}
        />
        <Input
          type="password"
          placeholder="password"
          Icon={<RiLockPasswordFill />}
          value={password}
          onChange={handlePasswordChange}
          minLength={3}
        />
        <Button text="Log in" type="submit" />
        <p className="login-error">{loginError}</p>
        <Button text="Create New Acount" type="button" />
      </form>
    </div>
  );
};
