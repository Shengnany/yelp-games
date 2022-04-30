import React, { useState, createContext } from "react";

export const GameContext = createContext();

export const GameContextProvider = (props) => {
  const [games, setGames] = useState([
  ]);
  const [selectGame, setSelectGame] = useState({});
  const [curUser, setCurUser] = useState({});

  const addGame = (game) => {
    setGames([game, ...games]);
  };

  return (
    <GameContext.Provider
      value={{
        games,
        setGames,
        addGame,
        selectGame,
        setSelectGame,
        curUser,
        setCurUser,
      }}
    >
      {props.children}
    </GameContext.Provider>
  );
};
