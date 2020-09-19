import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Profile from "Routes/Profile";
import Auth from "../Routes/Auth";
import Home from "../Routes/Home";
import Navigation from "./Navigation";

export default ({ isLoggedIn, userObject, refreshUser }) => {
  return (
    <Router>
      {isLoggedIn && <Navigation userObject={userObject} />}
      <Switch>
        {isLoggedIn ? 
          <>
            <Route exact path="/">
              <Home userObject={userObject} />
            </Route>
            <Route exact path="/profile">
              <Profile userObject={userObject} refreshUser={refreshUser} />
            </Route>
          </> :
          <>
            <Route exact path="/">
              <Auth />
            </Route>
          </>
        }
      </Switch>
    </Router>
  );
};
