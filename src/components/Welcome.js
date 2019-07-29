import React, {useContext} from 'react';
import Header from './Header';
import  UserContext from './UserContext';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";

function Welcome() {
    const userData = useContext(UserContext);
    return (
      <div className="welcome">

        <h2>Snakr means an always up to date list of what is in stock for snacks</h2>
        <h2>Snakr means you'll always know how much you owe (or dont owe!)</h2>
        <h3>Login to get started with the Snakr revolution.</h3>
        <Link to="/login"><Button variant="contained">Login</Button></Link>
      </div>
    );
}

export default Welcome;
