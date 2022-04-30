import React, { useState, useContext } from "react";
import { GameContext } from "../../contexts/ContextProvider";
import GameAPI from "../../apis/gameAPI";
import { Button, Card, InputGroup, FormControl, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Register() {
  const [un, setUn] = useState("");
  const [pw, setPw] = useState("");
  const [em, setEm] = useState("");

  const navigate = useNavigate();
  const { curUser, setCurUser } = useContext(GameContext);
  console.log("Resiter: ");
  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const user = {
        email: em,
        username: un,
        password: pw,
      };
      console.log("Resiter: ");
      console.log(user);
      const response = await GameAPI.post("/register", user);
      console.log(response.data);
      setCurUser(user);
      console.log(user);
      navigate("/games");
    } catch (err) {
      console.log(err);
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
          <Card.Title>Register</Card.Title>
          <Card.Text>Please create an account</Card.Text>
          <Form>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={em}
                onChange={(e) => setEm(e.target.value)}
              />
            </Form.Group>
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
              Sign up
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Register;
