import React, { useState, ChangeEvent, FormEvent } from "react";

import { Button } from "../../../../components/Button/Button";

import "./chat-compose.css";

type ChatComposeProps = {
  onMessageSend: (text: string) => void;
  disabled: boolean;
};

export const ChatCompose = (props: ChatComposeProps) => {
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
          className="chat-compose-form-input"
          rows={3}
          placeholder="Message..."
          value={text}
          onChange={handleTextChange}
        ></textarea>
        <Button type="submit" text="Send" disabled={props.disabled} />
      </form>
    </div>
  );
};
