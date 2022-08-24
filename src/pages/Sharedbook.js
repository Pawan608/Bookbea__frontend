import "./Sharedbook.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
const Sharedbook = ({ user }) => {
  const [response, setResponse] = useState(null);
  const [cookies] = useCookies("username");

  useEffect(() => {
    const getBooks = async () => {
      const promise = await fetch(
        `http://127.0.0.1:4000/api/v1/request/getSharedBooks`,
        {
          method: "GET",
          headers: { Authorization: "Bearer " + cookies.user },
        }
      );
      const res = await promise.json();
      if (res.data) {
        console.log(res);
        const response = res.data;
        console.log(response.books);
        setResponse(response);
      }
    };
    getBooks();
  }, []);
  console.log(response);

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
                </div>
              );
            })
          ) : (
            <h3 className="options__alert__heading">
              You have not shared any book
            </h3>
          )}
        </div>
      </div>
    </>
  );
};
export default Sharedbook;
