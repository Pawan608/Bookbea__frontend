import "./Chatbox.css";
// import io from "socket.io-client";
// import { SocketContext } from "./../context/socket";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { useCookies } from "react-cookie";
import { socket } from "./../context/socket";
const Chatbox = ({ user }) => {
  // console.log(value);
  // const socket = value;
  const { receiverId: clientId } = useParams();
  const [receiverId, setreceiverId] = useState("");
  const [room, setRoom] = useState("");
  const [currentRoom, setCurrentRoom] = useState("");
  const [response, setResponse] = useState([]);
  const [cookies] = useCookies("username");
  const [reciever, setReciever] = useState(true);
  const [messages, setMessages] = useState([]);
  const [messageNav, setMessageNav] = useState({});
  const [finalMessageNav, setFinalMessageNav] = useState({});
  const navigate = useNavigate();
  //   console.log("loda", clientId);
  //   const [viewId, setViewId] = useState("");
  // const socket = useContext(SocketContext);
  // console.log("userrr", user);
  useEffect(() => {
    if (clientId);
    setreceiverId(clientId);
    if (receiverId) setRoom([receiverId, user._id].sort().join("-"));
  }, [receiverId]);
  useEffect(() => {
    if (room && room !== currentRoom) {
      /////////////////Removing previous chats////////////////////////////
      // console.log("socket", socket);
      socket.emit("joinRoom", {
        id: user._id,
        room,
        receiverId,
      });
      setCurrentRoom(room);
    }
    socket.on("joinRoom", ({ receiverId, receiverName }) => {
      setMessageNav({ name: receiverName, id: receiverId });
      // console.log("lo", receiverId, receiverName);
    });
  }, [room]);
  const handleSend = () => {
    const message = document.querySelector(".chatbox__text__input").value;
    socket.emit("message", {
      message,
      id: user._id,
      receiverId,
      room,
      userName: user.name,
    });
    document.querySelector(".chatbox__text__input").value = "";
    document.querySelector(".chatbox__text__input").focus();
  };
  useEffect(() => {
    if (!reciever) {
      socket.on("message", ({ message, id }) => {
        const message__container = document.querySelector(
          ".chatbox__message__section"
        );
        const new__message = document.createElement("div");
        new__message.classList.add("chatbox__your__message");
        new__message.innerText = `${message}`;
        const html =
          user._id == id
            ? '<span class="chatbox__your__message__sent">Sent</span>'
            : '<span class="chatbox__your__message__sent">Received</span>';
        new__message.insertAdjacentHTML("beforeend", html);
        message__container.insertAdjacentElement("beforeend", new__message);
        new__message.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      });
    }
    setReciever(false);
  }, [reciever]);
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
      // console.log("messages", res.data.connectedWith);
      if (res.status == "success") setResponse(res.data.connectedWith);
    };
    if (user._id) getBooks();
  }, [user._id]);
  useEffect(() => {
    // console.log("response length", response.length);
    if (response.length) {
      const messages = response.find((el) => {
        // console.log(el._id, receiverId);
        return el._id == receiverId; ////receiverId
      });

      // console.log(messages);
      setMessages(messages);
    }
  }, [response, receiverId]);

  const handleReceiverId = (e) => {
    const receiveId = e.target.getAttribute("data-id");
    const receiverName = e.target.getAttribute("data-name");
    setreceiverId(receiveId);
    setMessageNav({ name: receiverName, id: receiveId });
    navigate(`/chat/${receiveId}`);
  };
  // console.log("let's check", cookies.userData._id, messageNav.id);
  useEffect(() => {
    if (messageNav.id !== cookies.userData._id) setFinalMessageNav(messageNav);
  }, [messageNav]);
  return (
    <>
      <div className="chat__container">
        <div className="chat__container__box">
          <div className="chatbox__list">
            {response &&
              response.length &&
              response.map((el) => {
                return (
                  <>
                    {" "}
                    <li
                      className="chatbox__member"
                      data-id={el._id}
                      onClick={handleReceiverId}
                      data-name={el.recepientName}
                    >
                      {el.recepientName}
                    </li>
                  </>
                );
              })}
          </div>
          <div className="chatbox__message">
            <div
              className="chatbox__message__profile"
              data-id={finalMessageNav.id}
            >
              {finalMessageNav.name}
            </div>
            <div className="chatbox__message__text">
              <div className="chatbox__message__section">
                {messages &&
                  messages._id &&
                  messages.messages.map((el) => {
                    return (
                      <>
                        <div className="chatbox__your__message">
                          {el.message}
                          <span className="chatbox__your__message__sent">
                            {el.path}
                          </span>
                        </div>
                      </>
                    );
                  })}
              </div>
              <div className="chatbox__text__section">
                <textarea
                  type="text"
                  className="chatbox__text__input"
                  placeholder="Write your text here!!"
                />
                <button className="chatbox__send__button" onClick={handleSend}>
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Chatbox;
