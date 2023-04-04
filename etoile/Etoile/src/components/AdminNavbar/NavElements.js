import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";
////////////////////////////////////////
export const Nav = styled.nav`
  background: #d2b7b7;
  height: 50px;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem calc((100vw - 1000px) / 2);
  z-index: 10;
`;
export const NavLink = styled(Link)`
  color: #000;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;

  &.active {
    color: aliceblue;
  }
`;
