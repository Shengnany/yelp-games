import React, { useState, useContext } from "react";
import { GameContext } from "../../contexts/ContextProvider";
import GameAPI from "../../apis/gameAPI";

import {
  Button,
  Alert,
  InputGroup,
  FormControl,
  Form,
  Col,
  Row,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function CreateGame() {
  const { addGame, selectGame, setSelectGame, curUser, games, setGames } =
    useContext(GameContext);
  const navigate = useNavigate();
  const [title, setTitle] = useState(selectGame.title);
  const [price, setPrice] = useState(selectGame.price);
  const [description, setDescription] = useState(selectGame.description);
  console.log("cur user in create game: ");
  console.log(curUser);


  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const game = {
        title,
        price,
        description,
      };
      if (selectGame.title) {
        const response = await GameAPI.put(`/games/${selectGame._id}`, game);
        const res = response.data;
        console.log("Edit the game:" + res);
        setSelectGame({});
      } else {
        const response = await GameAPI.post(`/games`, game);
        const res = response.data;
        console.log("Submit a new game" + res);
        addGame(res);
      }
      console.log("navigating to..");
      navigate(`/games`);
    } catch (err) {
      console.log(err);
      navigate(`/games`);
    }
  };

  return (
    <Form
      style={{ width: "40rem", margin: "0 auto" }}
      className="mt-4"
    >
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">
          <Form.Label htmlFor="title">Title</Form.Label>
        </InputGroup.Text>
        <Form.Control
          type="text"
          defaultValue={selectGame.title}
          id="title"
          placeholder="Game Title"
          title="Game Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </InputGroup>

      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon2">
          <Form.Label htmlFor="price">Price</Form.Label>
        </InputGroup.Text>
        <Form.Control
          type="number"
          defaultValue={selectGame.price}
          id="price"
          placeholder="Game Price"
          title="Game Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />{" "}
        <InputGroup.Text>$</InputGroup.Text>
        <InputGroup.Text>0.00</InputGroup.Text>
      </InputGroup>

      <Form.Group className="mb-3">
        <InputGroup.Text>Descipton</InputGroup.Text>
        <FormControl
          as="textarea"
          defaultValue={selectGame.description}
          id="description"
          placeholder="Description"
          title="Game Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" className="mt-2" onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
  );
}
export default CreateGame;
