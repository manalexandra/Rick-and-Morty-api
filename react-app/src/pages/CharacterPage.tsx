import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import style from "../App.module.css";
import styles from "../css/CharacterPage.module.css";
import style_ship from "../css/HomePage.module.css";
import status from "../css/AllCharacters.module.css";
import rick from "../assets/rick.gif";
import morty from "../assets/morty.gif";
import summer from "../assets/summer.png";
import jerry from "../assets/jerry.png";
import beth from "../assets/beth.png";
import Header from "../components/Header";
import { EpisodesMapping } from "../components/AllEpisodes";
import Menu from "../components/Menu";

const CharacterPage: React.FC = () => {
  const [character, setCharacter] = useState<Character | null>(null);
  const episodes = EpisodesMapping();

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character/${id}`)
      .then((response) => response.json())
      .then((data) => setCharacter(data))
      .catch((error) => console.log(error));
  }, [id]);

  const renderCharacterInfo = () => {
    switch (character?.name) {
      case "Rick Sanchez":
        return (
          <img
            className={`${style_ship.ship} rounded mx-auto d-block`}
            src={rick}
            alt="Ship"
          />
        );
      case "Morty Smith":
        return (
          <img
            className={`${style_ship.ship} rounded mx-auto d-block`}
            src={morty}
            alt="Ship"
          />
        );
      case "Summer Smith":
        return (
          <img
            className={`${style_ship.ship} rounded mx-auto d-block`}
            src={summer}
            alt="Ship"
          />
        );
      case "Jerry Smith":
        return (
          <img
            className={`${style_ship.ship} rounded mx-auto d-block`}
            src={jerry}
            alt="Ship"
          />
        );
      case "Beth Smith":
        return (
          <img
            className={`${style_ship.ship} rounded mx-auto d-block`}
            src={beth}
            alt="Ship"
          />
        );
      default:
        return (
          <div>
            <img
              className={`${style_ship.ship} mx-auto d-block`}
              src={character?.image}
              alt={character?.name}
            />
          </div>
        );
    }
  };

  const getFirstEpisode = (CharacterEpisode: string, episodes: Episode[]) => {
    console.log(CharacterEpisode);

    const pharseEpisode = CharacterEpisode.split("/").pop();
    const id = Number(pharseEpisode);

    const episode = episodes.find((episode) => episode.id === id);
    return episode ? episode.name : "Episode not found";
  };

  const episodeUrl = character?.episode[0] ? character?.episode[0] : "";

  return (
    <>
      <div className="character-page">
        <div id={style.stars}></div>
        <div id={style.stars2}></div>
        <div id={style.stars3}></div>
        <div className={styles.target}>
          <div className={`${styles.intro} ${styles["container-character"]}`}>
            <Header></Header>
            <div className="row">
              <div key={character?.id}>{renderCharacterInfo()}</div>
              <p className={`${styles["character-page-details"]} mt-2`}>
                Name: {character?.name}
              </p>
              <p className={styles["character-page-details"]}>
                {character?.status === "Alive" ? (
                  <p className={`${status.status} ms-3`}>
                    {" "}
                    Status: <span className={status.alive}>● Alive</span>
                  </p>
                ) : (
                  <p className={`${status.status} ms-3`}>
                    {" "}
                    Status: <span className={status.dead}>● Dead</span>
                  </p>
                )}
              </p>
              <p className={styles["character-page-details"]}>
                Species: {character?.species}
              </p>{" "}
              <p className={styles["character-page-details"]}>
                Gender: {character?.gender}
              </p>{" "}
              <p className={styles["character-page-details"]}>
                Origin: {character?.origin.name}
              </p>{" "}
              <p className={styles["character-page-details"]}>
                Location: {character?.location.name}
              </p>{" "}
              <p className={styles["character-page-details"]}>
                First seen in episode: {getFirstEpisode(episodeUrl, episodes)}
              </p>{" "}
              <p className={styles["character-page-details"]}>
                Creation date: {character?.created}
              </p>{" "}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CharacterPage;
