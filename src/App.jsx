import React from 'react';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div>
      <main>
        {/* Dejamos el espacio principal vacío por ahora */}
        <p style={{ textAlign: 'center', padding: '50px' }}>Contenido temporal de la página...</p>
      </main>

      {/* Solo se mostrará el visual del Footer al final */}
      <Footer />
    </div>
  );
}

export default App;