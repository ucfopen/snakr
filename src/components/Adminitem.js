import React, { useContext, useEffect, useRef, useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import { FirebaseContext } from "./Firebase";
import UserContext from "./UserContext";

function Item(props) {
  const unformatted = useRef(props.item.data().price);
  const userData = useContext(UserContext);
  const price = useRef(props.item.data().price);
  const name = useRef(props.item.data().name);
  const amount = props.item.data().size;
  // let cost = "$" + price.current.toFixed(2);
  const firebase = useContext(FirebaseContext);
  const [dbUser, updatedb] = useState({});

  function buyItem(amount) {
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
  }
  return (
    <Card className="item">
      <CardHeader title={name.current}/>
      <div id="content">
        <CardContent>Count: {amount} </CardContent>
        <CardActions disableSpacing>
          <Button
            size="small"
            color="primary"
            onClick={() => buyItem(amount)}
          >
            Add
          </Button>
        </CardActions>
      </div>
    </Card>
  );
}

export default Item;
