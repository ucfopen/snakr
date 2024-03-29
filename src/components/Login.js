import React, { useContext, useState } from "react";
import Button from "@material-ui/core/Button";
// import "../App.css";
import Header from "./Header";
import { FirebaseContext } from "./Firebase";
import UserContext from "./UserContext";
import TextField from "@material-ui/core/TextField";
import GoogleButton from "react-google-button";
import { Redirect } from "react-router-dom";

function Login() {
  const firebase = useContext(FirebaseContext);
  const userData = useContext(UserContext);
  const [newUser, createUser] = useState(false);
  const [signinInputs, setSignin] = useState({
    email: "",
    password: ""
  });
  const [signupInputs, setSignup] = useState({
    email: "",
    password: "",
    displayName: ""
  });

  const handleChangeIn = name => event => {
    setSignin({ ...signinInputs, [name]: event.target.value });
  };
  const handleChangeUp = name => event => {
    setSignup({ ...signupInputs, [name]: event.target.value });
  };

  function signin() {
    firebase
      .doSignInWithGoogle()
      .then(authUser => {
        // userData.userUpdate(authUser.user);
        if (authUser.additionalUserInfo.isNewUser) {
          if (firebase) {
            firebase.db
              .collection("users")
              .doc(authUser.user.uid)
              .set({ bank: 0, admin: false, name: authUser.displayName });
          }
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  function signinEmail(email, pass) {
    firebase.doSignInWithEmailAndPassword(email, pass).catch(error => {
      console.log(error);
    });
  }

  function signup(email, pass) {
    firebase
      .doCreateUserWithEmailAndPassword(email, pass)
      .then(authUser => {
        if (authUser.additionalUserInfo.isNewUser) {
          if (firebase) {
            firebase.db
              .collection("users")
              .doc(authUser.user.uid)
              .set({ bank: 0, admin: false, name: "" });
          }
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  const googleLogin = <GoogleButton type="light" onClick={signin} />;

  const fields = (
    <div id="fields">
      <div id="loginFields" className={newUser ? "hidden" : ""}>
        <h2>Sign In for Snacks</h2>
        <TextField
          required
          fullWidth
          id="email"
          label="Email address"
          className="textfields"
          defaultValue={signinInputs.password}
          onChange={handleChangeIn("email")}
          margin="normal"
        />
        <TextField
          required
          fullWidth
          id="password"
          label="Password"
          type="password"
          defaultValue={signinInputs.password}
          autoComplete="current-password"
          className="textfields"
          onChange={handleChangeIn("password")}
          margin="normal"
        />
        <Button
          variant="contained"
          onClick={() => signinEmail(signinInputs.email, signinInputs.password)}
        >
          Sign In
        </Button>
        <p>or</p>
        {googleLogin}
      </div>
      <div id="signupFields" className={newUser ? "" : "hidden"}>
        <h2>Create an Account</h2>
        <TextField
          required
          fullWidth
          id="signupEmail"
          defaultValue={signupInputs.email}
          label="Email address"
          className="textfields"
          onChange={handleChangeUp("email")}
          margin="normal"
        />
        <TextField
          required
          fullWidth
          id="signupPassword"
          label="Password"
          type="password"
          defaultValue={signupInputs.password}
          autoComplete="current-password"
          className="textfields"
          onChange={handleChangeUp("password")}
          margin="normal"
        />
        <Button
          variant="contained"
          onClick={() => signup(signupInputs.email, signupInputs.password)}
        >
          Sign Up
        </Button>
        <p>or</p>
        {googleLogin}
      </div>
      <div id="accountBox">
        {newUser ? (
          <Button onClick={() => createUser(false)}>
            Already have an account?
          </Button>
        ) : (
          <Button onClick={() => createUser(true)}>
            Need to create an account?
          </Button>
        )}
      </div>
    </div>
  );

  return (
    <div className="login">
      <div class="grid-container">
        <Header login="true" />
        <div class="content">
          {userData.authUser ? (
            <Redirect
              to={{
                pathname: "/"
              }}
            />
          ) : (
            fields
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
