import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  html, body {
    background-color: ${props => props.theme.whiteColor};
  }
`;
