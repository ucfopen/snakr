import React, {useContext, useState, useEffect} from 'react';
import Login from './Login';
import Dashboard from './Dashboard';
import Welcome from './Welcome';
import  UserContext from './UserContext';

function Content() {
    const userData = useContext(UserContext);

    return (
      <div className="content">
      {
          userData.authUser
              ? <Dashboard />
              : <Welcome />
      }
      </div>
    );
}

export default Content;
