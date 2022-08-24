import "./Addbook.css";
import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import Modal from "./../components/Modal";
const Addbook = ({ user }) => {
  const [file, setFile] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [authorname, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [edition, setEdition] = useState("");
  const [cookies] = useCookies("username");
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(false);
  useEffect(() => {
    if (showModal) {
      setTimeout(() => {
        setShowModal(false);
      }, 3000);
    }
  }, [showModal]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage("Wait for few seconds after uploading PDF file");
      setShowModal(true);
    }
    setMessage("It may Take a few moment");
    setShowModal(true);
    const form = new FormData();
    const images = document.querySelector(".coverImage");
    form.append(`coverImage`, images.files[0]);
    form.append("file", file);
    form.append("authorName", authorname);
    form.append("description", description);
    form.append("title", title);
    const res = await fetch(`http://127.0.0.1:4000/api/v1/book`, {
      method: "POST",
      headers: { Authorization: "Bearer " + cookies.user },
      body: form,
    });
    const Data = await res.json();
    if (Data.status === "success") setStatus(true);
    setMessage(Data.message);
    setShowModal(true);
  };
  const handleFileSubmission = async (e) => {
    const file = e.target.files[0];
    const fd = new FormData();
    fd.append("file", file);

    const res = await fetch(`http://127.0.0.1:4000/api/v1/book/file`, {
      method: "POST",
      headers: { Authorization: "Bearer " + cookies.user },
      body: fd,
    });
    const Data = await res.json();
    if (Data.status === "success") {
      console.log(Data.data);
      setFile(Data.data.url);
    }
  };
  return (
    <>
      <div className="addbook__container">
        {showModal && <Modal message={message} />}
        <div className="addbook__box">
          <div className="addbook__container__heading">ADD BOOK</div>
          <form className="form" onSubmit={handleSubmit}>
            <div className="form__group">
              <input
                type="text"
                className="form__input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="Title"
              />
            </div>
            <div className="form__group">
              <input
                type="text"
                className="form__input"
                value={authorname}
                onChange={(e) => setAuthor(e.target.value)}
                required
                placeholder="Author Name"
              />
            </div>
            <div className="form__group">
              <input
                type="text"
                className="form__input"
                value={edition}
                onChange={(e) => setEdition(e.target.value)}
                placeholder="Edition"
              />
            </div>
            <div className="form__group">
              <input
                type="text"
                className="form__input"
                value={description}
                required
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
              />
            </div>
            <div className="form__group">
              <input
                type="file"
                className="coverImage"
                required
                id="image"
                accept="image/*"
                name="Cover Image"
              />
              <label htmlFor="image" className="">
                Upload Image
              </label>
            </div>
            <div className="form__group">
              <input
                type="file"
                accept=".pdf"
                className=""
                required
                id="file"
                name="Book File"
                placeholder="Book File"
                onChange={handleFileSubmission}
              />
              <label htmlFor="file" className="">
                Upload Book Pdf
              </label>
            </div>

            <button type="submit" className="btn">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
export default Addbook;
