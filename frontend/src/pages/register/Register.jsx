import React, { useRef } from "react";
import "./register.css";
import { Email, Lock, AccountBox } from "@material-ui/icons";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
const Register = () => {
  const username = useRef("");
  const email = useRef("");
  const password = useRef("");
  const confirmPassword = useRef("");
  const history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.current.value !== confirmPassword.current.value) {
      confirmPassword.current.setCustomValidity(`Passwords don't match`);
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post("http://localhost:5000/api/auth/register", user);
        alert("Zarejestrowano pomyślnie");
        history.push("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <div className="register">
      <div className="registerWrapper">
        <div className="registerLeftImage">
          <img src="assets/matezone.jpg" alt="" className="loginlogoIMG" />
        </div>
        <div className="registerLeft">
          <h3 className="registerLogo">Matezone</h3>
          <span className="registerDesc">
            Make an account and join to your friends!
          </span>
        </div>
        <div className="registerRight">
          <form className="registerBox" onSubmit={handleSubmit}>
            <div className="IconwithInput">
              <AccountBox className="svgImage" />
              <input
                placeholder="username..."
                className="registerInput"
                type="text"
                required
                minLength="3"
                ref={username}
              />
            </div>
            <div className="IconwithInput">
              <Email className="svgImage" />
              <input
                placeholder="email..."
                className="registerInput"
                required
                minLength="6"
                type="email"
                ref={email}
              />
            </div>
            <div className="IconwithInput">
              <Lock className="svgImage" />
              <input
                placeholder="password..."
                className="registerInput"
                required
                minLength="6"
                type="password"
                ref={password}
              />
            </div>
            <div className="IconwithInput">
              <Lock className="svgImage" />
              <input
                placeholder="confrirm password..."
                className="registerInput"
                required
                minLength="6"
                type="password"
                ref={confirmPassword}
              />
            </div>
            <div className="registerBoxBottom">
              <button className="registerButton" type="submit">
                Sign up
              </button>
            </div>
            <div className="link">
              already have an account?
              <Link to="/login" className="aLinkregister">
                Log In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
