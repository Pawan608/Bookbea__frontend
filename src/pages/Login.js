import "./Login.css";
import "./Form.css";
import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import Modal from "./../components/Modal";
import { useNavigate } from "react-router-dom";
const Login = ({ setUser, user }) => {
  const [username, setName] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie] = useCookies("username");
  //   const [usercookies, setUserCookie] = useCookies("user");
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (user && user.id) {
      navigate("/");
    }
  }, [user]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(username, password);
    let promise = await fetch(`http://127.0.0.1:4000/api/v1/users/login`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "access-control-allow-origin": "*",
      },
      body: JSON.stringify({ email: username, password: password }),
    });

    const response = await promise.json();
    if (response.token) {
      setCookie("user", response.token);
      // cookies.user = response.token;
      setUser(response.data.user);
      setCookie("userData", JSON.stringify(response.data.user));
      // cookies.userData = JSON.stringify(response.data.user);
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
    setMessage(response.message);
    setShowModal(true);
    setTimeout(() => {
      setShowModal(false);
    }, 3000);
  };
  function handleSignUp() {
    navigate("/signup");
  }
  return (
    <>
      <div className="login__container">
        {showModal && <Modal message={message} />}
        <div className="login__box">
          <div className="login__container__heading">Login</div>
          <form className="form" onSubmit={handleSubmit}>
            <div className="form__group">
              <input
                type="email"
                className="form__input"
                id="username"
                value={username}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <label htmlFor="username" className="">
                Username
              </label>
            </div>
            <div className="form__group">
              <input
                type="password"
                className="form__input"
                id="password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="password" className="">
                Password
              </label>
            </div>
            <button type="submit" className="btn btn__login">
              Submit
            </button>
          </form>
          <div className="register" onClick={handleSignUp}>
            Not a user! SignUp?
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
