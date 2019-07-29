import React from 'react';
import Login from './Login';
import  UserContext from './UserContext';

function Content() {
    const userData = useContext(UserContext);
    return (
      <div className="content">
        <Login />
      </div>
    );
}

export default Content;
