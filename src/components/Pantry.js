import React, {useContext, useEffect, useState} from 'react';
import Header from './Header';
import Item from './Item';
import {FirebaseContext} from './Firebase';

function Pantry() {

    const firebase = useContext(FirebaseContext);
    const [items,addItems] = useState([]);

    useEffect(() => {
        var itemHolder = [];
        firebase.db.collection('items').get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
            let item = doc;
            itemHolder.push(item);
            });
        })
        .then(function() {
            // console.log(itemHolder);
            addItems(itemHolder)
        })
    }, [firebase]);

    return (
            <div className="pantry">
                <h3>Current Items in stock:</h3>
                <div id="pantry-items">
                {items ? (items.map(function(item) {
                    return <Item item={item} key={item.data().name}/>;
                })) : ""}
                </div>
            </div>
    );
}

export default Pantry;
