import { FaBars } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";
export const Nav = styled.nav`
  background: #D2B7B7;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem calc((100vw - 1000px) / 2);
  z-index: 10;
`;
///////////
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
export const Bars = styled(FaBars)`
  display: none;
  color: #fff;
  @media screen and (max-width: 678px) {
    display: block;
    position: stickey;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
    margin-left: 24px;
  }
`;
export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  padding-left: 300px;
  @media screen and (mac-width: 768 px) {
    display: none;
  }
`;