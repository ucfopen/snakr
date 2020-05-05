import React, { useContext, useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { FirebaseContext } from "./Firebase";
import InputAdornment from "@material-ui/core/InputAdornment";

function Bank(props) {
  const firebase = useContext(FirebaseContext);
  const [users, updateUsers] = useState();
  const [from, setFrom] = React.useState("");
  const [to, setTo] = React.useState("");
  const [person, setPerson] = React.useState("");
  const [amountMove, setAmountMove] = React.useState(0);
  const [amountUp, setAmountUp] = React.useState(0);

  const handleChangeFrom = event => {
    setFrom(event.target.value);
  };

  const handleChangeTo = event => {
    setTo(event.target.value);
  };

  const handleChangePerson = event => {
    setPerson(event.target.value);
  };

  useEffect(() => {
    firebase.db
      .collection("users")
      .where("name", ">", "")
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          let id = doc.id;
          let thing = doc.data();

          updateUsers(user => ({ ...user, [id]: thing }));
        });
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
  }, [firebase]);

  function move() {
    console.log(to, from, amountMove);
    let intVersion = parseInt(amountMove);
    console.log(users[from].bank - intVersion);
    console.log(users[to].bank + intVersion);
    firebase.db
      .collection("users")
      .doc(from)
      .update({ bank: users[from].bank - intVersion });
    firebase.db
      .collection("users")
      .doc(to)
      .update({ bank: users[to].bank + intVersion });
    reset();
  }
  function update() {
    console.log(person, amountUp);
    let intVersion = parseInt(amountUp);
    console.log(users[person].bank + intVersion);
    firebase.db
      .collection("users")
      .doc(person)
      .update({ bank: users[person].bank + intVersion });
    reset();
  }

  function reset() {
    setFrom("");
    setTo("");
    setPerson("");
    setAmountMove(0);
    setAmountUp(0);
  }

  return (
    <div className="bank">
      <h2>Banking</h2>
      <div id="move">
        <h3>Move Funds Between Users</h3>
        <div id="textfields">
          {users ? (
            <FormControl>
              <InputLabel id="from-label">From (User)</InputLabel>
              <Select
                labelId="from-label"
                id="from"
                value={from}
                onChange={handleChangeFrom}
              >
                {Object.keys(users).map(function(item, index) {
                  return (
                    <MenuItem value={item} key={users[item]["name"]}>
                      {users[item]["name"]}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          ) : (
            ""
          )}
          {users ? (
            <FormControl>
              <InputLabel id="to-label">To (User)</InputLabel>
              <Select
                labelId="to-label"
                id="to"
                value={to}
                onChange={handleChangeTo}
              >
                {Object.keys(users).map(function(item, index) {
                  return (
                    <MenuItem value={item} key={users[item]["name"]}>
                      {users[item]["name"]}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          ) : (
            ""
          )}
          <TextField
            value={amountMove}
            id="amount-moving"
            type="number"
            label="Amount"
            margin="normal"
            onChange={e => setAmountMove(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              )
            }}
          />
        </div>
        <Button variant="contained" onClick={move}>
          Move
        </Button>
      </div>
      <div id="update">
        <h3>Update User Funds</h3>
        <p>This will change the user's bank data by the specified amount.</p>
        {person ? (
          <p>
            Current: {users[person].name} has ${users[person].bank}
          </p>
        ) : (
          ""
        )}
        <div id="textfields">
          {users ? (
            <FormControl>
              <InputLabel id="from-label">Person</InputLabel>
              <Select
                labelId="from-label"
                id="from"
                value={person}
                onChange={handleChangePerson}
              >
                {Object.keys(users).map(function(item, index) {
                  return (
                    <MenuItem value={item} key={users[item]["name"]}>
                      {users[item]["name"]}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          ) : (
            ""
          )}
          <TextField
            value={amountUp}
            id="amount-update"
            type="number"
            label="Amount"
            margin="normal"
            onChange={e => setAmountUp(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              )
            }}
          />
        </div>
        <Button variant="contained" onClick={update}>
          Update
        </Button>
      </div>
    </div>
  );
}

export default Bank;
//
// {users ? users.map(function(item) {
//   console.log(item)
// }) : ''}
