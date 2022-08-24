import "./Message_icon.css";
import { useNavigate } from "react-router-dom";
const Message_icon = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/chat");
  };
  return (
    <>
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        className="message__icon"
        style={{
          marginLeft: "auto",
          marginRight: "2rem",
          width: "2.5rem",
          height: "2.5rem",
          fill: "rgb(13, 114, 151)",
          cursor: "pointer",
        }}
        onClick={handleClick}
      >
        <title>message</title>
        <path d="M18 6v7c0 1.1-0.9 2-2 2h-4v3l-4-3h-4c-1.101 0-2-0.9-2-2v-7c0-1.1 0.899-2 2-2h12c1.1 0 2 0.9 2 2z"></path>
      </svg>
    </>
  );
};
export default Message_icon;
