import React, { useContext, useEffect, useRef, useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { FirebaseContext } from "./Firebase";

// import UserContext from "./UserContext";

function Bank(props) {
  const firebase = useContext(FirebaseContext);
  const [users, updateUsers] = useState();

  useEffect(() => {
    firebase.db
      .collection("users")
      .where("name", ">", "")
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.data());
          let id = doc.id;
          let thing = doc.data();

          updateUsers(user => ({ ...user, [id]: thing }));
        });
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
  }, [firebase]);

  // useEffect(() => {
  //   let checkboxeslen = Object.keys(checkboxValue).length;
  //   if (itemData && checkboxeslen > 0) {
  //     let options = Object.values(itemData.options).map(function(option) {
  //       const value = option.color;
  //       // These checkboxes are incredibly slow to update, need to figure out how to make it faster
  //       return (
  //         <FormControlLabel
  //           control={
  //             <Checkbox
  //               value={checkboxValue[value]}
  //               onChange={e =>
  //                 setCheckValue((currentCheckboxValue) => ({ ...currentCheckboxValue, [value]: e.target.checked }))
  //               }
  //               checked={checkboxValue[value]}
  //             />
  //           }
  //           label={option.color}
  //           key={value}
  //         />
  //       );
  //
  //       // Attempted vanillla input, did not speed up interaction
  //       //<div key={itemData.options[key].color}>
  //       //<input type="checkbox" name={itemData.options[key].color} id={value} value={checkboxValue[value]} onChange={e => setCheckValue({...checkboxValue, [value]: e.target.checked})} checked={checkboxValue[value]}/>
  //       //<label htmlFor={value}>{itemData.options[key].color}</label>
  //       //</div>
  //     });
  //     setCheckboxOptions(options);
  //     setSubmitted( (submitted) => ({ ...submitted, url: true }));
  //   }
  // }, [itemData, checkboxValue]);

  useEffect(() => {
    console.log(users);
  }, [users]);

  return <div>Test</div>;
}

export default Bank;
