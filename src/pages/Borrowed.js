import "./Borrowed.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
const Borrowed = ({ user }) => {
  const [response, setResponse] = useState(null);
  const [cookies] = useCookies("username");
  const navigate = useNavigate();
  useEffect(() => {
    const getBooks = async () => {
      const promise = await fetch(
        `http://127.0.0.1:4000/api/v1/request/getborrowedbooks`,
        {
          method: "GET",
          headers: { Authorization: "Bearer " + cookies.user },
        }
      );
      const res = await promise.json();
      if (res.data) {
        console.log(res);
        const response = res.data;
        setResponse(response);
      }
    };
    getBooks();
  }, []);
  console.log(response);
  const handleChat = (e) => {
    const AuthorId = e.target.getAttribute("data-author");
    navigate(`/chat/${AuthorId}/`);
  };
  return (
    <>
      <div className="options__card__container">
        <div className="options__cards">
          {response && response.books.length ? (
            response.books.map((el) => {
              return (
                <div className="card__book" key={el.book._id}>
                  <div className="book__picture">
                    <img src={el.book.coverImage} alt="" className="" />
                  </div>
                  <h3 className="book__title">Title: {el.book.title}</h3>
                  <div className="book__info">
                    <div className="author__name">
                      Author: {el.book.authorName}
                    </div>
                    <div className="edition">
                      Edition: {el.book.edition || "1st"}
                    </div>
                  </div>
                  <div className="bookshelf__button__Section">
                    <button className="btn__borrow" onClick={() => {}}>
                      <a href={el.bookId.file} target="_blank" className="">
                        View Book
                      </a>
                    </button>
                    {user &&
                      user._id &&
                      String(el.author) !== String(user._id) && (
                        <button
                          className="btn__borrow"
                          style={{ width: "45%" }}
                          data-author={el.book.author}
                          onClick={handleChat}
                        >
                          Chat
                        </button>
                      )}
                  </div>
                </div>
              );
            })
          ) : (
            <h3 className="options__alert__heading">
              You have not Borrowed book
            </h3>
          )}
        </div>
      </div>
    </>
  );
};
export default Borrowed;
