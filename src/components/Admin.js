import React, { useContext, useState, useEffect } from "react";
import Header from "./Header";
import Item from './Adminitem';
import { FirebaseContext } from "./Firebase";
import UserContext from "./UserContext";

function Admin() {
  const firebase = useContext(FirebaseContext);
  const userData = useContext(UserContext);
  const [boxes, addBoxes] = useState([]);
  useEffect(
    () => {
      var itemHolder = [];
      firebase.db
        .collection("boxes")
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            let item = doc;
            itemHolder.push(item);
          });
        })
        .then(function() {
          // console.log(itemHolder);
          addBoxes(itemHolder);
        });
    },
    [firebase]
  );
  useEffect(
    () => {
      console.log(boxes);
    },
    [boxes]
  );
  return (
    <div className="admin">
      <Header />
      <div id="cases">
      {boxes ? (boxes.map(function(box) {
              return <Item item={box} key={box.data().name} />;
      })) : ""}
      </div>
      <div id="cans"></div>
    </div>
  );
}

export default Admin;

// , {useContext,useEffect,useState}
