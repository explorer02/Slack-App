import React from "react";

import { Searchbar } from "./Searchbar/Searchbar";
import { FaUserCircle } from "react-icons/fa";

import "./header.css";

type HeaderProps = { userName: string };

export const Header = (props: HeaderProps) => {
  return (
    <div className="header">
      <div className="header-home">
        <div className="header-logo"></div>
        <p className="header-home-title">Slack</p>
      </div>
      <Searchbar />
      <div className="header-profile">
        <FaUserCircle />
        <p>{props.userName}</p>
      </div>
    </div>
  );
};
