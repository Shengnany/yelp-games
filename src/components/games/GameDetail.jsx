import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GameContext } from "../../contexts/ContextProvider";
import GameAPI from "../../apis/gameAPI";
import StarRating from "../reviews/Rating";
import Reviews from "../reviews/Reviews";
import CreateReview from "../reviews/CreateReview";

const GameDetail = () => {

  const { id } = useParams();
  const { selectGame, setSelectGame, curUser, setCurUser } = useContext(
    GameContext
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GameAPI.get(`/${id}`);
        console.log(response);
        setSelectGame(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      {selectGame && (
        <>
          <h1 className="text-center display-1">
            {selectGame.game.title}
          </h1>
          <div className="text-center">
            <StarRating rating={selectGame.game.average_rating} />
            <span className="text-warning ml-1">
              {selectGame.game.count
                ? `(${selectGame.game.count})`
                : "(0)"}
            </span>
          </div>
          <div className="mt-3">
            <Reviews reviews={selectGame.reviews} />
          </div>
          {/* <CreateReview /> */}
        </>
      )}
    </div>
  );
};

export default GameDetail;
