import React, { useContext } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import UserContext from "./UserContext";
import { FirebaseContext } from "./Firebase";

function Header(props) {
  const firebase = useContext(FirebaseContext);
  const userData = useContext(UserContext);

  let navLinks = (
    <ul className="nav__ul nav-links">
      <li>
        <Link to="/login">
          <Button>Login</Button>
        </Link>
      </li>
    </ul>
  );

  function signout() {
    firebase.doSignOut();
  }
  let login = false;

  if (props.login) {
    login = JSON.parse(props.login);
  }

  if (userData.admin) {
    navLinks = (
      <ul className="nav__ul nav-links">
        <li className="nav__li">
          <Button>
            <Link to="/" className="nav__link">
              Dashboard
            </Link>
          </Button>
        </li>
        <li className="nav__li">
          <Button>
            <Link to="/profile" className="nav__link">
              Profile
            </Link>
          </Button>
        </li>
        <li className="nav__li">
          <Button>
            <Link to="/admin" className="nav__link">
              Admin
            </Link>
          </Button>
        </li>
        <li className="nav__li">
          <Button>
            <Link to="/" className="nav__link">
              Users
            </Link>
          </Button>
        </li>
        <li>
          <Button onClick={signout}>Logout</Button>
        </li>
      </ul>
    );
  } else if (userData.uid) {
    navLinks = (
      <ul className="nav__ul nav-links">
        <li className="nav__li">
          <Button>
            <Link to="/" className="nav__link">
              Dashboard
            </Link>
          </Button>
        </li>
        <li className="nav__li">
          <Button>
            <Link to="/profile" className="nav__link">
              Profile
            </Link>
          </Button>
        </li>
        <li>
          <Button onClick={signout}>Logout</Button>
        </li>
      </ul>
    );
  }

  if (props.big) {
    return (
      <header className="App-header big-header">
        <div id="site-nav">
          <Link to="/">
            <h1>Snakr - The Snack Solution</h1>
          </Link>
          {login ? "" : <Link to="/login">Login</Link>}
        </div>
        <div id="big-header"></div>
      </header>
    );
  } else {
    return (
      <header className="App-header">
        <div id="desktop">
          <Link to="/">
            <h1>Snakr - The Snack Solution</h1>
          </Link>
          <nav>{navLinks}</nav>
        </div>
        <div id="mobile">
          <input type="checkbox" id="nav-checkbox" />
          <label htmlFor="nav-checkbox" className="checkbox-label">
            <span className="menu-line"></span>
          </label>
          <nav className="nav">
            <h1 className="nav__title" id="title">
              Snakr
            </h1>

            {navLinks}
            <p className="nav__copyright">Created by Alyssa Davis</p>
          </nav>
        </div>
      </header>
    );
  }
}

export default Header;
