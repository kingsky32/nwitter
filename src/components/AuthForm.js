import React, { useState } from "react";
import { authService } from "fBase";
import styled from "styled-components";
import AuthInput from "./AuthInput";

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
  width: 100%;
  flex-flow: column nowrap;
`;

const Submit = styled.input`
  color: ${props => props.theme.whiteColor};
  background-color: ${props => props.theme.blueColor};
  height: 4.6rem;
  border-radius: 4.6rem;
  margin: .9rem;
`;

const AccountButton = styled.span`
  color: ${props => props.theme.blueColor};
  font-size: 1.4rem;
  margin-top: 1.8rem;
`;

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(false);
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
    <Container>
      <Form onSubmit={onSubmit}>
        <AuthInput name="email" value={email} onChange={onChange} label="Email" />
        <AuthInput
          type="password"
          name="password"
          value={password}
          onChange={onChange}
          label="Password"
        />
        <Submit type="submit" value={newAccount ? "Create Account" : "Log in"} />
        {error}
      </Form>
      <AccountButton onClick={toggleAccount}>
        {newAccount ? "Log in" : "Sign up for Nwitter"}
      </AccountButton>
    </Container>
  );
};

export default AuthForm;
