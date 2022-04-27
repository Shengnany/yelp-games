
import React, { useState, useContext } from "react";
import{ GameContext } from '../../contexts/ContextProvider';
import GameAPI from "../../apis/gameAPI";

import { Button, Alert, InputGroup, FormControl, Form, Col ,Row} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

function CreateGame() {
    const { addGame, selectGame, setSelectGame } = useContext(GameContext);
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState(null);
    const [description, setDescription] = useState('');
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            
        const response = await GameAPI.post("/games", {
            title,
            price,
            description,
        });
        
        console.log(response.data.data);
        if (selectGame) {
            setSelectGame({})
        }
        else {
            addGame(response.data.data.game);
        }
       navigate('/games');
    } catch (err) {
        console.log(err);
        }
    };
    
    // return (
    //     <form>
    //         <label>Title:
    //             <input
    //             type="text" 
    //             value={title}
    //             onChange={(e) => setTitle(e.target.value)}
    //             />
    //         </label>
    //             <label>Price:
    //             <input
    //             type="number" 
    //             value={price}
    //             onChange={(e) => setPrice(e.target.value)}
    //             />
    //         </label>
    //             <label>Description:
    //             <input
    //             type="text" 
    //             value={description}
    //             onChange={(e) => setDescription(e.target.value)}
    //             />
    //         </label>
    //         <Button
    //             onClick={handleSubmit}
    //             type="submit"
    //             variant="secondary"
    //             size="sm">
                
    //         Add
    //         </Button>
    //     </form>
        
    // )
    return (
      <Form
        style={{ width: "40rem", margin: "0 auto" }}
        className="mt-4"
        onSubmit={handleSubmit}
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
          />
        </InputGroup>

        <Form.Group className="mb-3">
          <InputGroup.Text>Descipton</InputGroup.Text>
          <FormControl as="textarea" aria-label="With textarea" />
        </Form.Group>
            <Button variant="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    );
}

export default CreateGame;