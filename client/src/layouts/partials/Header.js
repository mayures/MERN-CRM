import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import logo from "../../assets/img/logo.png";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { userlogOut } from "../../api/userApi";

export const Header = () => {
  const navigate = useNavigate();

  const logMeOut = async() => {
    sessionStorage.removeItem("accessJWT");
    await userlogOut();
    navigate("/");
  };

  return (
    <Navbar collapseOnSelect bg="info" variant="dark" expand="md">
      <Navbar.Brand className="ms-3">
        <Link to="/dashboard">
          <img src={logo} alt="logo" width="50px" />
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto me-3">
          <LinkContainer to="/dashboard">
            <Nav.Link>Dashboard</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/tickets">
            <Nav.Link>Tickets</Nav.Link>
          </LinkContainer>
          <LinkContainer to="">
            <Nav.Link onClick={logMeOut}>Log Out</Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
