import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="main-header">
      <div className="logo">DAGA MEDIA</div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/our-films">Our Films</Link>
        <Link to="/what-we-do">What we do?</Link>
        <Link to="/about-us">About us</Link>
        <Link to="/contact">Contact</Link>
      </nav>
    </header>
  );
}
export default Header;