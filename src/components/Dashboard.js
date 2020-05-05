import React, { useContext, useState, useEffect } from "react";
import UserContext from "./UserContext";
import Pantry from "./Pantry";
import { Redirect } from "react-router-dom";
import { FirebaseContext } from "./Firebase";

function Dashboard() {
  const userData = useContext(UserContext);
  const [account, updateAcc] = useState(0);
  const [name, setName] = useState("");
  // const [focus, updateFocus] = useState(false);
  const firebase = useContext(FirebaseContext);

  // useEffect(() => {
  //     console.log(userData.authUser.displayName)
  // });

  useEffect(() => {
    firebase.db
      .collection("users")
      .doc(userData.authUser.uid)
      .get()
      .then(function(querySnapshot) {
        if (querySnapshot.data().name) {
          setName(querySnapshot.data().name);
        }
      });
  }, [firebase, userData.authUser.uid, name]);

  // const unsubscribe = firebase.firestore().collection('recipes') .doc(id).onSnapshot( doc => { setLoading(false) setRecipe(doc) }, err => { setError(err) } )
  // useEffect(() => {
  //     if(focus!== document.hasFocus()) {
  //         updateFocus(document.hasFocus())
  //     }
  //     console.log(focus);
  // }, [focus])
  // useEffect(() => {
  //     console.log("reload")
  // });

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
        <header id="dashboardHeader">
          {name ? (
            <h2>Hello {name}</h2>
          ) : (
            <h2>Please head to the profile page to set your display name.</h2>
          )}
          <p>Your balance is ${account.toFixed(2)}</p>
        </header>
        <Pantry />
      </div>
    );
  }
}

export default Dashboard;
