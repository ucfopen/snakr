import React, { useContext, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { FirebaseContext } from "./Firebase";

function Additem(props) {
  const firebase = useContext(FirebaseContext);
  const [itemVals, updateItem] = useState({
    name: "",
    upcI: "",
    price: 0.5,
    upcC: "",
    amount: 36
  });

  const handleChangeIn = name => event => {
    updateItem({ ...itemVals, [name]: event.target.value });
  };

  function addItem() {
    //firebase.google.com/docs/reference/js/firebase.database.Reference.html#update
    if(itemVals.name) {
        if(itemVals.upcC) {
            console.log("Adding a case");
            firebase.db
              .collection("boxes")
              .doc(itemVals.upcC)
              .set({
                item: itemVals.upcI,
                name: itemVals.name,
                size: itemVals.amount
              })
              .then(function() {
                console.log("Document successfully written!");
              })
              .catch(function(error) {
                console.error("Error writing document: ", error);
              });
              firebase.db
                .collection("items")
                .doc(itemVals.upcI)
                .set({
                  count: itemVals.amount,
                  name: itemVals.name,
                  price: itemVals.price
                })
                .then(function() {
                  console.log("Document successfully written!");
                })
                .catch(function(error) {
                  console.error("Error writing document: ", error);
                });
        } else {
            firebase.db
              .collection("items")
              .doc(itemVals.upcI)
              .set({
                count: 1,
                name: itemVals.name,
                price: itemVals.price
              })
              .then(function() {
                console.log("Document successfully written!");
              })
              .catch(function(error) {
                console.error("Error writing document: ", error);
              });
        }
        updateItem({
          name: "",
          upcI: "",
          price: 0.5,
          upcC: "",
          amount: 36
      });
    }

  }

  return (
      <div className="add">
        <div id="addingContainer">
          <h2>
            Complete all fields if you are adding a case, if adding a single
            item leave case fields blank.
          </h2>
          <div id="single">
            <h3>Item:</h3>
            <TextField
              id="productName"
              label="Product Name"
              margin="normal"
              value={itemVals.name}
              onChange={handleChangeIn("name")}
            />
            <TextField
              id="productUPC"
              label="Single item UPC"
              value={itemVals.upcI}
              onChange={handleChangeIn("upcI")}
              margin="normal"
            />
            <TextField
              id="productPrice"
              label="Price per item"
              value={itemVals.price}
              onChange={handleChangeIn("price")}
              type="number"
              margin="normal"
            />
          </div>
          <div id="case">
            <h3>Case:</h3>
            <TextField
              id="caseUPC"
              label="Case UPC"
              value={itemVals.upcC}
              onChange={handleChangeIn("upcC")}
              margin="normal"
            />
            <TextField
              id="caseAmount"
              label="Case amount"
              value={itemVals.amount}
              onChange={handleChangeIn("amount")}
              type="number"
              margin="normal"
            />
          </div>

          <Button variant="contained" onClick={() => addItem()}>Add Item</Button>
        </div>
      </div>
  );
}

export default Additem;

//
