import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import WhatDoWeDo from "./components/WhatDoWeDo/WhatDoWeDo";
import AboutUs from "./components/About-us/AboutUs";
import { ContactLayout } from "./components/Contact";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div style={{ backgroundColor: "#0b0b0b", minHeight: "100vh", margin: 0, padding: 0 }}>
      <Navbar />
      <Home />
      <WhatDoWeDo />
      <AboutUs />
      <ContactLayout />
      <Footer />
    </div>
  );
}

export default App;