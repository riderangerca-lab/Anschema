import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { FaBars, FaTimes } from "react-icons/fa";

const HeaderContainer = styled.header`
  position: sticky; top: 0;
  background: rgba(255,255,255,0.92);
  backdrop-filter: blur(10px);
  z-index: 1000;
  padding: 0.9rem 0;
`;

const Nav = styled.nav`
  display: flex; justify-content: space-between; align-items: center;
  max-width: 1200px; margin: auto; padding: 0 20px;
`;

const Logo = styled(Link)`
  font-size: 1.35rem; font-weight: 800; text-decoration: none;
`;

const NavLinks = styled.ul`
  display: flex; gap: 1rem;
  list-style: none;
`;

const NavLinkStyled = styled(Link)`
  text-decoration: none;
`;

export default function Header() {
  const location = useLocation();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  useEffect(() => { setMobileMenuOpen(false); }, [location.pathname]);

  const nav = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/portfolio", label: "Portfolio" },
    { path: "/tools", label: "Tools" },
    { path: "/contact", label: "Contact" }
  ];
  
  return (
    <HeaderContainer>
      <Nav>
        <Logo to="/">Anschema</Logo>
        <NavLinks>
          {nav.map(i => (
            <li key={i.path}>
              <NavLinkStyled to={i.path}>{i.label}</NavLinkStyled>
            </li>
          ))}
        </NavLinks>
        <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </Nav>
    </HeaderContainer>
  );
}
