import "./Bookshelf.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Searchicon from "./../public/img/search_icon";
import Modal from "./../components/Modal";
import Message_icon from "../public/img/message_icon";
const Bookshelf = ({ user, setUser }) => {
  const [response, setResponse] = useState(null);
  const [showModal, setShowModal] = useState(true);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies("username");
  useEffect(() => {
    const getBooks = async () => {
      const promise = await fetch(`http://127.0.0.1:4000/api/v1/book`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const response = await promise.json();
      setResponse(response);
    };
    getBooks();
  }, []);
  const handleOptions = (e) => {
    e.preventDefault();
    if (!user) return;
    navigate("/options");
  };
  const addBook = () => {
    navigate("/addbook");
  };
  const handleRequest = async (id) => {
    const res = await fetch(`http://127.0.0.1:4000/api/v1/request/${id}`, {
      method: "POST",
      headers: { Authorization: "Bearer " + cookies.user },
    });
    const response = await res.json();
    setCookie("userData", JSON.stringify(response.data.user));
    setUser(response.data.user);

    if (response.status == "success") {
      alert(response.status);
    }
  };

  return (
    <>
      <div className="BookShelf__model"></div>
      <div className="container__bookshelf">
        <div className="top_Bar">
          <input
            type="text"
            className="search"
            id="search"
            placeholder="Search book by Title or Author Name"
          />
          <label htmlFor="search" className="search__label">
            <Searchicon />
          </label>
          {user && (
            <button className="add__options" onClick={handleOptions}>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
            </button>
          )}
        </div>

        <div className="heading">
          <h3 className="heading__bookshelf">BookShelf</h3>
          {user && (
            // <div className="message__icon__bar">
            <Message_icon />
            // </div>
          )}
          {user && (
            <button className="add__book" onClick={addBook}>
              +
            </button>
          )}
        </div>
        <div className="cards">
          {response &&
            response.data.books.map((el) => {
              return (
                <div className="card__book">
                  <div className="book__picture">
                    <img src={el.coverImage} alt="" className="" />
                  </div>
                  <h3 className="book__title">Title: {el.title}</h3>
                  <div className="book__info">
                    <div className="author__name">Author: {el.authorName}</div>
                    <div className="edition">
                      Edition: {el.edition || "1st"}
                    </div>
                  </div>
                  <div className="bookshelf__button__Section">
                    {user &&
                    user._id &&
                    String(el.author) !== String(user._id) ? (
                      user.borrowRequest.includes(el._id) ? (
                        <button className="btn__borrow btn__borrow_inactive ">
                          Request Sent
                        </button>
                      ) : (
                        <button
                          className="btn__borrow"
                          onClick={() => {
                            handleRequest(el._id);
                          }}
                        >
                          Request
                        </button>
                      )
                    ) : (
                      <></>
                    )}
                    {user?.admin == true && (
                      <button className="btn__borrow ">Delete</button>
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};
export default Bookshelf;
