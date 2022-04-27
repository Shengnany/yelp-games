import React, { useState, useContext } from "react";
import GameAPI from "../../apis/gameAPI";
import { Button, Card, InputGroup, FormControl, Form } from "react-bootstrap";
import { GameContext } from "../../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";
function Login() {
  const [un, setUn] = useState(null);
    const [pw, setPw] = useState("");
        const navigate = useNavigate();
  const { curUser, setCurser } = useContext(GameContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const user = {
      username: un,
      password: pw,
    };
    try {
      const response = await GameAPI.post("/users/authenticate", user);

      console.log(response.data.data);
      if (!curUser) {
        setCurser(user);
      }
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
        className="mb-2 text-center"
      >
        <Card.Body>
          <Card.Title>Sign in</Card.Title>
          <Card.Text>Please log in with your email</Card.Text>
          <Form>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
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

            <Button variant="primary" onSubmit={handleSubmit}>
              Log in
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Login;
