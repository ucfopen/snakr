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
  const [amount, updateAmount] = useState(props.item.data().count);
  let cost = "$" + price.current.toFixed(2);
  const firebase = useContext(FirebaseContext);
  const [dbUser, updatedb] = useState({});


  useEffect(() => {
    let unsubscribe = firebase.db
      .collection("users")
      .doc(userData.authUser.uid)
      .onSnapshot(
        doc => {
          updatedb(doc.data().bank);
        },
        err => {
          console.log(err);
        }
      );
    return () => unsubscribe();
  }, [firebase, userData.authUser.uid]);

  useEffect(() => {
    let unsubscribe = firebase.db
      .collection("items")
      .doc(props.item.id)
      .onSnapshot(
        doc => {
          updateAmount(doc.data().count);
        },
        err => {
          console.log(err);
        }
      );
    return () => unsubscribe();
}, [firebase, props.item.id]);

  function updateBank(amount) {
    firebase.db
      .collection("users")
      .doc(userData.authUser.uid)
      .update({ bank: dbUser + amount })
      // .then(function(...test) {
      //     console.log(test)
      // });
  }

  function buyItem() {
    firebase.db
      .collection("items")
      .doc(props.item.id)
      .update({count: amount - 1})
      .then(function() {
        console.log("Document successfully written!");
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
      });
    updateBank(unformatted.current);
  }
  let disabled = !amount;

  return (
    <Card className="item">
      <CardHeader title={name.current} subheader={cost} />
      <div id="content">
        <CardContent>{amount} Remaining</CardContent>
        <CardActions disableSpacing>
          <Button
            disabled={disabled}
            size="small"
            color="primary"
            onClick={() => buyItem()}
          >
            Buy
          </Button>
        </CardActions>
      </div>
    </Card>
  );
}

export default Item;
