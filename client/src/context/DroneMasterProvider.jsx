import React, { createContext, useEffect, useState } from "react";
import { getLocalStorage } from "../helper/localStorageDroneMaster";
import jwDecode from "jwt-decode";
import axios from "axios";

export const DroneMasterContext = createContext();

const DroneMasterProvider = ({ children }) => {
  const [token, setToken] = useState();
  const [user, setUser] = useState();
  const [isLogged, setIsLogged] = useState();
  let [showLogin, setShowLogin] = useState(false);
  let [showRegister, setShowRegister] = useState(false);
  let [filter, setFilter] = useState();

  let openRegister = () => {
    setShowRegister(!showRegister);
    setShowLogin(false);
  };


  let openLogin = () => {
    setShowLogin(!showLogin);
    setShowRegister(false);
  };

  let openHome = () => {
    setShowLogin(false);
    setShowRegister(false);
  };

  useEffect(() => {
    if (!showLogin && !showRegister) {
      setFilter();
    } else {
      setFilter("blur");
    }
  }, [showLogin, showRegister]);

  useEffect(() => {
    const tokenLocalStorage = getLocalStorage("token");
    setToken(tokenLocalStorage);
 
    if (tokenLocalStorage) {
      const id = jwDecode(tokenLocalStorage).user.user_id;

      axios
        .get(`http://localhost:4000/myProfile/${id}`)
        .then((res) => {
          setUser(res.data[0]);
          setIsLogged(true);
        })
        .catch((err) => console.log(err));
    }
  }, [isLogged]);

  
  return (
    <div>
      <DroneMasterContext.Provider
        value={{
          user,
          setUser,
          token,
          setToken,
          isLogged,
          setIsLogged,
          showLogin,
          setShowLogin,
          showRegister,
          setShowRegister,
          openLogin,
          openRegister,
          filter,
          setFilter,
          openHome,

        }}
      >
        {children}
      </DroneMasterContext.Provider>
    </div>
  );
};

export default DroneMasterProvider;
