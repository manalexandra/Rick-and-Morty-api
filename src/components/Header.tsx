import styles from "../css/Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <h1 className={`${styles.header__heading} text-center mt-5 mb-0`}>
        Rick <span>And</span> Morty
      </h1>
    </header>
  );
};

export default Header;
