import React, { useContext, useEffect } from "react";
import Button from "@material-ui/core/Button";
import "../App.css";
// import Header from "./Header";
import { FirebaseContext } from "./Firebase";
import UserContext from "./UserContext";
import TextField from "@material-ui/core/TextField";
// import { Redirect } from "react-router-dom";

function Profile() {
  const firebase = useContext(FirebaseContext);
  const userData = useContext(UserContext);
  let name = userData.authUser.displayName;

  const [nameField, setName] = React.useState(name);

  // const handleChangeIn = name => event => {
  //   setSignin({ ...signinInputs, [name]: event.target.value });
  // };

  // let user = firebase.auth().currentUser;
  // console.log(firebase.auth.currentUser);
  // useEffect(() => {
  //     console.log(firebase.auth.currentUser.displayName);
  // }, [firebase.auth]);

  useEffect(() => {
      console.log(nameField);
  }, [nameField]);

  function update(newName) {
    firebase.db.collection("users").doc(userData.authUser.uid).update({name: newName});
  }

  return (
    <div id="profile">
    <h2>Update Display Name</h2>
    <div className="input">
    <TextField
      required
      fullWidth
      id="password"
      label="Full Name"
      defaultValue={name}
      className="textfields"
      onChange={e => setName(e.target.value)}
      margin="normal"
    />
    <Button variant="contained" onClick={() => update(nameField)}>
      Save
    </Button>
    </div>
    </div>
  );
}

export default Profile;
