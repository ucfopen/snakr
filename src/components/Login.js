import React, {useContext, useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import '../App.css';
// import Dashboard from './Dashboard';
// import  { Link } from 'react-router-dom';
import {FirebaseContext} from './Firebase';
import  UserContext from './UserContext';
import TextField from '@material-ui/core/TextField';
import GoogleButton from 'react-google-button'

function Login() {
    const firebase = useContext(FirebaseContext);
    const userData = useContext(UserContext);
    const [user, setUser] = useState('');
    const [newUser, createUser] = useState(false);
    const [signinInputs, setSignin] = React.useState({
        email: '',
        password: ''
    });
    const [signupInputs, setSignup] = React.useState({
        email: '',
        password: ''
    });

    const handleChangeIn = name => event => {
        setSignin({ ...signinInputs, [name]: event.target.value });
    };
    const handleChangeUp = name => event => {
        setSignup({ ...signupInputs, [name]: event.target.value });
    };

    function signin() {
        firebase.doSignInWithGoogle().then(authUser => {
            setUser(authUser.user);
        }).catch(error => {
            console.log(error);
        });
    };

    function signinEmail(email,pass) {
        firebase.doSignInWithEmailAndPassword(email,pass).then(authUser => {
            setUser(authUser.user);
        }).catch(error => {
            console.log(error);
        });
    };

    function signup(email,pass) {
        firebase.doCreateUserWithEmailAndPassword(email,pass).then(authUser => {
            setUser(authUser.user);
        }).catch(error => {
            console.log(error);
        });
    };

    function signout() {
        firebase.doSignOut()
    };

    useEffect(() => {
        firebase.auth.onAuthStateChanged(authUser => {
            authUser
                ? setUser(authUser)
                : setUser(null);
        });
    }, [firebase.auth])

    useEffect(() => {
        userData.updateUser({authUser: user });
    }, [user, userData])

    const googleLogin = <GoogleButton type="light" onClick={signin} />;

    const loginFields = (
        <div id="loginFields">
        <p>Sign In for Snacks</p>
        <TextField
        required
        fullWidth
        id="email"
        label="Email address"
        className="textfields"
        onChange={handleChangeIn('email')}
        margin="normal"
      />
        <TextField
        required
        fullWidth
        id="password"
        label="Password"
        type="password"
        autoComplete="current-password"
        className="textfields"
        onChange={handleChangeIn('password')}
        margin="normal"
      />
      <Button variant="contained" onClick={() => signinEmail(signinInputs.email,signinInputs.password)}>Sign In</Button>
      <p>or</p>
      {googleLogin}
      </div>
    )

    const signupFields = (
        <div id="signupFields">
        <p>Create an Account</p>
        <TextField
        required
        fullWidth
        id="signupEmail"
        label="Email address"
        className="textfields"
        onChange={handleChangeUp('email')}
        margin="normal"
      />
        <TextField
        required
        fullWidth
        id="signupPassword"
        label="Password"
        type="password"
        autoComplete="current-password"
        className="textfields"
        onChange={handleChangeUp('password')}
        margin="normal"
      />
      <Button variant="contained" onClick={() => signup(signupInputs.email,signupInputs.password)}>Sign Up</Button>
      <p>or</p>
      {googleLogin}
      </div>
    )

    const fields = (
        <div id="fields">
        {
            newUser
                ? signupFields
                : loginFields
        }
        {
            newUser
                ? <Button onClick={() => createUser(false)}>Already have an account?</Button>
                : <Button onClick={() => createUser(true)}>Need to create an account?</Button>
        }

        </div>
    )

    return (<div className="login">
        <div className="signin">

            {
                user
                    ? <Button onClick={signout}>Logout</Button>
                    : fields
            }

        </div>
    </div>);
}

export default Login;
