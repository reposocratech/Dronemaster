import React, { createContext, useEffect, useState } from "react";
import { getLocalStorage } from "../helper/localStorageDroneMaster";
import jwDecode from "jwt-decode";
import axios from "axios";

export const DroneMasterContext = createContext();

const DroneMasterProvider = ({ children }) => {
  const [token, setToken] = useState();
  const [user, setUser] = useState();
  const [isLogged, setIsLogged] = useState();

  useEffect(() => {
    const tokenLocalStorage = getLocalStorage("token");
    setToken(tokenLocalStorage);

    if (tokenLocalStorage) {
      const id = jwDecode(tokenLocalStorage).user.user_id;

      axios
        .get(`http://localhost:4000/myProfile/${id}`)
        .then((res) => {
          console.log("La respuesta de CONTEXTOOOOOOOOO", res);
          setUser(res.data[0]);
          setIsLogged(true);
        })
        .catch();
    }
  }, []);
  
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
        }}
      >
        {children}
      </DroneMasterContext.Provider>
    </div>
  );
};

export default DroneMasterProvider;
