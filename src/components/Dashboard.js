import React, { useContext, useState, useEffect } from "react";
import UserContext from "./UserContext";
import Pantry from "./Pantry";
import Loading from "./Loading";
import Button from "@material-ui/core/Button";
import { Redirect } from "react-router-dom";
import { FirebaseContext } from "./Firebase";

function Dashboard() {
  const userData = useContext(UserContext);
  const [account, updateAcc] = useState(0);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const firebase = useContext(FirebaseContext);
  useEffect(() => {
    firebase.db
      .collection("users")
      .doc(userData.authUser.uid)
      .get()
      .then(function(querySnapshot) {
        if (querySnapshot.data().name) {
          setName(querySnapshot.data().name);
        }
        setLoading(false);
      });
  }, [firebase, userData.authUser.uid, name]);

  //Get User bank data
  useEffect(() => {
    let unsubscribe = firebase.db
      .collection("users")
      .doc(userData.authUser.uid)
      .onSnapshot(
        doc => {
          updateAcc(doc.data().bank);
        },
        err => {
          console.log(err);
        }
      );
    return () => unsubscribe();
  }, [firebase, userData.authUser.uid]);
  if (!userData.authUser) {
    return (
      <Redirect
        to={{
          pathname: "/"
        }}
      />
    );
  } else {
    return (
      <div className="dashboard">
        {loading ? <Loading /> : ""}
        <header id="dashboardHeader">
          {name ? (
            <h2>Hello {name}</h2>
          ) : (
            <h2>Please head to the profile page to set your display name.</h2>
          )}
          <p>Your balance is ${account.toFixed(2)}</p>
          {account > 0 ? (
            <p>
              Pay with:
              <br />
              <Button
                href={"CHANGEME" + account}
                variant="contained"
              >
                Square Cash
              </Button>
              &nbsp;
              <Button
                href={"CHANGEME" + account}
                variant="contained"
              >
                Paypal
              </Button>
            </p>
          ) : (
            ""
          )}
        </header>
        <Pantry />
      </div>
    );
  }
}

export default Dashboard;
