import { createContext, useContext, useState } from "react";

const StateContext = createContext({
  currentUser: {},
  userToken: null,
  languageLevels: [],
  toast: {},
  setCurrentUser: () => {},
  setUserToken: () => {},
  showToast: () => {},
});

export const ContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({
    name: "Guest",
    email: "guest@mywebsite",
  });
  const [userToken, _setUserToken] = useState(
    localStorage.getItem("TOKEN") || null
  );
  const [languageLevels, setLanguageLevels] = useState([
    "Beginner",
    "Intermediate",
    "Advanced",
  ]);
  const [toast, setToast] = useState({ message: "", show: false });

  const setUserToken = (token) => {
    if (token) {
      localStorage.setItem("TOKEN", token);
    } else {
      localStorage.removeItem("TOKEN");
    }
    _setUserToken(token);
  };

  const showToast = (text) => {
    setToast({ message: text, show: true });
    setTimeout(() => {
      setToast({ message: "", show: false });
    }, 4000);
  };

  return (
    <StateContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        userToken,
        setUserToken,
        languageLevels,
        toast,
        showToast,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
