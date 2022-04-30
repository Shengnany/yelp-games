import React, { useState, useContext } from "react";
import { Outlet, Link, useParams, useNavigate } from "react-router-dom";
import { Fragment } from "react";
import { GameContext } from "../contexts/ContextProvider";
import GameAPI from "../apis/gameAPI";
import {
  Navbar,
  Nav,
  Container,
  Form,
  FormControl,
  Button,
  NavDropdown,
} from "react-bootstrap";

function Header() {
  const navigate = useNavigate();
  const { curUser, setCurUser } = useContext(GameContext);

  console.log("In Header: ");

  console.log(curUser);

  const handleLogout = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const logout = await GameAPI.post("/logout", curUser);
    console.log(logout.data);
    setCurUser({});
    navigate("/games");
  };

  const handleGames = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate("/games");
  };

  const handleNewGame = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate("/games/new");
  };

  const rightside = !curUser.username ? (
    <>
      <Nav.Item>
        <Nav.Link href="/login">Log in</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/register">Register</Nav.Link>
      </Nav.Item>
    </>
  ) : (
    <>
      <Nav.Item>
        <Nav.Link onClick={handleLogout}>Log out </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Navbar.Text>
          Signed in as: <a href="#">{curUser.username}</a>
        </Navbar.Text>
      </Nav.Item>
    </>
  );

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">YelpGame</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Item>
              <Nav.Link onClick={handleGames}>Games</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={handleNewGame}>New Game</Nav.Link>
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
