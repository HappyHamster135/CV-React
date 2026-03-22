import { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import CV from './CV';
import About from './About';
import Contact from './Contact';
import Snoit from './Snoit';
import Jobbigt from './Jobbigt';

export default function App() {
  const [jonathanMode, setJonathanMode] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const location = useLocation();

  // 1. Hantera rullning, body-klasser och sidövergångar
  useEffect(() => {
    if (location.pathname === '/') {
      document.body.classList.add('portfolio-page');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.classList.remove('portfolio-page');
      document.body.style.overflowY = 'auto';
      document.body.style.overflowX = 'hidden';
    }
    setIsTransitioning(false);
  }, [location.pathname]);

  // 2. PÅSKÄGG 1: JONATHAN MODE (Nu utan mellanslag!)
  useEffect(() => {
    let typedCode = '';
    const secretJonathan = 'jonathanwenell'; // Uppdaterat!

    const handleKeyDown = (e) => {
      typedCode += e.key.toLowerCase();
      if (typedCode.length > 20) {
        typedCode = typedCode.slice(-20);
      }
      if (typedCode.endsWith(secretJonathan)) {
        setJonathanMode(prev => !prev);
        typedCode = '';
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // 3. Applicera Dark Mode OCH Jonathan Mode på body-taggen
  useEffect(() => {
    // Dark mode logik
    if (darkMode) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }

    // NYTT: Jonathan mode logik (gör sidan genomskinlig)
    if (jonathanMode) {
      document.body.classList.add('jonathan-theme');
    } else {
      document.body.classList.remove('jonathan-theme');
    }
  }, [darkMode, jonathanMode]); // Lägg till jonathanMode här i listan

  // Funktion som vi skickar till Home.jsx så att texten kan klickas på
  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  return (
    <div className="app-container">
      {/* 1. LADDNINGSSKÄRMEN (som tidigare) */}
      <div
        id="loader-bg"
        className={!isTransitioning ? 'loader-finished' : ''}
        style={{
          opacity: isTransitioning ? 1 : 0,
          visibility: isTransitioning ? 'visible' : 'hidden',
          transition: 'opacity 0.5s ease-in-out, visibility 0.5s'
        }}
      ></div>

      {/* 2. PÅSKÄGG 1: JONATHAN MODE (Flyttat hit och uppdaterat stilarna!) */}
      {jonathanMode && (
        <div style={{
          position: 'fixed', // Låser den till hela fönstret
          inset: 0,          // Täcker precis allt (topp, botten, vänster, höger)
          zIndex: -1,        // Sätter den *bakom* allt annat innehåll
          display: 'grid',
          gridTemplateColumns: 'repeat(10, 1fr)',
          gridTemplateRows: 'repeat(10, 1fr)',
          backgroundColor: '#000'
        }}>
          {Array.from({ length: 100 }).map((_, i) => {
            const row = Math.floor(i / 10);
            const col = i % 10;
            const img = (row + col) % 2 === 0 ? 'url("/images/Jag.jpg")' : 'url("/images/Jag1.jpg")';
            return (
              <div key={i} style={{ backgroundImage: img, backgroundSize: 'cover', backgroundPosition: 'center', animation: `fadeIn 0.4s ease forwards`, animationDelay: `${i * 25}ms`, opacity: 0 }} />
            );
          })}
        </div>
      )}

      {/* 3. NAVIGERINGEN */}
      <Navbar setIsTransitioning={setIsTransitioning} />

      {/* 4. SIDORNA */}
      <Routes>
        <Route path="/" element={<Home setIsTransitioning={setIsTransitioning} toggleDarkMode={toggleDarkMode} />} />
        <Route path="/cv" element={<CV />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/snoit" element={<Snoit setIsTransitioning={setIsTransitioning} />} />
        <Route path="/jobbigt" element={<Jobbigt setIsTransitioning={setIsTransitioning} />} />
      </Routes>
    </div>
  );
}