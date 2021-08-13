import React, { FormEvent, useCallback } from "react";

import { GrLogin } from "react-icons/gr";
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordFill } from "react-icons/ri";
import { useInput } from "./useInput";
import "./login.css";
import { Input } from "./Input/Input";
import { ajaxClient } from "ajaxClient";
import { useMutation } from "hooks/useMutation";
import { Button } from "components/Button/Button";

type LoginProps = {
  onLoginComplete: (id: string) => void;
};

export const Login = (props: LoginProps) => {
  const [id, handleIDChange] = useInput("");
  const [password, handlePasswordChange] = useInput("");

  const validateLogin = useCallback(
    () => ajaxClient.post("/auth/login", { id, password }),
    [id, password]
  );

  const mutation = useMutation<boolean>(validateLogin);

  let loginStatus = "";
  if (mutation.status === "loading") loginStatus = "Verifying credentials...";
  else if (mutation.status === "error") {
    loginStatus = mutation.error?.message || "Some error occured...";
  } else if (mutation.status === "success") {
    loginStatus = "Login validated...";
    setTimeout(() => {
      props.onLoginComplete(id);
    }, 300);
  }

  const handleLogin = (ev: FormEvent) => {
    ev.preventDefault();
    mutation.mutate(id, password);
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
        <p className="login-status">{loginStatus}</p>
        <Button text="Create New Acount" type="button" />
      </form>
    </div>
  );
};
