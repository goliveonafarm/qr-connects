import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Login from "./Login";
import SignUp from "./SignUp";
import useClickOutside from "../hooks/useClickOutside";
import { set } from "mongoose";
import { useAuthContext } from "../context/AuthContext";
import useLogout from "../hooks/useLogout";

const Navbar = () => {
  const { authUser } = useAuthContext();
  const { loadingState, logout } = useLogout();

  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const authModalRef = useRef(null);

  const clearAuthModals = () => {
    setShowLogin(false);
    setShowSignup(false);
  };

  const showLoginCB = () => {
    setShowLogin(true);
    setShowSignup(false);
  };

  const showSignupCB = () => {
    setShowSignup(true);
    setShowLogin(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      clearAuthModals();
    }
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  useClickOutside(authModalRef, clearAuthModals);

  return (
    <div className="relative w-full" onKeyDown={(e) => handleKeyDown(e)}>
      <div className="navbar bg-base-200">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">
            QR-Connects
          </Link>

          {authUser && (
            <div className="flex-none">
              <ul className="menu menu-horizontal px-1">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/connects">Connects</Link>
                </li>
              </ul>
            </div>
          )}
        </div>

        {!authUser && (
          <div>
            <div className="pr-1">
              <button
                className="btn btn-xs btn-outline btn-secondary"
                onClick={showLoginCB}
              >
                Login
              </button>
            </div>
            <button
              className="btn btn-xs btn-outline btn-accent"
              onClick={showSignupCB}
            >
              Sign Up
            </button>
          </div>
        )}
        {authUser && (
          <div>
            <div className="pr-5">@{authUser.username}</div>
            <button
              className="btn btn-xs btn-outline btn-accent"
              onClick={async () => {
                await logout();
              }}
            >
              Logout
            </button>
          </div>
        )}
      </div>
      <div className="absolute top-0 right-5 mt-10" ref={authModalRef}>
        {showLogin && (
          <Login
            setShowLogin={setShowLogin}
            showSignupCB={showSignupCB}
            clear={clearAuthModals}
          />
        )}
        {showSignup && (
          <SignUp
            setShowSignup={setShowSignup}
            showLoginCB={showLoginCB}
            clear={clearAuthModals}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
