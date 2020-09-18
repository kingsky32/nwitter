
import React, { useState } from "react";
import { authService } from "fBase";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");
  const onChange = e => {
    const { target: { name, value } } = e;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = e => {
    e.preventDefault();
    try {
      if (newAccount) {
        authService.createUserWithEmailAndPassword(email, password);
      } else {
        authService.signInWithEmailAndPassword(email, password);
      }
    } catch (err) {
      setError(err.message);
    }
  };
  const toggleAccount = () => setNewAccount(prev => !prev);
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="email"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
        />
        <input type="submit" value={newAccount ? "Create Account" : "Log in"} />
        {error}
      </form>
      <span onClick={toggleAccount}>
        {newAccount ? "Log in" : "Create Account"}
      </span>
    </>
  );
};

export default AuthForm;
