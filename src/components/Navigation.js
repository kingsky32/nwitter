import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.nav`
  padding: 0 1.4rem;
  border-bottom: 1px solid ${props => props.theme.whiteColor}25;
`;

const NavigationContainer = styled.ul`
  display: flex;
  height: 4.9rem;
  align-items: center;
  justify-content: space-between;
`;

const NavigationList = styled.li`
  font-size: 1.8rem;
  font-weight: 600;
`;

const Navigation = ({ userObject }) =>
  <Container>
    <NavigationContainer>
      <NavigationList>
        <Link to="/">Home</Link>
      </NavigationList>
      <NavigationList>
        <Link to="/profile">
          {userObject.displayName}'s Profile
        </Link>
      </NavigationList>
    </NavigationContainer>
  </Container>;

export default Navigation;
