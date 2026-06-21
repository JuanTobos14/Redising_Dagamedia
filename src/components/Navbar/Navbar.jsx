import styles from "./Navbar.module.css";
import logo from "../../assets/Logo-DAGAMEDIA-Encabezado.png";

function Navbar() {
  return (
    <header className={styles.header}>

      <div className={styles.logoContainer}>
        <img src={logo} alt="Dagamedia" />
      </div>

      <nav className={styles.navbar}>
        <ul className={styles.menu}>
          <li className={styles.active}>Home</li>
          <li>What do we do?</li>
          <li>Our films</li>
          <li>About us</li>
          <li>Contact</li>
        </ul>

        <div className={styles.right}>
          <span>▼</span>
          <span>EN</span>
          <span>🌐</span>
        </div>
      </nav>

    </header>
  );
}

export default Navbar;