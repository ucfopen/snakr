import React from "react";
import Header from "./Header";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
// import { FirebaseContext } from "./Firebase";
// import UserContext from "./UserContext";

function Additem() {
  // const [userAmount, updateAmount] = useState(1);
  // const firebase = useContext(FirebaseContext);
  // const [dbUser, updatedb] = useState({});
  // console.log(props.item.data());

  // function addItem() {
  // https://firebase.google.com/docs/reference/js/firebase.database.Reference.html#update
  // firebase.db
  //   .collection("items")
  //   .doc(props.item.id)
  //   .update({
  //     count: amount,
  //   })
  //   .then(function() {
  //     console.log("Document successfully written!");
  //   })
  //   .catch(function(error) {
  //     console.error("Error writing document: ", error);
  //   });
  // console.log(amount);
  // }

  return (
    <div className="main">
      <div className="add">
        <Header />
        <div id="addingContainer">
          <h2>
            Complete all fields if you are adding a case, if adding a single
            item leave case fields blank.
          </h2>
          <div id="single">
            <h3>Item:</h3>
            <TextField id="productName" label="Product Name" margin="normal" />
            <TextField
              id="productUPC"
              label="Single item UPC"
              type="number"
              margin="normal"
            />
            <TextField
              id="productPrice"
              label="Price per item"
              type="number"
              margin="normal"
            />
          </div>
          <div id="case">
            <h3>Case:</h3>
            <TextField
              id="caseUPC"
              label="Case UPC"
              type="number"
              margin="normal"
            />
            <TextField
              id="caseAmount"
              label="Case amount"
              type="number"
              margin="normal"
            />
          </div>

          <Button variant="contained">Add Item</Button>
        </div>
      </div>
    </div>
  );
}

export default Additem;
