import React, {useContext} from 'react';
import Login from './Login';
import  UserContext from './UserContext';

function Dashboard() {
    const userData = useContext(UserContext);
    return (
      <div className="welcome">
        <p>Hello</p>
      </div>
    );
}

export default Dashboard;
