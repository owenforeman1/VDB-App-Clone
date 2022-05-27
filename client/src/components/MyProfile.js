import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";

import { ADD_GAMELIST } from "../utils/mutations";
import { QUERY_GAMELISTS } from "../utils/queries";

import GameList from './GameList'
import auth from "../utils/auth";

const MyProfile = () => {
  const userid = auth.loggedIn() && auth.getProfile().data._id; 
  const [gameListName, setGameListName] = useState("");
  console.log(userid)


  const [addGameList, { error }] = useMutation(ADD_GAMELIST);

  const {
    loading: listloading,
    data: gameListData,
    refetch,
  } = useQuery(QUERY_GAMELISTS, {
    variables: { userId: userid },
    pollInterval: 500
  });




  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addGameList({
        variables: {
          listName: gameListName
        },
      });
      refetch()

      setGameListName("");
    } catch (err) {
      console.error(err);
    }
  };

  
  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "gameListName" && value.length <= 280) {
      setGameListName(value);
    }
  };


  return (
    <div>
      {auth.loggedIn() ? (
        <>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="gameListName"
                placeholder="New gamelist name..."
                value={gameListName}
                className="form-input w-100"
                style={{ lineHeight: "1.5", resize: "vertical" }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Add GameList
              </button>
            </div>
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to add a gamelist. Please{" "}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
      {auth.loggedIn() && gameListData?.gameLists?.length ? 
        (gameListData.gameLists.map((gameListItem) => {
          console.log("iterating!")
          return (<GameList listData={gameListItem} />)
        }))
       : null}
    </div>
  );
};

export default MyProfile;
