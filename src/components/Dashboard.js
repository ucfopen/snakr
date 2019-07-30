import React, {useContext, useState, useEffect} from 'react';
import UserContext from './UserContext';
import Pantry from './Pantry';
import Header from './Header';
import Admin from './Admin';
import { Link } from "react-router-dom";
import {FirebaseContext} from './Firebase';
import Button from '@material-ui/core/Button';

function Dashboard() {
    const userData = useContext(UserContext);
    const [admin,setAdmin] = useState(false);
    const [account,updateAcc] = useState(0);
    const firebase = useContext(FirebaseContext);
    let name = userData.authUser.displayName;


    useEffect(() => {
        firebase.db.collection('users').doc(userData.authUser.uid).get().then(function(querySnapshot) {
            console.log(querySnapshot)
            if(querySnapshot.data().admin) {
                setAdmin(true);
            }
        })
    }, [firebase, userData.authUser.uid]);

    useEffect(() => {
        firebase.db.collection('users').doc(userData.authUser.uid).onSnapshot(function(doc) {
            updateAcc(doc.data().bank);
        })
    }, [firebase, userData.authUser.uid]);

    return (
      <div className="dashboard">
          <Header />
        <p>Hello {name}, your balance is ${account.toFixed(2)}</p>
        <Pantry />
        {admin ? <Link to='/admin'><Button variant="contained">Admin</Button></Link> : ''}
      </div>
    );
}

export default Dashboard;
