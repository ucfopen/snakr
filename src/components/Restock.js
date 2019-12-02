import React, { useContext, useState, useEffect } from "react";
import Item from "./Adminitem";
import { FirebaseContext } from "./Firebase";

function Restock() {
  const firebase = useContext(FirebaseContext);
  const [boxes, addBoxes] = useState([]);
  const [cans, addCans] = useState([]);

  // Grab box data
  useEffect(() => {
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
  }, [firebase]);

  //Grab can data
  useEffect(() => {
    var itemHolder = [];
    firebase.db
      .collection("items")
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          let item = doc;
          itemHolder.push(item);
        });
      })
      .then(function() {
        // console.log(itemHolder);
        addCans(itemHolder);
      });
  }, [firebase]);


  return (
        <div className="pantry">
          <h2>Add a Case</h2>
          <div id="pantry-items">
            {boxes
              ? boxes.map(function(box) {
                  return <Item item={box} key={box.data().name} type="box" />;
                })
              : ""}
          </div>
          <h2>Add a Can</h2>
          <div id="pantry-items">
            {cans
              ? cans.map(function(can) {
                  return <Item item={can} key={can.data().name} type="can" />;
                })
              : ""}
          </div>
        </div>
  );
}

export default Restock;

// , {useContext,useEffect,useState}
