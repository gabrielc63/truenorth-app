import React from "react";
import { useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { selectCurrentUser } from "../features/auth/authSlice";

const CustomNavbar = () => {
  const user = useSelector(selectCurrentUser);

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Truenorth challenge</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/welcome">Home</Nav.Link>
            {user ? (
              <Nav.Link href="/logout">Logout</Nav.Link>
            ) : (
              <Nav.Link href="/login">Login</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
