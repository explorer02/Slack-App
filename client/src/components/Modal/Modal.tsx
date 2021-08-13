import React from "react";
import ReactDOM from "react-dom";

import "./modal.css";

type ModalProps = {
  children: JSX.Element;
};

export const Modal = (props: ModalProps) => {
  let portalRoot = document.querySelector("#portal-root");
  if (portalRoot === null) {
    portalRoot = document.createElement("div");
    portalRoot.setAttribute("id", "portal-root");
    document.body.append(portalRoot);
  }

  return ReactDOM.createPortal(
    <div className="backdrop">
      <div className="modal">{props.children}</div>
    </div>,
    portalRoot
  );
};
