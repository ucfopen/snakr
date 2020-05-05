import React from "react";
// import Content from "./Content";
import Dashboard from "./Dashboard";
import Header from "./Header";
// import Welcome from "./Welcome";
// import UserContext from "./UserContext";
import Admin from "./Admin";
import Profile from "./Profile";
import Additem from "./Additem";

function View(props) {
  // const userData = useContext(UserContext);
  let view;
  if (props.admin) {
    view = <Admin />;
  } else if (props.profile) {
    view = <Profile />;
  } else if (props.add) {
    view = <Additem />;
  } else {
    view = <Dashboard />;
  }

  return (
    <div className="grid-container">
      <Header />
      <div className="content">{view}</div>
    </div>
  );
}

export default View;
