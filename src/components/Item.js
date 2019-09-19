import React, {useContext, useEffect, useRef, useState} from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import {FirebaseContext} from './Firebase';
import UserContext from './UserContext';

function Item(props) {
    const unformatted = useRef(props.item.data().price);
    const userData = useContext(UserContext);
    const price = useRef(props.item.data().price);
    const name = useRef(props.item.data().name);
    const amount = useRef(props.item.data().count);
    let cost = "$"+(price.current).toFixed(2);
    const firebase = useContext(FirebaseContext);
    const [dbUser, updatedb] = useState({});

    // useEffect(() => {
    //     console.log(props.item.data())
    // });

    // useEffect(() => {
    //         let unsubscribe = firebase.db.collection('items').doc(props.item.id).onSnapshot(doc => {
    //             // console.log(doc);
    //             unformatted.current = doc.data().price;
    //             name.current = doc.data().name;
    //             amount.current = doc.data().count;
    //         }, err => { console.log(err) })
    //         return () => unsubscribe();
    // }, [firebase, props.item.id]);

    useEffect(() => {
        let unsubscribe = firebase.db.collection('users').doc(userData.authUser.uid).onSnapshot(doc => {
            updatedb(doc.data());
        }, err => { console.log(err) })
        return () => unsubscribe();
}, [firebase, props.item.id, userData.authUser.uid]);

    function updateBank(amount) {
        firebase.db.collection('users').doc(userData.authUser.uid).update({bank:dbUser.bank+amount})
    }

    function buyItem() {
        console.log("buying Item");
        firebase.db.collection('items').doc(props.item.id).set({count: amount.current-1, name: name.current, price: unformatted.current}).then(function() {
        console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
        updateBank(unformatted.current);
    }
    let disabled = !amount.current;
    // console.log(disabled);
    return (
        <Card className="item">
            <CardHeader title={name.current} subheader={cost} />
            <div id="content"><CardContent>
                {amount.current} Remaining
            </CardContent>
            <CardActions disableSpacing>
        <Button disabled={disabled} size="small" color="primary" onClick={() => buyItem()}>
          Buy
      </Button>
      </CardActions></div>
        </Card>
    );
}

export default Item;
