import React, {useContext, useEffect, useState} from 'react';
import Item from './Item';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import {FirebaseContext} from './Firebase';

function Pantry() {

    const firebase = useContext(FirebaseContext);
    const [items,addItems] = useState([]);
    const [hiddenOOS, hideOOS] = useState(true);
    const [hiddenIS, hideIS] = useState(false);
    const toggleOOS = () => hideOOS(!hiddenOOS);
    const toggleIS = () => hideIS(!hiddenIS);

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
                <h2 onClick={toggleIS} className={hiddenIS ? "down" : "up"}>Current Items in stock <FontAwesomeIcon icon={hiddenIS ? faSortDown : faSortUp} /></h2>
                <div id="pantry-items" className={hiddenIS ? "hidden" : ""}>
                {items ? (items.map(function(item) {
                    if(item.data().count > 0) {
                        return <Item item={item} key={item.data().name} />;
                    }
                    return '';
                })) : ""}
                </div>
                <h2 onClick={toggleOOS} className={hiddenOOS ? "down" : "up"}>Out of stock <FontAwesomeIcon icon={hiddenOOS ? faSortDown : faSortUp} /></h2>
                <div id="pantry-items" className={hiddenOOS ? "hidden" : ""}>
                {items ? (items.map(function(item) {
                    if(item.data().count < 1) {
                        return <Item item={item} key={item.data().name}/>;
                    }
                    return '';
                })) : ""}
                </div>
            </div>
    );
}

export default Pantry;
