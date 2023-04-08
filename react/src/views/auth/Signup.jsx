import { useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../../axios";
import { useStateContext } from "../../context/ContextProvider";

export default function Signup() {
  const { setCurrentUser, setUserToken } = useStateContext();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();
    const signupInfo = {
      name: username,
      email,
      password,
      password_confirmation: passwordConfirmation,
    };

    axiosClient
      .post("/signup", signupInfo)
      .then(({ data }) => {
        setCurrentUser(data.user);
        setUserToken(data.token);
      })
      .catch((error) => {
        if (error.response) {
          setError(error.response.data.errors);
        }
        console.log(error);
      });
  };
  return (
    <>
      {/* {error && <pre>{JSON.stringify(error, undefined, 2)}</pre>} */}
      <h1 className="text-3xl font-semibold text-center text-blue-500">
        Sign up
      </h1>
      <form onSubmit={onSubmit} className="mt-6">
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            id="username"
            className="form-input"
            required={true}
          />
          {error && error.name && (
            <small className="text-red-500">* {error.name}</small>
          )}
        </div>
        <div className="mb-3">
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
          {error && error.email && (
            <small className="text-red-500">* {error.email}</small>
          )}
        </div>
        <div className="mb-3">
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
          {error && !error.password[0].includes("confirmation") && (
            <small className="text-red-500">* {error.password}</small>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="password-confirmation" className="form-label">
            Password Confirmation
          </label>
          <input
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            type="password"
            id="password-confirmation"
            className="form-input"
            required={true}
          />
          {error && error.password[0].includes("confirmation") && (
            <small className="text-red-500">* {error.password}</small>
          )}
        </div>
        <div className="mt-6">
          <button
            type="submit"
            className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            
          >
            Register
          </button>
        </div>
      </form>

      <p className="mt-8 text-sm font-light text-center text-gray-500">
        Already had an account?
        <Link
          to="/login"
          className="font-medium text-blue-600 hover:underline ml-1"
        >
          Login
        </Link>
      </p>
    </>
  );
}
