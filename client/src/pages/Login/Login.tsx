import React, { FormEvent, useState } from "react";
import { validateLogin } from "../../server/auth";

import { GrLogin } from "react-icons/gr";
import { AiOutlineMail } from "react-icons/ai";
import { Input } from "./Input/Input";
import { RiLockPasswordFill } from "react-icons/ri";
import { Button } from "../../components/Button/Button";

import { useInput } from "./useInput";
import { useMutation } from "../../hooks/useMutation";

import "./login.css";

type LoginProps = {
  onLoginComplete: () => void;
};

export const Login = (props: LoginProps) => {
  const [id, handleIDChange] = useInput("");
  const [password, handlePasswordChange] = useInput("");
  const [loginStatus, setLoginStatus] = useState<string>("");
  const [loginCalled, setLoginCalled] = useState(true);

  const mutation = useMutation(validateLogin);

  console.log(mutation);
  if (!loginCalled && mutation.data === true) {
    setLoginStatus("Credentials Verified...");
    props.onLoginComplete();
    setLoginCalled(true);
  } else if (!loginCalled && mutation.data === false) {
    setLoginStatus("Error logging in...");
    setLoginCalled(true);
  }

  // if (mutation.status === "success" && mutation.data === true) {
  //   setLoginStatus("Credentials Verified...");
  //   mutation.reset();
  //   props.onLoginComplete();
  // } else if (mutation.error !== undefined || mutation.data === false) {
  //   mutation.reset();
  //   setLoginStatus("Error logging in...");
  // }

  const handleLogin = (ev: FormEvent) => {
    ev.preventDefault();
    setLoginStatus("Verifying Credentials...");
    mutation.mutate(id, password);
    setLoginCalled(false);
    // setLoginStatus("Please wait...");
    // validateLogin(id, password).then((res) => {
    //   if (res) {
    //     setLoginStatus("Login verified...");
    //     setTimeout(() => props.onLoginComplete(), 300);
    //   } else {
    //     setLoginStatus("Login error...");
    //   }
    // });
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
