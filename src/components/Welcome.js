import React from 'react';
import Header from './Header';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";

function Welcome() {

    return (
      <div className="welcome">
        <Header big="true"/>
        <h2>Tired of looking for a whiteboard marker?</h2>
        <h2>Concerned about what's going on in Zach's square?</h2>
        <h2>Snakr to the rescue</h2>
        <h3>Snakr means an always up to date list of what's in stock for snacks</h3>
        <h3>Snakr means you'll always know how much you owe (or dont owe!)</h3>
        <h4>Login to get started with the Snakr revolution.</h4>
        <Link to="/login"><Button variant="contained">Login</Button></Link>
      </div>
    );
}

export default Welcome;
