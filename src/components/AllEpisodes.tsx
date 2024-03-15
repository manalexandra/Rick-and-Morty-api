import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import style from "../App.module.css";
import styles from "../css/AllEpisodes.module.css";
import card from "../css/Card.module.css";
import Header from "./Header";
import { fetchEpisodes } from "../api/GetEpisodes";
import paginationStyle from "../css/Pagination.module.css";
import classNames from "classnames";
import Menu from "./Menu";

export function EpisodesMapping() {
  const [episodes, setEpisodes] = useState<Episode[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetchEpisodes().then((data) => {
      setEpisodes(data);
    });
  };

  return episodes;
}

const EPISODES_PER_PAGE = 10;
const MAX_PAGE_NUMBERS = 3;

function AllEpisodes() {
  const episodes = EpisodesMapping();

  const [currentPage, setCurrentPage] = useState(1);

  const getEpisodesForCurrentPage = () => {
    const startIndex = (currentPage - 1) * EPISODES_PER_PAGE;
    const endIndex = startIndex + EPISODES_PER_PAGE;
    return episodes.slice(startIndex, endIndex);
  };

  const episodesForCurrentPage = getEpisodesForCurrentPage();

  const getPageNumbers = () => {
    const totalPages = Math.ceil(episodes.length / EPISODES_PER_PAGE);
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
      <div className="all-episodes">
        <div id={style.stars}></div>
        <div id={style.stars2}></div>
        <div id={style.stars3}></div>
        <Header></Header>
        {episodesForCurrentPage.length > 0 && (
          <div className="container mt-5">
            <div className="row">
              {episodesForCurrentPage.map((episode: Episode) => (
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
                currentPage === Math.ceil(episodes.length / EPISODES_PER_PAGE),
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

export function getFirstEpisode(id: number) {
  const episodes = EpisodesMapping();
  const episode = episodes.find((episode) => episode.id === id);

  return episode?.name;
}

export default AllEpisodes;
