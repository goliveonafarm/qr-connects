import { useState } from "react";
import useSignUp from "../hooks/useSignUp";

const SignUp = ({ showLoginCB, clear }) => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const { loading, signUp } = useSignUp();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signUp(inputs).then((res) =>{
      if (res.success){
        clear();
      }
    })
  };

  return (
    <div className="relative z-50 flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-5 rounded-lg shadow-md bg-primary-content border border-gray-200">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Sign up for&nbsp;<span className="text-blue-500">QR-Connects</span>
        </h1>

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
              type="text"
              className="grow"
              placeholder="Username"
              autoComplete="username"
              value={inputs.username}
              onChange={(e) =>
                setInputs({ ...inputs, username: e.target.value })
              }
            />
          </label>

          <label className="input input-bordered flex items-center gap-2 mt-2">
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
              type="password"
              className="grow"
              placeholder="Password"
              autoComplete="current-password"
              value={inputs.password}
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
            />
          </label>

          <label className="input input-bordered flex items-center gap-2 mt-2">
            <input
              type="password"
              className="grow"
              placeholder="Confirm Password"
              value={inputs.confirmPassword}
              onChange={(e) =>
                setInputs({ ...inputs, confirmPassword: e.target.value })
              }
            />
          </label>

          <button
            onClick={showLoginCB}
            className="text-sm hover:underline hover:text-blue-600 inline-block pb-1"
          >
            Already have an account?
          </button>

          <div>
            <button
              className="btn btn-block btn-sm btn-primary"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmit(e);
                }
              }}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
