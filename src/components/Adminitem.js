import React, { useContext, useEffect, useRef, useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { FirebaseContext } from "./Firebase";

// import UserContext from "./UserContext";

function Item(props) {
  const name = useRef(props.item.data().name);
  const [userAmount, updateAmount] = useState(1);
  let amount = useRef(props.item.data().size);

  useEffect(() => {
    if (!props.item.data().size) {
      amount.current = userAmount;
    }
  }, [userAmount, props.item]);

  const firebase = useContext(FirebaseContext);

  const handleChange = name => event => {
    updateAmount(event.target.value);
  };

  function addItem(amount) {
    // https://firebase.google.com/docs/reference/js/firebase.database.Reference.html#update
    firebase.db
      .collection("items")
      .doc(props.item.data().item)
      .update({
        count: amount
      })
      .then(function() {
        console.log("Document successfully written!");
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
      });
  }

  let input = null;
  if (props.type === "can") {
    input = (
      <TextField
        id="outlined-number"
        label="Amount"
        value={userAmount}
        onChange={handleChange("amount")}
        type="number"
        margin="dense"
      />
    );
  }

  return (
    <Card className="item">
      <CardHeader title={name.current} />
      <div id="content">
        <CardContent>{input ? input : "Count: " + amount.current}</CardContent>
        <CardActions disableSpacing>
          <Button
            size="small"
            color="primary"
            onClick={() => addItem(amount.current)}
          >
            Add
          </Button>
        </CardActions>
      </div>
    </Card>
  );
}

export default Item;
