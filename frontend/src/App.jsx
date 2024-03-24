import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/home/Home";
import Loading from "./pages/loading/Loading";
import NotFound from "./pages/not-found/NotFound";
import CurrentUserEvents from "./pages/currentUserEvents/CurrentUserEvents";
import { Route, Routes, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";

function App() {
  const { authUser } = useAuthContext();
  return (
    <div className="p-4 h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/loading/:eventId?" element={<Loading />}></Route>
        <Route
          path="/connects"
          element={
            authUser ? <CurrentUserEvents /> : <Navigate replace to="/" />
          }
        ></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
