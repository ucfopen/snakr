import React, {useContext} from 'react';
import Login from './Login';
import  UserContext from './UserContext';

function Welcome() {
    const userData = useContext(UserContext);
    return (
      <div className="welcome">
        <p>Welcome</p>
      </div>
    );
}

export default Welcome;
