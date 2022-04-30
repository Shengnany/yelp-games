import React, { useEffect, useContext, useState } from "react";
import GameAPI from "../../apis/gameAPI";
import { Container, Row, Col } from "react-bootstrap";
import { GameContext } from "../../contexts/ContextProvider";
import { Button, Card, InputGroup, FormControl, Form } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
function GameList(props) {
  const { games, setGames, selectGame, setSelectGame } =
    useContext(GameContext);
  const navigate = useNavigate();
  const [filter, setFilter] = useState("");
  const [term, setTerm] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GameAPI.get("/games");

        console.log("fetching data");
        const data = [...games, ...response.data];
        console.log(response);
        setGames(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const handleSelect = (e, g) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/games/${g._id}`);
  };

  const cards = games.map((g) => (
    <Row className="justify-content-md-center" n>
      <Col xs={12} md={6}>
        <Card
          className="mt-2"
          bg={"light".toLowerCase()}
          key="light"
          text={"light".toLowerCase() === "light" ? "dark" : "white"}
        >
          <Card.Header>Game: {g.title}</Card.Header>
          {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
          <Card.Body>
            <Card.Title>Price</Card.Title>
            <Card.Text>{g.price}</Card.Text>
            <Button
              variant="primary"
              size="sm"
              onClick={(event) => handleSelect(event, g)}
            >
              View
            </Button>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  ));

  const onSearchSubmit = () => {
    // const response = await unsplash.get("/search/photos", {
    //   params: { query: term },
    // });
    // this.setState({ images: response.data.results });

    const f = games
      .filter((game) => game.title.includes(term))
      .map((g) => (
        <Row className="justify-content-md-center" n>
          <Col xs={12} md={6}>
            <Card
              className="mt-2"
              bg={"light".toLowerCase()}
              key="light"
              text={"light".toLowerCase() === "light" ? "dark" : "white"}
            >
              <Card.Header>Title: {g.title}</Card.Header>
              {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
              <Card.Body>
                <Card.Title>Price: {g.price} </Card.Title>
                <Card.Text>
                  Description:
                  {games.description}
                </Card.Text>
                <Button
                  variant="primary"
                  onClick={(event) => handleSelect(event, g)}
                >
                  View
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ));
    setFilter(f);
  };

  return (
    <Container fluid>
      <Form className="d-flex mt-2">
        <FormControl
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Search"
          className="md-2"
        />
        <Button variant="outline-success" onClick={onSearchSubmit}>
          Search
        </Button>
      </Form>
      {!term ? cards : filter}
    </Container>
  );
}

export default GameList;
