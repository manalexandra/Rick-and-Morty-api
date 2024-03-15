import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import style from "../App.module.css";
import header from "../css/Header.module.css";
import styles from "../css/EpisodePage.module.css";
import img1 from "../assets/img1.webp";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";
import img4 from "../assets/img4.jpg";
import Menu from "../components/Menu";

const CharacterPage: React.FC = () => {
  const [episode, setEpisode] = useState<Episode | null>(null);
  const { id } = useParams<{ id: string }>();
  const [activeOption, setActiveOption] = useState(0);

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/episode/${id}`)
      .then((response) => response.json())
      .then((data) => setEpisode(data))
      .catch((error) => console.log(error));
  }, [id]);

  const handleOptionClick = (optionIndex: number) => {
    setActiveOption(optionIndex);
  };

  const optionsData = [
    {
      id: 0,
      name: "Episode: " + episode?.episode,
      imageUrl: img1,
      icon: "🎥",
    },
    {
      id: 1,
      name: "Air Date: " + episode?.air_date,
      imageUrl: img2,
      icon: "📆",
    },
    {
      id: 2,
      name: "Created: " + episode?.created,
      imageUrl: img3,
      icon: "⏱",
    },
    {
      id: 3,
      imageUrl: img4,
      icon: "😜",
    },
  ];

  return (
    <>
      <Menu></Menu>
      <div className="episode-page">
        <div id={style.stars}></div>
        <div id={style.stars2}></div>
        <div id={style.stars3}></div>
        <div className="container">
          <header className={header.header}>
            <h1 className={`${header.header__heading} text-center mt-5 mb-0`}>
              {episode?.name}
            </h1>
          </header>
          <div className={`${styles.options} mt-5`}>
            {optionsData.map((option, index) => (
              <div
                key={option.id}
                className={`${styles.option} ${
                  activeOption === index ? styles.active : ""
                }`}
                onClick={() => handleOptionClick(index)}
                style={{
                  backgroundImage: `url(${option.imageUrl})`,
                }}
              >
                <div className={styles.shadow}></div>
                <div className={styles.label}>
                  <div className={styles.icon}>
                    <p className={styles.emoji}>{option.icon}</p>
                  </div>
                  <div className={styles.info}>
                    <div className={styles.main}>{option.name}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CharacterPage;
