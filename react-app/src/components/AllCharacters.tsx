import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../App.module.css";
import style from "../css/AllCharacters.module.css";
import card from "../css/Card.module.css";
import { fetchCharacters } from "../api/GetCharacters";
import { EpisodesMapping } from "./AllEpisodes";
import paginationStyle from "../css/Pagination.module.css";
import classNames from "classnames";
import Menu from "./Menu";

export function CharactersMapping() {
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetchCharacters().then((data) => {
      setCharacters(data);
    });
  };

  return characters;
}

const CHARACTERS_PER_PAGE = 10;
const MAX_PAGE_NUMBERS = 3;

function AllCharacters() {
  const characters = CharactersMapping();
  const episodes = EpisodesMapping();
  const [currentPage, setCurrentPage] = useState(1);

  const getFirstEpisode = (CharacterEpisode: string, episodes: Episode[]) => {
    const pharseEpisode = CharacterEpisode.split("/").pop();
    const id = Number(pharseEpisode);

    const episode = episodes.find((episode) => episode.id === id);
    return episode ? episode.name : "Episode not found";
  };

  const getCharactersForCurrentPage = () => {
    const startIndex = (currentPage - 1) * CHARACTERS_PER_PAGE;
    const endIndex = startIndex + CHARACTERS_PER_PAGE;
    return characters.slice(startIndex, endIndex);
  };

  const charactersForCurrentPage = getCharactersForCurrentPage();

  const getPageNumbers = () => {
    const totalPages = Math.ceil(characters.length / CHARACTERS_PER_PAGE);
    const currentPageIndex = currentPage - 1;

    if (totalPages <= MAX_PAGE_NUMBERS) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    } else {
      const halfMax = Math.floor(MAX_PAGE_NUMBERS / 2);
      const start = Math.max(0, currentPageIndex - halfMax);
      const end = Math.min(totalPages - 1, start + MAX_PAGE_NUMBERS - 1);
      const pageNumbers = [];

      if (start > 0) {
        pageNumbers.push(1);
        if (start > 1) {
          pageNumbers.push("...");
        }
      }

      for (let i = start; i <= end; i++) {
        pageNumbers.push(i + 1);
      }

      if (end < totalPages - 1) {
        if (end < totalPages - 2) {
          pageNumbers.push("...");
        }
        pageNumbers.push(totalPages);
      }

      return pageNumbers;
    }
  };

  return (
    <>
      <Menu></Menu>
      <div className="all-characters">
        <div id={styles.stars}></div>
        <div id={styles.stars2}></div>
        <div id={styles.stars3}></div>
        {charactersForCurrentPage.length > 0 && (
          <div className="row">
            {charactersForCurrentPage.map((character: Character) => (
              <div className="col-6" key={character.id}>
                <div className={card.card}>
                  <div className={`${card["card-body"]} d-flex`}>
                    <div className="col-3">
                      <img
                        className={card["card-img-left"]}
                        src={character.image}
                        alt={character.name}
                      />
                    </div>
                    <div className="col-9">
                      <Link to={`/character/${character.id}`}>
                        <p className={`${style["character-name"]} ms-3 mt-2`}>
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
                        First seen in:
                        <span className={style["first-episode-2"]}>
                          {" "}
                          {getFirstEpisode(character.episode[0], episodes)}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}{" "}
            ;
          </div>
        )}
        <ul className={paginationStyle.pagination}>
          <li
            className={classNames(paginationStyle["page-item"], {
              [paginationStyle.disabled]: currentPage === 1,
            })}
          >
            <button
              className={paginationStyle["page-link"]}
              onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
            >
              &laquo;
            </button>
          </li>
          {getPageNumbers().map((page, index) => (
            <li
              className={classNames(paginationStyle["page-item"], {
                [paginationStyle.active]: currentPage === page,
              })}
              key={index}
            >
              {typeof page === "number" ? (
                <button
                  className={paginationStyle["page-link"]}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ) : (
                <span className={paginationStyle.dots}>...</span>
              )}
            </li>
          ))}
          <li
            className={classNames(paginationStyle["page-item"], {
              [paginationStyle.disabled]:
                currentPage ===
                Math.ceil(characters.length / CHARACTERS_PER_PAGE),
            })}
          >
            <button
              className={paginationStyle["page-link"]}
              onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
            >
              &raquo;
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}

export default AllCharacters;
