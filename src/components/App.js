import React, {useEffect, useContext, useState} from 'react';
import '../App.css';
import Main from './Main';
import Login from './Login';
import Pantry from './Pantry';
import Admin from './Admin';
import  {BrowserRouter as Router, Route, Switch, } from 'react-router-dom';
import UserContext  from './UserContext';
import  { FirebaseContext } from './Firebase';

function App() {
    const firebase = useContext(FirebaseContext);
      const [user, setUser] = useState('');
      const [state, setState] = useState({authUser: user, updateUser: userUpdate});

      //onAuthStateChanged provided by the firebase api creates a listener
      // that updates the authUser object based on any changes
      useEffect(() => {
          firebase.auth.onAuthStateChanged(authUser => {
              authUser
                  ? setUser(authUser)
                  : setUser(null);
          });

      }, [firebase.auth])
      //When an update to the  user object changes, update the context
      // to contain the new user data
      useEffect(() => {
          setState({...state, authUser: user});
      }, [user, state])
      //This function is passed to the context provider so that
      // down range children can update the context
      function userUpdate(data) {
        setState({...state, authUser: data});
      };

      return (
          <Router>
          <UserContext.Provider value={state}>
              <Switch>
                  <Route path='/' exact component={Main}/>
                  <Route path='/login' component={Login}/>
                  <Route path='/pantry' component={Pantry}/>
                  <Route path='/admin' component={Admin}/>
              </Switch>

          </UserContext.Provider>
          </Router>
      );
}

export default App;
