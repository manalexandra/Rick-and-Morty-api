import AllCharacters from "../components/AllCharacters";
import styles from "../css/HomePage.module.css";
import style from "../App.module.css";
import ship from "../assets/ship.png";
import Header from "../components/Header";

const HomePage = () => {
  return (
    <div className="homepage">
      <div id={style.stars}></div>
      <div id={style.stars2}></div>
      <div id={style.stars3}></div>
      <div className="container">
        <Header></Header>
        <img
          className={`${styles.ship} rounded mx-auto d-block`}
          src={ship}
          alt="Ship"
        />
        <AllCharacters></AllCharacters>
      </div>
    </div>
  );
};

export default HomePage;
