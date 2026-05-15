import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import AboutUs from './components/AboutUs/AboutUs';
import WhatDoWeDo from './components/WhatDoWeDo/WhatDoWeDo';
import OurFilms from './components/Ourfilms/OurFilms';
import Contact from './components/Contact/Contact';

function App() {
  return (
    <Router>
      <Header />
      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/what-we-do" element={<WhatDoWeDo />} />
          <Route path="/our-films" element={<OurFilms />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;