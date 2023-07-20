import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import style from "../css/AllCharacters.module.css";
import card from "../css/Card.module.css";

function AllCharacters() {
  const [characters, setCharacters] = useState<Character[]>([]);

  const fetchData = () => {
    fetch("https://rickandmortyapi.com/api/character")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCharacters(data.results);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {characters.length > 0 && (
        <div className="row">
          {characters.map((character: Character) => (
            <div className="col-6">
              <div className={card.card}>
                <div
                  className={`${card["card-body"]} d-flex`}
                  key={character.id}
                >
                  <div className="col-3">
                    <img
                      className={card["card-img-left"]}
                      src={character.image}
                      alt={character.name}
                    />
                  </div>
                  <div className="col-9">
                    <Link to={`/character/${character.id}`}>
                      <p className={`${style["character-name"]} ms-3`}>
                        {character.name}
                      </p>
                    </Link>
                    {character.status === "Alive" ? (
                      <p className={`${style.status} ms-3`}>
                        <span className={style.alive}>●</span> Alive -{" "}
                        {character.name}
                      </p>
                    ) : (
                      <p className={`${style.status} ms-3`}>
                        <span className={style.dead}>●</span> Dead -{" "}
                        {character.name}
                      </p>
                    )}
                    <p className={`${style.location} ms-3`}>
                      Last known location:
                      <span className={style["location-2"]}>
                        {" "}
                        {character.location.name}
                      </span>
                    </p>
                    <p className={`${style["first-episode"]} ms-3`}>
                      First seen in:{" "}
                      <span className={style["first-episode-2"]}> </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default AllCharacters;
