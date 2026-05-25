import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import AboutUs from './components/AboutUs/AboutUs';
import WhatDoWeDo from './components/WhatDoWeDo/WhatDoWeDo';
import OurFilms from './components/Ourfilms/OurFilms';
import ContactLayout from './components/Contact/ContactLayout';

function App() {
  return (
    <div className="app-container">
      <Header />
      <main>
        <section id="home">
          <Home />
        </section>
        <section id="our-films">
          <OurFilms />
        </section>
        <section id="what-we-do">
          <WhatDoWeDo />
        </section>
        <section id="about-us">
          <AboutUs />
        </section>
        <section id="contact">
          <ContactLayout />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
