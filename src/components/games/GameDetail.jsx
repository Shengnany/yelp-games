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

  const [curGame, setCurGame] = useState(selectGame);

  const navigate = useNavigate();
  const [body, setBody] = useState(selectGame.body);
  const [rating, setRating] = useState(0);
  const [reviews, setCurReviews] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(curUser);
        console.log("curUser");
        console.log(curGame);
        const response = await GameAPI.get(`/games/${id}`);
        const res = response.data.game;
        console.log("response data");
        console.log(response.data);
         console.log(curUser);
        // const s = games.filter((game) => game._id == id)
        setCurGame(res);
        setCurReviews(res.reviews);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!curUser._id || curUser._id != curGame.author._id) {
      alert("You do not have right to that");
      console.log(curUser._id);
      console.log(curGame.author._id);
      return;
    }
    await GameAPI.delete(`/games/${id}`, {
      data: {
        curGame,
      },
    });
    setGames(games.filter((g) => g._id != id));

    navigate(`/games`);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!curUser._id || curUser._id != curGame.author._id) {
      alert("You do not have right to that");

      setSelectGame({});
      return;
    }

    setSelectGame(curGame);
    navigate(`/games/${id}/edit`);
  };

  const handleGames = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/games`);
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const r = await GameAPI.post(`/games/${id}/reviews`, {
      data: {
        body,
        rating,
      },
    });

    console.log("in submit review： ");
    console.log(r.data);
    reviews.push(r.data);

    setCurReviews(reviews);
    navigate(`/games/${id}`);
    setBody(" ");
    setRating(0);
    console.log("after posting: " + curUser);
  };

  const handleDeleteReview = async (e, r) => {
    console.log("delete review: ");
    console.dir(r);
    e.preventDefault();
    e.stopPropagation();

    await GameAPI.delete(`/games/${id}/reviews/${r._id}`, {
      data: {
        body,
        rating,
      },
    });
    setCurReviews(reviews.filter((re) => re._id != r._id));
    console.log(reviews);
    navigate(`/games/${id}`);
  };

  const show =
    !curUser || !curUser._id || !curGame|| !curGame.author || curUser._id != curGame.author._id ? (
      <div></div>
    ) : (
      <div>
        <Button onClick={handleUpdate} variant="info" size="sm">
          Update
        </Button>{" "}
        <Button type="submit" variant="danger" onClick={handleDelete} size="sm">
          Delete
        </Button>{" "}
      </div>
    );

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
                  <Card.Header>
                    Author of the post:{" "}
                    {curGame.author ? curGame.author.username : " "}
                  </Card.Header>
                  {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                  <Card.Body>
                    <Card.Title> Game: {curGame.title} </Card.Title>
                    <Card.Text>Price: {curGame.price}</Card.Text>
                    <Card.Title>Descipton </Card.Title>
                    <Card.Text>{curGame.description}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row className="justify-content-md-star mt-3">
              <Col>
                {show}
                <Button onClick={handleGames} type="submit" size="sm">
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
                onClick={(e) => handleSubmitReview(e)}
              >
                Submit
              </Button>
            </Col>
          </Row>
        </Col>
        <Col xs={12} md={4} className="mt-3">
          <ListGroup>
            <h3>Review</h3>
            {reviews &&
              reviews.map((r) => (
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
                    onClick={(e) => handleDeleteReview(e, r)}
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
