import React, { useContext } from "react";
import Content from "./Content";
// import Dashboard from "./Dashboard";
// import Header from './Header';
import Welcome from "./Welcome";
import UserContext from "./UserContext";

function Main() {
  const userData = useContext(UserContext);

  return (
    <div className="main">{userData.authUser ? <Content /> : <Welcome />}</div>
  );
}

export default Main;
