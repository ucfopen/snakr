import React, {useContext} from 'react';
import '../App.css';
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import UserContext from './UserContext';
import {FirebaseContext} from './Firebase';

function Header(props) {
    const firebase = useContext(FirebaseContext);
    const userData = useContext(UserContext);
    function signout() {
        firebase.doSignOut()
    };

    if(props.big) {
        return (
            <header className="App-header big-header">
                    <div id="site-nav"><h1>Snakr - The Snack Solution</h1>
                    <Link to="/login">Login</Link></div>
                    <div id="big-header"></div>
          </header>
        );
    } else {
        return (<header className="App-header">
                <h1>Snakr - The Snack Solution</h1>
                {userData.authUser ? <Button onClick={signout}>Logout</Button> : <Link to="/login" >Login</Link>}
      </header>);
    }

}

export default Header;
