import React, { useRef, useContext } from "react";
import "./login.css";
import { Email, Lock } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";

const Login = () => {
  const email = useRef();
  const password = useRef();
  const { isFetching, dispatch } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeftImage">
          <img
            src="http://localhost:3000/assets/matezone.jpg"
            alt=""
            className="loginlogoIMG"
          />
        </div>
        <div className="loginLeft">
          <h3 className="loginLogo">Matezone</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Matezoone
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleSubmit}>
            <div className="IconwithInput">
              <Email className="svgImage" />
              <input
                placeholder="email..."
                className="loginInput"
                type="email"
                minLength="6"
                required
                ref={email}
              />
            </div>
            <div className="IconwithInput">
              <Lock className="svgImage" />
              <input
                placeholder="password..."
                className="loginInput"
                type="password"
                required
                minLength="6"
                ref={password}
              />
            </div>
            <div className="loginBoxBottom">
              <button
                type="submit"
                className="loginButton"
                disabled={isFetching}
              >
                {isFetching ? (
                  <CircularProgress className="CircularProgress" size="20px" />
                ) : (
                  "Log In"
                )}
              </button>
            </div>
          </form>
          <div className="link">
            <Link to="/register" className="aLinkLogin">
              Forgot password?
            </Link>
            or
            <Link to="/register" className="aLinkLogin">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
