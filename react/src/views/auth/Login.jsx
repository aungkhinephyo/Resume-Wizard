import { Link } from "react-router-dom";
import { useState } from "react";
import axiosClient from "../../axios";
import { useStateContext } from "../../context/ContextProvider";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setCurrentUser, setUserToken } = useStateContext();
  const onSubmit = (e) => {
    e.preventDefault();
    const credentials = { email, password };

    axiosClient
      .post("/login", credentials)
      .then(({ data }) => {
        setCurrentUser(data.user);
        setUserToken(data.token);
      })
      .catch((error) => {
        if (error.response) {
          setError(error.response.data.error);
        }
        console.log(error.response.data);
      });
  };

  return (
    <>
      <h1 className="text-3xl font-semibold text-center text-blue-500 mb-6">
        Login
      </h1>
      {error && (
        <div className="py-2 px-4 bg-red-100 text-sm text-red-500 font-semibold mb-3">
          {error}
        </div>
      )}
      <form onSubmit={onSubmit}>
        <div className="mb-2">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="email"
            className="form-input"
            required={true}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            className="form-input"
            required={true}
          />
        </div>
        <div className="mt-6">
          <button
            type="submit"
            className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Login
          </button>
        </div>
      </form>

      <p className="mt-8 text-sm font-light text-center text-gray-500">
        Don't have an account?
        <Link
          to="/signup"
          className="font-medium text-blue-600 hover:underline ml-1"
        >
          Sign up
        </Link>
      </p>
    </>
  );
}
