import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/home/Home";
import CurrentUserEvents from "./pages/currentUserEvents/CurrentUserEvents";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";

function App() {
  const { authUser } = useAuthContext();
  return (
    <div className="p-4 h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route
          path="/connects"
          element={authUser ? <CurrentUserEvents /> : <Home />}
        ></Route>
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
