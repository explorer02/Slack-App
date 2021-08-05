import React, { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { GrLogin } from "react-icons/gr";
import { AiOutlineMail } from "react-icons/ai";
import { StyledInput } from "./StyledInput/StyledInput";
import { RiLockPasswordFill } from "react-icons/ri";
import "./login.css";
import StyledButton from "./StyledButton/StyledButton";
import { User } from "../../types/User";

type LoginProps = {
  onLoginComplete: (u: User) => void;
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
      name: "Sam",
      id: "sam",
      phone: "+1 12341234",
      email: "sam@abc.com",
      lastOnline: 0,
    });
  };
  return (
    <div className="login-container">
      <div className="login-title">
        Log in <GrLogin />
      </div>
      <form className="login-form" onSubmit={handleLogin}>
        <StyledInput
          type="text"
          placeholder="user id"
          Icon={<AiOutlineMail />}
          value={id}
          onChange={handleIDChange}
          minLength={3}
        />
        <StyledInput
          type="password"
          placeholder="password"
          Icon={<RiLockPasswordFill />}
          value={password}
          onChange={handlePasswordChange}
          minLength={3}
        />
        <StyledButton text="Log in" type="submit" />
        <p className="login-error">{loginError}</p>
        <StyledButton text="Create New Acount" type="button" />
      </form>
    </div>
  );
};

function useInput(
  initValue: string
): [string, (ev: ChangeEvent<HTMLInputElement>) => void] {
  const [state, setState] = useState(initValue);
  const onChange = useCallback((ev: ChangeEvent<HTMLInputElement>) => {
    setState(ev.target.value);
  }, []);
  return [state, onChange];
}
