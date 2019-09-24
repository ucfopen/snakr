import React, { useEffect, useContext, useState } from "react";
import "../App.css";
import Main from "./Main";
import Login from "./Login";
import Pantry from "./Pantry";
import Admin from "./Admin";
import Welcome from "./Welcome";
import Additem from "./Additem";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import UserContext from "./UserContext";
import { FirebaseContext } from "./Firebase";

function App() {
  const firebase = useContext(FirebaseContext);
  // const [user, setUser] = useState('');
  const [user, setUser] = useState({
    authUser: null,
    admin: false,
    bank: null
  });

  // useEffect(() => {
  //   console.log(user);
  // });

  //onAuthStateChanged provided by the firebase api creates a listener
  // that updates the authUser object based on any changes
  useEffect(
    () => {
      firebase.auth.onAuthStateChanged(authUser => {
          if(authUser && authUser !== user.authUser) {
              // console.log(authUser);
              setUser({ ...user, authUser: authUser });
          }
          if(!authUser && user.authUser) {
              setUser({ ...user, authUser: null });
          }
      });
    },
    [firebase.auth, user]
  );

  //Update bank and admin user data from database
  useEffect(
    () => {
      if (user.authUser) {
        firebase.db
          .collection("users")
          .doc(user.authUser.uid)
          .get()
          .then(function(doc) {
            setUser((user) => ({ ...user, admin: doc.data().admin, bank: doc.data().bank }));
          });
      }
    },
    [firebase, user.authUser]
  );

  return (
    <Router>
      <UserContext.Provider value={user}>
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/login" component={Login} />
          <Route path="/pantry" component={Pantry} />
          <Route path="/admin" component={Admin} />
          <Route path="/welcome" component={Welcome} />
          <Route path="/add" component={Additem} />
        </Switch>
      </UserContext.Provider>
    </Router>
  );
}

export default App;

//
