import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";
const MessageButton = ({ user }) => {
  const [cookies, setCookie] = useCookies(["username"]);
  const [topChat, setTopChat] = useState("");
  const [checkChat, setCheckChat] = useState("");
  useEffect(() => {
    const getBooks = async () => {
      const promise = await fetch(
        `http://127.0.0.1:4000/api/v1/messages/${user._id}`,
        {
          method: "GET",
          headers: { Authorization: "Bearer " + cookies.user },
        }
      );
      const res = await promise.json();
      console.log(res);
      if (res.status == "success") {
        const receiver = res.data.connectedWith;
        console.log("hello");
        console.log(res.data.connectedWith.length);

        if (res.data.connectedWith.length) {
          setTopChat(receiver[0]._id);
          setCheckChat(true);
        } else setCheckChat(false);
      }
    };
    if (user._id) getBooks();
  }, [user]);
  console.log("checkchat", checkChat);
  if (topChat) {
    return <Navigate to={`/chat/${topChat}`} />;
  }
  if (checkChat === false) {
    alert("Seems like you didn't chat with anyone");
    return <Navigate to={`/`} />;
  }
};
export default MessageButton;
