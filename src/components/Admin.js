import React, { useContext, useState, useEffect } from "react";
import Header from "./Header";
import Item from "./Adminitem";
import { FirebaseContext } from "./Firebase";
// import UserContext from "./UserContext";
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";

function Admin() {
  const firebase = useContext(FirebaseContext);
  // const userData = useContext(UserContext);
  const [boxes, addBoxes] = useState([]);
  const [cans, addCans] = useState([]);
  let newItem = true;

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
  // useEffect(
  //   () => {
  //     console.log(boxes);
  //   },
  //   [boxes]
  // );
  return (
    <div className="main">
      <div className="admin">
        <Header />
        <Link to='/add'><Button variant="contained">Add New Item</Button></Link>
        <div id="newItem" className={newItem ? 'hidden' : ''}></div>
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

      </div>
    </div>
  );
}

export default Admin;

// , {useContext,useEffect,useState}
