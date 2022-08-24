import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useCookies } from "react-cookie";
import "./Navbar.css";
function Navbar({ user, setUser }) {
  const [cookies, removeCookie, setCookie] = useCookies("user");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    navigate("/login");
  };
  const handleLogout = (e) => {
    removeCookie("user");
    removeCookie("userData");
    setUser("");
    navigate("/login");
  };
  const handleBookshelf = (e) => {
    window.location.assign("/");
  };
  return (
    <>
      <div className="container">
        <div className="container__icon">
          <div className="main__icon" onClick={handleBookshelf}>
            BookBea
          </div>
          <div className="tagline">Your Neighborhood book club</div>
        </div>
        <div className="container__info">
          {user ? (
            <div className="logout" onClick={handleLogout}>
              Logout
            </div>
          ) : (
            <div className="logout" onClick={handleLogin}>
              LogIn
            </div>
          )}
          {user && (
            <div className="userName">
              Hello, {user._id && user.name.split(" ")[0]}
            </div>
          )}
        </div>
      </div>
      <Outlet></Outlet>
    </>
  );
}
export default Navbar;
