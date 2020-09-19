import React, { useEffect, useState } from "react";
import { authService } from "fBase";
import styled, { ThemeProvider } from "styled-components";
import Theme from "Styles/Theme";
import AppRouter from "./Router";
import GlobalStyles from "Styles/GlobalStyles";

const Wrapper = styled.div`
  width: 100%;
  max-width: 60rem;
  margin: 0 auto;
  box-sizing: border-box;
`;

const App = () => {
  const [init, setInit] = useState(false);
  const [userObject, setUserObject] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged(user => {
      if (user) {
        setUserObject({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: args => user.updateProfile(args)
        });
      } else {
        setUserObject(null);
      }
      setInit(true);
    });
  }, []);
  const refreshUser = () => {
    const user = authService.currentUser;
    userObject({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: args => user.updateProfile(args)
    });
  };
  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyles />
      <Wrapper>
        {init
          ? <AppRouter
              refreshUser={refreshUser}
              isLoggedIn={Boolean(userObject)}
              userObject={userObject}
            />
          : "Initializing..."}
      </Wrapper>
    </ThemeProvider>
  );
};

export default App;
