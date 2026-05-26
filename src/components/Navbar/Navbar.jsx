import styles from "./Navbar.module.css";
import logo from "../../assets/Logo-DAGAMEDIA-Encabezado.png";

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarLogo}>
        <img src={logo} alt="Dagamedia" />
      </div>

      <div className={styles.navbarLinks}>
        <a className={styles.liquidNavButton} href="#home">
          <span>Home</span>
        </a>

        <a className={styles.liquidNavButton} href="#what-do-we-do">
          <span>What do we do?</span>
        </a>

        <a className={styles.liquidNavButton} href="#our-films">
          <span>Our films</span>
        </a>

        <a className={styles.liquidNavButton} href="#about-us">
          <span>About us</span>
        </a>

        <a className={styles.liquidNavButton} href="#contact">
          <span>Contact</span>
        </a>
      </div>

      <div className={styles.language}>
        <span>EN</span>
        <span>◎</span>
      </div>
    </nav>
  );
}

export default Navbar;