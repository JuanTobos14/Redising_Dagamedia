// src/App.jsx
import AboutUs from './components/AboutUs/AboutUs';
import WhatDoWeDo from './components/WhatDoWeDo/WhatDoWeDo'; // Asegúrate de que el archivo se llame igual que la carpeta
import OurFilms from './components/Ourfilms/OurFilms';
import Contact from './components/Contact/Contact';

function App() {
  return (
    <main style={{ backgroundColor: '#000', color: '#fff' }}>
      <AboutUs />
      <WhatDoWeDo />
      <OurFilms />
      <Contact />
    </main>
  );
}

export default App;