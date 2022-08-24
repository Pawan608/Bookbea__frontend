import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import Navbar from "./components/Navbar";
import Bookshelf from "./pages/Bookshelf";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Addbook from "./pages/Addbook";
import Options from "./pages/options";
import Sharedbook from "./pages/Sharedbook";
import Mybook from "./pages/Mybook";
import Borrowed from "./pages/Borrowed";
import Request from "./pages/Request";
import Chatbox from "./pages/Chatbox";
// import { socket, SocketContext } from "./context/socket";
import MessageButton from "./components/MessageButton";

function App() {
  const [user, setUser] = useState("");
  const [cookies, setCookie] = useCookies("username");

  useEffect(() => {
    setUser(cookies.userData);
  }, []);
  // console.log(socket);
  return (
    <>
      {/* <SocketContext.Provider value={socket}> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar user={user} setUser={setUser} />}>
            <Route
              index
              element={<Bookshelf user={user} setUser={setUser} />}
            />
            <Route
              path="/login"
              element={<Login setUser={setUser} user={user} />}
            />
            <Route path="/signup" element={<Signup />} />
            <Route path="/addbook" element={<Addbook user={user} />} />
            <Route path="/chat/" element={<MessageButton user={user} />} />
            <Route path="/chat/:receiverId" element={<Chatbox user={user} />} />
            <Route path="/options" element={<Options user={user} />}>
              <Route index element={<Mybook user={user} setUser={setUser} />} />
              <Route
                path="/options/option__shared"
                element={<Sharedbook user={user} setUser={setUser} />}
              />
              <Route
                path="/options/option__borrowd"
                element={<Borrowed user={user} setUser={setUser} />}
              />
              <Route
                path="/options/option__request"
                element={<Request user={user} setUser={setUser} />}
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
      {/* </SocketContext.Provider> */}
    </>
  );
}
export default App;
