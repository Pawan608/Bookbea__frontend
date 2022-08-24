import "./options.css";
import React, { useState, useEffect } from "react";
import Modal from "./../components/Modal";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
const Options = ({ user }) => {
  const navigate = useNavigate();
  const [optionActive, setOptionACtive] = useState("");
  console.log(window.location.href);
  const url = window.location.href.split("/");
  const endPoint = url[url.length - 1];
  useEffect(() => {
    setOptionACtive(endPoint);
  }, []);

  const handleOptions = (e) => {
    if (e.target.closest(".option__element")) {
      const classActive = e.target
        .closest(".option__element")
        .className.split(" ")[0];
      setOptionACtive(classActive);
      if (classActive == "options") {
        return navigate(`/${classActive}`);
      }
      navigate(`/options/${classActive}`);
    }
  };
  console.log(typeof optionActive);
  return (
    <>
      <ul className="options__container" onClick={handleOptions}>
        <li
          className={
            optionActive === "options"
              ? "options option__element option__active"
              : "options option__element"
          }
        >
          My Book
        </li>
        <li
          className={
            optionActive == "option__request"
              ? "option__request option__element option__active"
              : "option__request option__element"
          }
        >
          Request
        </li>
        <li
          className={
            optionActive == "option__shared"
              ? "option__shared option__element option__active"
              : "option__shared option__element"
          }
        >
          Shared
        </li>
        <li
          className={
            optionActive == "option__borrowd"
              ? "option__borrowd option__element option__active"
              : "option__borrowd option__element"
          }
        >
          Borrowed
        </li>
      </ul>
      <Outlet />
    </>
  );
};
export default Options;
