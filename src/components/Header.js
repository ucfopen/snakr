import React, {useContext, useEffect} from 'react';
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
    let login=false;

    if(props.login) {
        login = JSON.parse(props.login);
    }


    if(props.big) {
        return (
            <header className="App-header big-header">
                    <div id="site-nav"><Link to='/'><h1>Snakr - The Snack Solution</h1></Link>
                    {login ? '' : <Link to="/login">Login</Link>}</div>
                    <div id="big-header"></div>
          </header>
        );
    } else {
        return (<header className="App-header">
                <Link to='/'><h1>Snakr - The Snack Solution</h1></Link>
                {userData && userData.authUser ? <Button onClick={signout}>Logout</Button> : (login ? '' : <Link to="/login">Login</Link>)}
      </header>);
    }

}

export default Header;
