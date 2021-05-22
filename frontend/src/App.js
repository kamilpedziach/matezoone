import React, { useContext } from "react";
import "./App.css";
import Home from "./pages/Home/Home";
import Profile from "./pages/profile/Profile.jsx";
import Login from "./pages/login/Login.jsx";
import Register from "./pages/register/Register.jsx";
import Messenger from "./pages/messenger/Messenger.jsx";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
const App = () => {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {user ? <Home /> : <Register />}
        </Route>
        <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
        <Route path="/register">
          {user ? <Redirect to="/" /> : <Register />}
        </Route>
        <Route path="/messenger">
          {!user ? <Redirect to="/" /> : <Messenger />}
        </Route>
        <Route path="/profile/:id">
          <Profile />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
