import { Link } from "react-router-dom";
import style from "../css/Menu.module.css";

const Menu = () => {
  return (
    <div className={style["menu-dropdown"]}>
      <div className={style["menu-icon"]}>&#9776;</div>
      <div className={style["dropdown-content"]}>
        <Link to="/">All Characters</Link>
        <Link to="/episodes">All Episodes</Link>
      </div>
    </div>
  );
};

export default Menu;
