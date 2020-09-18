import React from "react";
import { Link } from "react-router-dom";

const Navigation = ({ userObject }) =>
  <nav>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/profile">
          {userObject.displayName}'s Profile
        </Link>
      </li>
    </ul>
  </nav>;

export default Navigation;
