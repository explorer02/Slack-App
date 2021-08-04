import React from "react";
import "./header.css";
import Searchbar from "./Searchbar/Searchbar";
import { FaUserCircle } from "react-icons/fa";

export const Header = () => {
  return (
    <div className="header">
      <div className="header-home">
        <div className="header-logo"></div>
        <p>Slack</p>
      </div>
      <Searchbar />
      <div className="header-profile">
        <FaUserCircle />
        <p>Ajay</p>
      </div>
    </div>
  );
};
