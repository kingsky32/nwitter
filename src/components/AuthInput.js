import React, { useRef } from "react";
import styled from "styled-components";

const InputLabel = styled.label`
  font-size: 1.4rem;
  color: ${props => props.theme.greyColor};
`;

const InputContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  height: 5rem;
  overflow: hidden;
  box-sizing: border-box;
  border-bottom: 1px solid ${props => props.theme.whiteColor};
  padding: .8rem;
  background-color: ${props => props.theme.whiteColor}03;
  border-radius: ${props => props.theme.borderRadius};
  overflow: hidden;
`;

const InputWrapper = styled.div`
  padding: .9rem 1.4rem;
  &.active {
    ${InputContainer} {
      border-color: ${props => props.theme.blueColor};
    }
    ${InputLabel} {
      color: ${props => props.theme.blueColor};
    }
  }
`;

const Input = styled.input`
  font-size: 1.8rem;
  padding: .2rem 0 .5rem;
`;

const AuthInput = ({ type = "text", name, value, onChange, label }) => {
  const inputRef = useRef(null);
  const onFocus = () => {
    inputRef.current.classList.add("active");
  };
  const onBlur = () => {
    inputRef.current.classList.remove("active");
  };
  return (
    <InputWrapper ref={inputRef}>
      <InputContainer>
        <InputLabel htmlFor={name}>
          {label}
        </InputLabel>
        <Input
          type={type}
          name={name}
          required
          onFocus={onFocus}
          onBlur={onBlur}
          value={value}
          onChange={onChange}
        />
      </InputContainer>
    </InputWrapper>
  );
};

export default AuthInput;
