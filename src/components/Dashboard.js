import React, {useContext} from 'react';
import UserContext from './UserContext';
import Pantry from './Pantry';
import Header from './Header';

function Dashboard() {
    const userData = useContext(UserContext);

    let name = userData.authUser.displayName;

    return (
      <div className="dashboard">
          <Header />
        <p>Hello {name}</p>
        <Pantry />
      </div>
    );
}

export default Dashboard;
