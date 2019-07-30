import React, {useContext,useEffect,useState} from 'react';
import Header from './Header';
import {FirebaseContext} from './Firebase';
import UserContext from './UserContext';



function Admin() {
    const firebase = useContext(FirebaseContext);
    const userData = useContext(UserContext);
    const [boxes,addBoxes] = useState([]);
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
            addBoxes(itemHolder)
        })
    }, [firebase]);

    return (
      <div className="main">
          <Header />
      </div>
    );
}

export default Admin;
