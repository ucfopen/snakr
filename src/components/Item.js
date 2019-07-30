import React, {useContext, useEffect, useRef} from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import {FirebaseContext} from './Firebase';

function Item(props) {
    const unformatted = useRef(props.item.data().price);
    const price = useRef(props.item.data().price);
    const name = useRef(props.item.data().name);
    const amount = useRef(props.item.data().count);
    let cost = "$"+(price.current).toFixed(2);
    const firebase = useContext(FirebaseContext);

    useEffect(() => {
        firebase.db.collection('items').doc(props.item.id).onSnapshot(function(doc) {
            console.log(doc.data());
            // snapshot.docChanges().forEach(function(doc) {
            //     console.log(doc);
            // })
            unformatted.current = doc.data().price;
            name.current = doc.data().name;
            amount.current = doc.data().count;
        })
    }, [firebase]);

    function buyItem() {
        firebase.db.collection('items').doc(props.item.id).set({count: amount.current-1, name: name.current, price: unformatted.current}).then(function() {
        console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
    }

    useEffect(() => {
        console.log(amount);
    }, [amount]);

    return (
        <Card className="item">
            <CardHeader title={name.current} subheader={cost} />
            <div id="content"><CardContent>
                {amount.current} Remaining
            </CardContent>
            <CardActions disableSpacing>
        <Button size="small" color="primary" onClick={() => buyItem()}>
          Buy
        </Button>
      </CardActions></div>
        </Card>
    );
}

export default Item;
