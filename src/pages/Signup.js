import "./Signup.css";
import "./Form.css";
import Modal from "./../components/Modal";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setCnfrmPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    let promise = await fetch(`http://127.0.0.1:4000/api/v1/users/signup`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "access-control-allow-origin": "*",
      },
      body: JSON.stringify({
        email: username,
        name: name,
        password: password,
        confirmPassword: confirmPassword,
      }),
    });
    const response = await promise.json();
    if (response.status === "success") {
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
    console.log(response);
    setMessage(response.message);
    setShowModal(true);
    setTimeout(() => {
      setShowModal(false);
    }, 3000);
  };

  return (
    <>
      <div className="signup__container">
        {showModal && <Modal message={message} />}
        <div className="signup__box">
          <div className="signup__container__heading">Signup</div>
          <form className="form" onSubmit={handleSubmit}>
            <div className="form__group">
              <input
                type="text"
                className="form__input"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                required
              />
            </div>
            <div className="form__group">
              <input
                type="email"
                className="form__input"
                id="username"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="UserName"
                required
              />
            </div>
            <div className="form__group">
              <input
                type="password"
                className="form__input"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
            </div>
            <div className="form__group">
              <input
                type="password"
                className="form__input"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setCnfrmPassword(e.target.value)}
                placeholder="Confirm Password"
                required
              />
            </div>
            <button type="submit" className="btn" onClick={handleSubmit}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
export default Signup;
