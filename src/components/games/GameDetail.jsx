import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GameContext } from "../../contexts/ContextProvider";
import GameAPI from "../../apis/gameAPI";
import {
  Button,
  Card,
  Row,
  Col,
  Form,
  Tab,
  ListGroup,
  Container,
} from "react-bootstrap";
import { Rating } from "react-simple-star-rating";

const GameDetail = () => {
  const { id } = useParams();
  const { selectGame, setSelectGame, curUser, games, setGames } =
    useContext(GameContext);

  const [curGame, setCurGame] = useState({});
  const navigate = useNavigate();
  const [body, setBody] = useState(selectGame.body);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GameAPI.get(`/games/${id}`);
        const res = response.data.game;
        // console.log("response data"+response.data);
        // const s = games.filter((game) => game._id == id)
        setCurGame(res);
        console.log(res.reviews);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    await GameAPI.delete(`/games/${id}`, {
      data: {
        curGame,
      },
    });
    setGames(games.filter((g) => g._id != id));
    navigate(`/games`);
  };

  const handleUpdate = async (e) => {
    setSelectGame(curGame);
    e.preventDefault();
    e.stopPropagation();
    navigate(`/games/${id}/edit`);
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    await GameAPI.post(`/games/${id}/reviews`, {
      data: {
        body,
        rating,
      },
    });
    navigate(0);
  };

  const handleDeleteReview = async (r) => {
    await GameAPI.delete(`/games/${id}/reviews/${r._id}`, {
      data: {
        body,
        rating,
      },
    });
    navigate(0);
  };
  return (
    <Container fluid style={{ marginLeft: "5rem" }}>
      <Row className="justify-content-md-start">
        <Col xs={12} md={6}>
          <div>
            <Row className="justify-content-md-start mt-4">
              <Col>
                <Card
                  className="mt-2"
                  bg={"light".toLowerCase()}
                  key="light"
                  text="dark"
                >
                  <Card.Header> Game: {curGame.title}</Card.Header>
                  {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                  <Card.Body>
                    <Card.Title>Price </Card.Title>
                    <Card.Text>{curGame.price}</Card.Text>
                    <Card.Title>Descipton </Card.Title>
                    <Card.Text>{curGame.description}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row className="justify-content-md-star mt-3">
              <Col>
                <Button onClick={handleUpdate} variant="info" size="sm">
                  Update
                </Button>{" "}
                <Button
                  type="submit"
                  variant="danger"
                  onClick={handleDelete}
                  size="sm"
                >
                  Delete
                </Button>{" "}
                <Button href={`/games`} type="submit" size="sm">
                  All Games
                </Button>{" "}
              </Col>
            </Row>
          </div>
          <Row className="justify-content-md-start mt-5">
            <Col>
              <Form.Label>
                <h5>Leave A Review</h5>
              </Form.Label>
              <Form.Control
                type="text"
                defaultValue={body}
                id="body"
                placeholder="Something to say about this?"
                title="body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
              <Form.Text className="text-muted">
                Add on a rating{"   "}{" "}
              </Form.Text>
              <Rating
                onClick={(rate) => setRating(rate)}
                ratingValue={rating} /* Available Props */
              />
            </Col>
          </Row>
          <Row className="justify-content-md-start mt-4">
            <Col>
              <Button
                variant="dark"
                className="mt-1"
                size="sm"
                onClick={handleSubmitReview}
              >
                Submit
              </Button>
            </Col>
          </Row>
        </Col>
        <Col xs={12} md={4} className="mt-3">
          <ListGroup>
            <h3>Review</h3>
            {curGame.reviews &&
              curGame.reviews.map((r) => (
                <ListGroup.Item
                  as="li"
                  className="d-flex justify-content-between align-items-start"
                >
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">Rating Score: {r.rating}</div>R
                    {r.body}
                  </div>
                  <Button
                    type="submit"
                    variant="danger"
                    onClick={() => handleDeleteReview(r)}
                    size="sm"
                  >
                    Delete
                  </Button>{" "}
                </ListGroup.Item>
              ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default GameDetail;
