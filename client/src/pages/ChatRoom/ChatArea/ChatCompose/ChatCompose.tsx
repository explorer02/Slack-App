import React, { useState } from "react";
import { ChangeEvent } from "react";
import { FormEvent } from "react";
import StyledButton from "../../../Login/StyledButton/StyledButton";
import "./chat-compose.css";

type ChatComposeProps = {
  onMessageSend: (text: string) => void;
};

const ChatCompose = (props: ChatComposeProps) => {
  const [text, setText] = useState("");
  const handleTextChange = (ev: ChangeEvent<HTMLTextAreaElement>) =>
    setText(ev.target.value);
  const handleSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    if (text.length > 0) {
      props.onMessageSend(text);
      setText("");
    }
  };
  return (
    <div className="chat-compose">
      <form className="chat-compose-form" onSubmit={handleSubmit}>
        <textarea
          rows={3}
          placeholder="Message..."
          value={text}
          onChange={handleTextChange}
        ></textarea>
        <StyledButton type="submit" text="Send" />
      </form>
    </div>
  );
};

export default ChatCompose;
