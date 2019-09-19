import React, {useContext} from 'react';
import Dashboard from './Dashboard';
import Welcome from './Welcome';
import UserContext from './UserContext';

function Content() {
    const userData = useContext(UserContext);

    // useEffect(() => {
    //     console.log(userData);
    // })

    return (
      <div className="content">
      {
          (userData.authUser)
              ? <Dashboard />
              : <Welcome />
      }
      </div>
    );
}

export default Content;
