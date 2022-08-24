import "./Request.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
const Request = ({ user }) => {
  const [response, setResponse] = useState(null);
  const [cookies] = useCookies("username");
  useEffect(() => {
    const getBooks = async () => {
      const promise = await fetch(
        `http://127.0.0.1:4000/api/v1/request/getIncomingRequest`,
        {
          method: "GET",
          headers: { Authorization: "Bearer " + cookies.user },
        }
      );
      const res = await promise.json();
      const response = res.data.user.incomingRequest;
      setResponse(response);
    };
    getBooks();
  }, []);
  const handleRequest = async (status, id) => {
    const promise = await fetch(
      `http://127.0.0.1:4000/api/v1/request/${id}/${status}`,
      {
        method: "POST",
        headers: { Authorization: "Bearer " + cookies.user },
      }
    );
    const res = await promise.json();
    if (res.status == "success") {
      alert(res.message);
      window.location.assign("/options/option__request");
    }
    alert(res.message);
  };
  console.log(response);
  return (
    <>
      <div className="options__card__container">
        <div className="options__cards__request">
          {response && response.length ? (
            response.map((el) => {
              return (
                <div className="card__book" key={el.book._id}>
                  <div className="book__picture">
                    <img
                      className="request__image"
                      src={el.book.coverImage}
                      alt=""
                      className=""
                    />
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
                  <div className="requestedBy">
                    <h3 className="requestedBy__heading">Requested By</h3>
                    <div className="requestedBy__name">
                      Name: {` ${el.requestedBy.name}`}
                    </div>
                    <div className="requestedBy__email">
                      Email:{` ${el.requestedBy.email}`}
                    </div>
                  </div>
                  <div className="request__button">
                    <button
                      className="btn__borrow request__btn"
                      onClick={() => {
                        handleRequest(true, el._id);
                      }}
                    >
                      {el.status ? "Approved" : "Approve"}
                    </button>
                    <button
                      className="btn__borrow"
                      onClick={() => {
                        handleRequest(false, el._id);
                      }}
                    >
                      Decline
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <h3 className="options__alert__heading">No Current Request</h3>
          )}
        </div>
      </div>
    </>
  );
};
export default Request;
