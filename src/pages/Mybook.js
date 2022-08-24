import "./Mybook.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
const Mybook = ({ user }) => {
  const [response, setResponse] = useState(null);
  const [cookies] = useCookies("username");
  useEffect(() => {
    const getBooks = async () => {
      const promise = await fetch(
        `http://127.0.0.1:4000/api/v1/book/getmybook`,
        {
          method: "GET",
          headers: { Authorization: "Bearer " + cookies.user },
        }
      );
      const res = await promise.json();
      const response = res.data.books[0];
      setResponse(response);
    };
    getBooks();
  }, []);
  console.log(response);
  return (
    <>
      <div className="options__card__container">
        <div className="options__cards">
          {response && response.myBook.length ? (
            response.myBook.map((el) => {
              return (
                <div className="card__book" key={el._id}>
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

                  <button className="btn__borrow" onClick={() => {}}>
                    <a href={el.file} target="_blank" className="">
                      View Book
                    </a>
                  </button>
                </div>
              );
            })
          ) : (
            <h3 className="options__alert__heading">
              You have not added any book
            </h3>
          )}
        </div>
      </div>
    </>
  );
};
export default Mybook;
