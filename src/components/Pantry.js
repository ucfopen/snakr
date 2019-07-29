import React, {useContext, useState, useEffect} from 'react';
import Header from './Header';
import Content from './Content';
import {FirebaseContext} from './Firebase';

function Pantry() {

    const firebase = useContext(FirebaseContext);

    function getSnacks() {
        let snacks = firebase.db.collection('items').get()
            .forEach(snack => {
                console.log(snack.data())
            });

        return snacks;
    }

    return (
        <div className="main">
            <Header />
            <div className="pantry">
                {getSnacks()}
            </div>
        </div>
    );
}

export default Pantry;
