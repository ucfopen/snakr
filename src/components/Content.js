import React from "react";
// import Dashboard from "./Dashboard";
// import Welcome from "./Welcome";
// import UserContext from "./UserContext";
// import Admin from "./Admin";
// import Additem from "./Additem";
import View from "./View";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function Content() {

  // useEffect(() => {
  //     console.log(userData);
  // })

  return (
      <Router>
          <Switch>
            <Route path="/" exact render={(props) => <View {...props} />}/>
            <Route path="/profile" exact render={(props) => <View {...props} profile={true}/>}/>
            <Route path="/admin" exact render={(props) => <View {...props} admin={true}/>}/>
            <Route path="/add" exact render={(props) => <View {...props} add={true}/>}/>
          </Switch>
      </Router>
  );
}

export default Content;
