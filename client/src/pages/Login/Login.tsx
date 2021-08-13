import React, { FormEvent, useCallback, useEffect, useState } from "react";

import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoLanguageSharp } from "react-icons/io5";
import { useInput } from "../../hooks/useInput";
import "./login.css";
import { Input } from "../../components/Input/Input";
import { ajaxClient } from "ajaxClient";
import { useMutation } from "hooks/useMutation";
import { Button } from "components/Button/Button";
import { delayTask } from "utils";

type LoginProps = {
  onAuthComplete: (id: string) => void;
};

const options = {
  signup: {
    title: "Sign Up",
    url: "/users",
    submitButton: "Sign up",
    switchButton: "Already have an account? Login",
    loadingMessage: "Creating new account...",
    successMessage: "Your account is created...",
  },
  login: {
    title: "Login",
    url: "/auth/login",
    submitButton: "Log in",
    switchButton: "Create New Account",
    loadingMessage: "Validating credentials...",
    successMessage: "Login validated...",
  },
};

export const Login = (props: LoginProps) => {
  const [id, handleIDChange] = useInput("");
  const [password, handlePasswordChange] = useInput("");
  const [name, handleNameChange] = useInput("");
  const [mode, setMode] = useState<"login" | "signup">("login");

  const switchMode = () => setMode((m) => (m === "login" ? "signup" : "login"));

  const validateAuth = useCallback(
    (id, password, name) => {
      let data = {};
      data = { id, password };
      if (mode === "signup") data = { user: { id, password, name } };
      return ajaxClient.post(options[mode].url, data);
    },
    [mode]
  );

  const mutation = useMutation<boolean>(validateAuth);

  let status = "";
  if (mutation.status === "loading") status = options[mode].loadingMessage;
  else if (mutation.status === "error") {
    status = mutation.error?.message || "Some error occured...";
  } else if (mutation.status === "success")
    status = options[mode].successMessage;

  const { onAuthComplete } = props;
  useEffect(() => {
    if (mutation.status === "success") {
      delayTask(() => onAuthComplete(id), 0.3);
    }
  }, [mutation.status, id, onAuthComplete]);

  const handleLogin = (ev: FormEvent) => {
    ev.preventDefault();
    mutation.mutate(id, password, name);
  };

  return (
    <div className="login-container">
      <div className="login-title">{options[mode].title}</div>
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
        {mode === "signup" && (
          <Input
            type="text"
            placeholder="your name..."
            Icon={<IoLanguageSharp />}
            value={name}
            onChange={handleNameChange}
            minLength={3}
          />
        )}
        <Button text={options[mode].submitButton} type="submit" />
        <p className="login-status">{status}</p>
        <Button
          text={options[mode].switchButton}
          type="button"
          onClick={switchMode}
        />
      </form>
    </div>
  );
};
