import React, { useEffect, useContext } from 'react';
import GameAPI from "../../apis/gameAPI";
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { GameContext }  from '../../contexts/ContextProvider';
import { Button, Card, InputGroup, FormControl, Form } from "react-bootstrap";
import SearchBar from './SearchBar'

function GameList(props) {
  const { games, setGames, selectGame, setSelectGame } = useContext(GameContext);
  console.log(games);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GameAPI.get("/");
        console.log(response.data.data);
        setGames(response.data.data.games);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const  onSearchSubmit = async (term) => {
      // const response = await unsplash.get("/search/photos", {
      //   params: { query: term },
      // });

      // this.setState({ images: response.data.results });
  };
  
  const handleSelect = (e,g) => {
     e.preventDefault();
     e.stopPropagation();
    setSelectGame(g)
    navigate(`/games/${g._id}`);
  };
  const cards = games.map((g) => (
    <Card
      className="md-8"
      bg={"light".toLowerCase()}
      key="light"
      text={"light".toLowerCase() === "light" ? "dark" : "white"}
      style={{ width: "18rem" }}
      className="mt-2"
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
  ));

  return (
    <Container fluid>
      <SearchBar onSubmit={onSearchSubmit} />
      {cards}
    </Container>
  );
}

  export default GameList;

    //         {games &&
    //             games.map((g) => {
    //               return (
    //                   <Row>
    //                 <Col
    //                   onClick={() => handleSelect(g.id)}
    //                   key={g.id}>
    //                 </Col>
    //                   <Col>{g.title}</Col>
    //                 </ Row>
    //               );
    //             })
    //             }
     // <div className="list-group">
    //   <table className="table table-hover table-dark">
    //     <thead>
    //       <tr className="bg-primary">
    //         <th scope="col">Game</th>
    //         <th scope="col">View</th>
    //         <th scope="col">Price Range</th>
    //         <th scope="col">Ratings</th>
    //         <th scope="col">Edit</th>
    //         <th scope="col">Delete</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {games && 
    //         games.map((g) => {
    //           return (
    //             <tr
    //               onClick={() => handleSelect(g.id)}
    //               key={g.id}
    //             >
    //               <td>{g.title}</td>
    //             </tr>
    //           );
    //         })}
    //     </tbody>
    //   </table>
    // </div>

