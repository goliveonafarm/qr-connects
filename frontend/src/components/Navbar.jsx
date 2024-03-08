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
    <div
      className="relative w-full flex flex-wrap items-center"
      onKeyDown={(e) => handleKeyDown(e)}
    >
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
        <div className="flex-none md:hidden">
          {" "}
          {/* Show this button on small screens */}
          <button className="btn btn-square btn-ghost">
            {/* Icon for menu toggle, e.g., hamburger icon */}
            VAL
          </button>
        </div>
        <div className="flex md:items-center md:space-x-2">
          {" "}
          {/* Hide on small screens, show on medium and up */}
          {!authUser ? (
            <>
              <button
                className="btn btn-xs btn-outline btn-secondary"
                onClick={showLoginCB}
              >
                Login
              </button>
              <button
                className="btn btn-xs btn-outline btn-accent"
                onClick={showSignupCB}
              >
                Sign Up
              </button>
            </>
          ) : (
            //revisit this later - make this whole section hidden on md for accordian above
            <>
              <span className="hidden md:flex pr-5">@{authUser.username}</span>
              <button
                className="btn btn-xs btn-outline btn-accent"
                onClick={async () => await logout()}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
      <div className="absolute top-0 right-5 mt-10" ref={authModalRef}>
        <div>
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
    </div>
  );
};

export default Navbar;
