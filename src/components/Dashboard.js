import React, {useContext, useState, useEffect} from 'react';
import UserContext from './UserContext';
import Pantry from './Pantry';
import Header from './Header';

import { Link } from "react-router-dom";
import {FirebaseContext} from './Firebase';
import Button from '@material-ui/core/Button';

function Dashboard() {
    const userData = useContext(UserContext);
    const [admin,setAdmin] = useState(false);
    const [account,updateAcc] = useState(0);
    const firebase = useContext(FirebaseContext);
    let name = userData.authUser.displayName;


    useEffect(() => { firebase.db.collection('users').doc(userData.authUser.uid).get().then(function(querySnapshot) {
                if(querySnapshot.data().admin) {
                    setAdmin(true);
                }
            })
    }, [firebase]);

    // const unsubscribe = firebase.firestore().collection('recipes') .doc(id).onSnapshot( doc => { setLoading(false) setRecipe(doc) }, err => { setError(err) } )

    useEffect(() => {
        let unsubscribe = firebase.db.collection('users').doc(userData.authUser.uid).onSnapshot(doc => {
            updateAcc(doc.data().bank);
        }, err => { console.log(err) })
        return () => unsubscribe();

    }, [firebase]);

    return (
      <div className="dashboard">
          <Header />
          <header>{name ? <p>Hello {name}</p> : '' }<p>Your balance is ${account.toFixed(2)}</p></header>
          <Pantry />
          {admin ? <Link to='/admin'><Button variant="contained">Admin</Button></Link> : ''}
      </div>
    );
}

export default Dashboard;
