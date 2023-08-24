import React, { createContext, useEffect, useState } from "react";
import { getLocalStorage } from "../helper/localStorageDroneMaster";
import jwDecode from "jwt-decode";
import axios from "axios";

export const DroneMasterContext = createContext();

const initialCourseInfo = {
  course_name: "",
  unit_tittle: [],
  lesson_title: []
}

const DroneMasterProvider = ({ children }) => {
  const [token, setToken] = useState();
  const [user, setUser] = useState();
  const [isLogged, setIsLogged] = useState();
  const [course, setCourse] = useState();
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [filter, setFilter] = useState();
  const [courseMaterial, setCourseMaterial] = useState(initialCourseInfo)
  const [resetData, setResetData] = useState(false)



  const openRegister = () => {
    setShowRegister(!showRegister);
    setShowLogin(false);
  };

  const openLogin = () => {
    setShowLogin(!showLogin);
    setShowRegister(false);
  };

  const openHome = () => {
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
  }, [isLogged, resetData]);

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
          course,
          setCourse,
          showLogin,
          setShowLogin,
          showRegister,
          setShowRegister,
          openLogin,
          openRegister,
          filter,
          setFilter,
          openHome,
          courseMaterial,
          setCourseMaterial,
          resetData,
          setResetData
        }}
      >
        {children}
      </DroneMasterContext.Provider>
    </div>
  );
};

export default DroneMasterProvider;
