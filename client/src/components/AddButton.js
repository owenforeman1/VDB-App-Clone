import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useLazyQuery } from "@apollo/client";

import { ADD_GAME } from "../utils/mutations";
import { QUERY_GAMELISTS } from "../utils/queries";

import auth from "../utils/auth";

//listId: $listId, slug: $slug, name: $name, released: $released, image: $image

const AddButton = ({ gameData }) => {
  const userId = auth.loggedIn() && auth.getProfile().data._id;
  const {
    id,
    slug,
    background_image,
    released,
    name,
    rating,
    parent_platforms,
    metacritic,
  } = gameData;
  const [getLists, { loading, error, data: listsData }] = useLazyQuery(QUERY_GAMELISTS);
  const [addGameToList, { error: mutationError }] = useMutation(ADD_GAME);




const handleButtonClick = () => {
        getLists({ variables: { userId } })
}
const handleAddButtonClick = async (listId) => {
  console.log("ADD BUTTON CLCIKED")
  console.log(listId)
  console.log(slug)
    console.log(name);
      console.log(released);

  console.log(background_image);

  const { data } = await addGameToList({
    variables: {
      listId,
      slug,
      name,
      released,
      rating: rating.toString(),
      metacritic,
      platforms: parent_platforms.map((platform) => platform.platform.name).join(', '),
      image: background_image,
    },
  });
        //getLists({ variables: { userId } })
}


  if (error || mutationError) {
    console.error(error || mutationError)
  }

  if (!auth.loggedIn()) {
    return null;
  }

  return (
    <div>
      <button onClick={handleButtonClick}>+Add to List</button>
      {console.log(listsData)}
      {listsData?.gameLists?.length ? 
        listsData.gameLists.map((list) => {
          return <button onClick={() => handleAddButtonClick(list._id)}>{list.listName}</button>
        })
      : null}
    </div>
  );
};

export default AddButton;
