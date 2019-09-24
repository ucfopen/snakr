import React, {useContext, useState, useEffect} from 'react';
import UserContext from './UserContext';
import Pantry from './Pantry';
import Header from './Header';
import { Link, Redirect } from "react-router-dom";
import {FirebaseContext} from './Firebase';
import Button from '@material-ui/core/Button';

function Dashboard() {
    const userData = useContext(UserContext);
    const [admin,setAdmin] = useState(false);
    const [account,updateAcc] = useState(0);
    // const [focus, updateFocus] = useState(false);
    const firebase = useContext(FirebaseContext);
    let name = userData.authUser.displayName;

    // useEffect(() => {
    //     console.log(userData.authUser.displayName)
    // });

    useEffect(() => { firebase.db.collection('users').doc(userData.authUser.uid).get().then(function(querySnapshot) {
                if(querySnapshot.data().admin) {
                    setAdmin(true);
                }
            })
    }, [firebase, userData.authUser.uid]);

    // const unsubscribe = firebase.firestore().collection('recipes') .doc(id).onSnapshot( doc => { setLoading(false) setRecipe(doc) }, err => { setError(err) } )
    // useEffect(() => {
    //     if(focus!== document.hasFocus()) {
    //         updateFocus(document.hasFocus())
    //     }
    //     console.log(focus);
    // }, [focus])
    // useEffect(() => {
    //     console.log("reload")
    // });

    //Get User bank data
    useEffect(() => {
        let unsubscribe = firebase.db.collection('users').doc(userData.authUser.uid).onSnapshot(doc => {
            updateAcc(doc.data().bank);
        }, err => { console.log(err) })
        return () => unsubscribe();
    }, [firebase, userData.authUser.uid]);
    if(!userData.authUser) {
        return <Redirect
          to={{
            pathname: "/"
          }}
        />
    } else {
    return (
      <div className="dashboard">
          <Header />
          <header id="dashboardHeader">{name ? <p>Hello {name}</p> : '' }<p>Your balance is ${account.toFixed(2)}</p></header>
          <Pantry />
          {admin ? <Link to='/admin'><Button variant="contained">Admin</Button></Link> : ''}
      </div>
    );
}
}

export default Dashboard;
