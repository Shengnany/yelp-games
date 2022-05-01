import React, { useState, useContext } from "react";
import GameAPI from "../../apis/gameAPI";
import { Button, Card, InputGroup, FormControl, Form } from "react-bootstrap";
import { GameContext } from "../../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";
function Login() {
  const [un, setUn] = useState("");
  const [pw, setPw] = useState("");
  const [em, setEm] = useState("");

  const navigate = useNavigate();

  const { curUser, setCurUser } = useContext(GameContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const user = {
      email:em,
      username: un,
      password: pw,
    };
    try {
      console.log("Login: ");
      const login = await GameAPI.post("/login", user);
      console.log(login);
      if (login.data && !curUser.username) {
        setCurUser(login.data);
      }
      navigate("/games");
    } catch (err) {
      console.log(err);
      navigate("/games");
    }
  };
  return (
    <div>
      <Card
        bg={"Light".toLowerCase()}
        key="Light"
        text={"Light".toLowerCase() === "light" ? "dark" : "white"}
        style={{ width: "30rem", margin: "auto" }}
        className="mt-2 text-center"
      >
        <Card.Body>
          <Card.Title>Sign in</Card.Title>
          <Card.Text>Please enter your username and password</Card.Text>
          <Form>
            <Form.Group className="mb-3" controlId="formGroupText">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={un}
                onChange={(e) => setUn(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={pw}
                onChange={(e) => setPw(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" onClick={handleSubmit}>
              Log in
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Login;
