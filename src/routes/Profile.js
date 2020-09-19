import React, { useState } from "react";
import { authService } from "fBase";
import { useHistory } from "react-router-dom";
import AuthInput from "Components/AuthInput";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
`;

const ButtonContainer = styled.div`margin: .9rem;`;

const Submit = styled.button`
  width: 100%;
  color: ${props => props.theme.whiteColor};
  background-color: ${props => props.theme.blueColor};
  font-size: 1.6rem;
  height: 4.6rem;
  border-radius: 4.6rem;
`;

const LogOut = styled.button`
  width: 100%;
  font-size: 1.4rem;
  color: ${props => props.theme.blueColor};
`;

export default ({ userObject, refreshUser }) => {
  const [newDisplayname, setNewDisplayName] = useState(userObject.displayName);
  const history = useHistory();
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };
  const onChange = e => {
    const { target: { value } } = e;
    setNewDisplayName(value);
  };
  const onSubmit = async e => {
    e.preventDefault();
    if (userObject.displayName !== newDisplayname) {
      await userObject.updateProfile({
        displayName: newDisplayname
      });
      refreshUser();
    }
  };
  return (
    <Wrapper>
      <form onSubmit={onSubmit}>
        <AuthInput
          placeholder="Display name"
          onChange={onChange}
          value={newDisplayname}
          label="New display name"
        />
        <ButtonContainer>
          <Submit type="submit">Update Profile</Submit>
        </ButtonContainer>
      </form>
      <ButtonContainer>
        <LogOut onClick={onLogOutClick}>Log Out</LogOut>
      </ButtonContainer>
    </Wrapper>
  );
};
