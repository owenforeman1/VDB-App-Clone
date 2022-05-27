import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";

import { ADD_GAMELIST } from "../utils/mutations";
import { QUERY_GAMELIST } from "../utils/queries";

import auth from "../utils/auth";

const GameList = ({ listData }) => {
  const userid = auth.loggedIn() && auth.getProfile().data._id;
  const { listName, _id: listId, games} = listData

  const {
    loading: listloading,
    data: gameListObj,
  } = useQuery(QUERY_GAMELIST, {
    variables: { userId: userid },
  });




  return (
    <div style={{border: '1px solid white'}}>
      <h3>{listName}</h3>
      <h4>Games:</h4>
      {games.length ? 
        games.map((gameItem) => <div style={{padding: '15px', border: '1px solid white'}}>
        <img src={gameItem.image} width={100} />
        <h5>{gameItem.name}</h5>
        <p>{gameItem.platforms}</p>
        <p>{gameItem.slug}</p>
        </div>)
       : <p>This list is empty!</p>}
    </div>
  );
};

export default GameList;
