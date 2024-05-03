import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

const Login = ({ showSignupCB, clear }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { loading, login } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username, password).then((res) => {
      if (res.success) {
        clear();
      }
    });
  };

  return (
    <div className="relative z-50 flex flex-col items-center justify-center min-w-96 mx-auto">
      <div
        className="w-full p-5 rounded-lg shadow-md bg-primary-content
       border border-gray-200"
      >
        <div className="flex justify-end">
          <svg
            tabIndex={0}
            xmlns="http://www.w3.org/2000/svg"
            height="30"
            width="30"
            viewBox="0 0 512 512"
            fill="currentColor"
            className="cursor-pointer hover:text-blue-500"
            onClick={() => clear()}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                clear();
              }
            }}
          >
            <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z" />
          </svg>
        </div>
        <div className="text-3xl font-semibold text-center text-gray-300">
          Login to&nbsp;
          <span className="text-blue-500">QR-Connects</span>
        </div>
        <form onSubmit={handleSubmit}>
          <label className="input input-bordered flex items-center gap-2 mt-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input
              id="username"
              name="username"
              type="text"
              className="grow"
              placeholder="Username"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  handleSubmit(e);
                }
              }}
            />
          </label>
          <label
            htmlFor="password"
            className="input input-bordered flex items-center gap-2 mt-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              id="password"
              name="password"
              type="password"
              className="grow"
              placeholder="Password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  handleSubmit(e);
                }
              }}
            />
          </label>
          <button
            type="button"
            onClick={showSignupCB}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                showSignupCB();
              }
            }}
            className="text-sm hover:underline hover:text-blue-600 pb-1"
          >
            {"Don't"} have an account?
          </button>
          <div>
            <button
              className="btn btn-block btn-success btn-sm"
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  handleSubmit(e);
                }
              }}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
