import { authService } from "fBase";
import React, { useEffect, useState } from "react";
import AppRouter from "../components/Router";

const App = () => {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObject, setUserObject] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged(user => {
      if (user){
        setIsLoggedIn(true);
        setUserObject(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  return <>
    {init ? <AppRouter isLoggedIn={isLoggedIn} userObject={userObject} /> : "Initializing..." }
  </>;
};

export default App;
 