import React, { useState, useContext } from "react";
import { Outlet, Link, useParams } from "react-router-dom";
import { Fragment } from "react";
import { GameContext } from "../contexts/ContextProvider";
import { Navbar, Nav, Container , Form, FormControl, Button, NavDropdown} from "react-bootstrap";
function Header() {
  const { curUser, setCuruser } = useContext(GameContext);
  const rightside = !curUser ? (
    <>
      <Nav.Item>
        <Nav.Link href="/login">Log in</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/register">Register</Nav.Link>
      </Nav.Item>
    </>
  ) : (
    <Nav.Item>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
          Signed in as: <a href="#login">{curUser}</a>
        </Navbar.Text>
      </Navbar.Collapse>
    </Nav.Item>
  );

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">YelpGame</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Item>
              <Nav.Link href="/games">Games</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/games/new">New Game</Nav.Link>
            </Nav.Item>
          </Nav>
    <Nav className="justify-content-end" id="responsive-navbar-nav">
                      {rightside}
                      </Nav>
       
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
