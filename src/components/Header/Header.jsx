import './Header.css';

function Header() {
  return (
    <header className="main-header">
      <div className="logo">DAGA MEDIA</div>
      <nav>
        <a href="#home">Home</a>
        <a href="#our-films">Our Films</a>
        <a href="#what-we-do">What we do?</a>
        <a href="#about-us">About us</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>
  );
}

export default Header;