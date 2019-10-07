import React from "react";
import Dashboard from "./Dashboard";
// import Welcome from "./Welcome";
// import UserContext from "./UserContext";
import Admin from "./Admin";
import Additem from "./Additem";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function Content() {

  // useEffect(() => {
  //     console.log(userData);
  // })

  return (
      <Router>
          <Switch>
            <Route path="/" exact component={Dashboard} />
            <Route path="/admin" exact component={Admin} />
            <Route path="/add" exact component={Additem} />
          </Switch>
      </Router>
  );
}

export default Content;
