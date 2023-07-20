import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import style from "../App.module.css";
import styles from "../css/AllEpisodes.module.css";
import card from "../css/Card.module.css";
import Header from "./Header";

function AllEpisodes() {
  const [episodes, setEpisodes] = useState<Episode[]>([]);

  const fetchData = () => {
    fetch("https://rickandmortyapi.com/api/episode")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setEpisodes(data.results);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="all-episodes">
      <div id={style.stars}></div>
      <div id={style.stars2}></div>
      <div id={style.stars3}></div>
      <Header></Header>
      {episodes.length > 0 && (
        <div className="container mt-5">
          <div className="row">
            {episodes.map((episode: Episode) => (
              <div className={`${card.card} mb-5`}>
                <div className={card["card-body"]} key={episode.id}>
                  <div className="d-flex mt-3">
                    <Link className="col-5" to={`/episode/${episode.id}`}>
                      <p className={`${styles["episode-name"]} ms-3`}>
                        {episode.name}
                      </p>
                    </Link>
                    <p className={`${styles["episode-details"]} col-5`}>
                      {episode.air_date}
                    </p>
                    <p className={`${styles["episode-details"]} col-5`}>
                      {episode.episode}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default AllEpisodes;
