import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { ADD_GAMELIST } from "../utils/mutations";
import { QUERY_GAMELISTS, QUERY_ME } from '../utils/queries';

import Auth from "../utils/auth";

const GameList = () => {
  const [listName, setListName] = useState("");
  const [characterCount, setCharacterCount] = useState(0);

  const [addList, { error }] = useMutation(ADD_GAMELIST, {
    update(cache, { data: { addList } }) {
      try {
        const { gameLists } = cache.readQuery({ query: QUERY_GAMELISTS });

        cache.writeQuery({
          query: QUERY_GAMELISTS,
          data: { gameLists: [addList, ...gameLists] },
        });
      } catch (e) {
        console.error(e);
      }

      // update me object's cache
      /* const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, thoughts: [...me.lists, addList] } },
      }); */
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addList({
        variables: {
          listName,
          listAuthor: Auth.getProfile().data.username,
        },
      });

      setListName("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "listName" && value.length <= 280) {
      setListName(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div>

      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${
              characterCount === 280 || error ? "text-danger" : ""
            }`}
          >
            Character Count: {characterCount}/280
            {error && <span className="ml-2">{error.message}</span>}
          </p>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="listName"
                placeholder="Your list title here"
                value={listName}
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
    </div>
  );
};

export default GameList;
