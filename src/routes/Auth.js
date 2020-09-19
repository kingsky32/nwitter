import React from "react";
import { authService, firebaseInstance } from "fBase";
import AuthForm from "Components/AuthForm";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faGooglePlusG, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  width: 100%;
  margin-top: 1.8rem;
  padding: 0 1.4rem;
`;

const Logo = styled.h1`text-align: center;`;

const Title = styled.span`
  display: block;
  text-align: center;
  font-weight: 600;
  font-size: 2.1rem;
  margin: 2.8rem 0 .9rem;
`;

const SocialContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  padding: .9rem;
  margin-top: 3rem;
`;

const SocialButton = styled.button`
  width: 100%;
  height: 4.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${props => props.theme.whiteColor};
  font-size: 1.6rem;
  border-radius: 6rem;
  background-color: ${props => props.theme.whiteColor}05;
  color: ${props => props.theme.blueColor};
  border: 1px solid;
  svg {
    margin-right: 1rem;
  }
  &:not(:last-child) {
    margin-bottom: .9rem;
  }
`;

const Auth = () => {
  const onSocialClick = async e => {
    const { target: { name } } = e;
    let provider;
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === "github") {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    await authService.signInWithPopup(provider);
  };
  return (
    <Wrapper>
      <Logo>
        <Link to="/">
          <FontAwesomeIcon icon={faTwitter} size="3x" />
        </Link>
      </Logo>
      <Title>Log in to Nwitter</Title>
      <AuthForm />
      <SocialContainer>
        <SocialButton onClick={onSocialClick} name="google">
          <FontAwesomeIcon icon={faGooglePlusG} size="lg" />
          Sign in with Google
        </SocialButton>
        <SocialButton onClick={onSocialClick} name="github">
          <FontAwesomeIcon icon={faGithub} size="lg" />
          Sign in with Github
        </SocialButton>
      </SocialContainer>
    </Wrapper>
  );
};

export default Auth;
