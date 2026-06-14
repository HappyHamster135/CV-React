import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import CV from "./CV";
import About from "./About";
import Contact from "./Contact";
import Snoit from "./Snoit";
import Jobbigt from "./Jobbigt";
import TrueBorders from "./TrueBorders";

import jagImg from "./images/Jag.jpg";
import jag1Img from "./images/Jag1.jpg";

export default function App() {
  const [jonathanMode, setJonathanMode] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const location = useLocation();

  // Styr scroll och specifika klasser beroende på om vi är på startsidan eller inte
  useEffect(() => {
    if (location.pathname === "/") {
      document.body.classList.add("portfolio-page");
      // Desktop kör horisontell scroll (overflow hidden),
      // men mobil-layouten är vertikal och måste få scrolla normalt.
      if (window.innerWidth > 1024) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflowY = "auto";
        document.body.style.overflowX = "hidden";
      }
    } else {
      document.body.classList.remove("portfolio-page");
      document.body.style.overflowY = "auto";
      document.body.style.overflowX = "hidden";
    }

    // Nollställ transition-flaggan i nästa frame (inte synkront)
    const raf = requestAnimationFrame(() => setIsTransitioning(false));
    return () => cancelAnimationFrame(raf);
  }, [location.pathname]);

  // Hemligt easter egg: Användaren måste skriva in koden för att trigga jonathanMode
  useEffect(() => {
    let typedCode = "";
    const secretJonathan = "jonathanwenell";

    const handleKeyDown = (e) => {
      typedCode += e.key.toLowerCase();
      if (typedCode.length > 20) {
        typedCode = typedCode.slice(-20);
      }
      if (typedCode.endsWith(secretJonathan)) {
        setJonathanMode((prev) => !prev);
        typedCode = "";
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Uppdaterar body-klasserna när något av våra teman ändras
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.remove("dark-theme");
    }

    if (jonathanMode) {
      document.body.classList.add("jonathan-theme");
    } else {
      document.body.classList.remove("jonathan-theme");
    }
  }, [darkMode, jonathanMode]);

  // Skickas med som prop så att man kan toggla temat inifrån Home-komponenten
  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <div className="app-container">
      {/* Vit fade-overlay som visas när vi byter sida */}
      <div
        id="loader-bg"
        className={!isTransitioning ? "loader-finished" : ""}
        style={{
          opacity: isTransitioning ? 1 : 0,
          visibility: isTransitioning ? "visible" : "hidden",
          transition: "opacity 0.5s ease-in-out, visibility 0.5s",
        }}
      ></div>

      {/* Rutnät av bilder som täcker hela skärmen bakom allt annat vid jonathanMode */}
      {jonathanMode && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: -1,
            display: "grid",
            gridTemplateColumns: "repeat(10, 1fr)",
            gridTemplateRows: "repeat(10, 1fr)",
            backgroundColor: "#000",
          }}
        >
          {Array.from({ length: 100 }).map((_, i) => {
            const row = Math.floor(i / 10);
            const col = i % 10;
            const img =
              (row + col) % 2 === 0 ? `url(${jagImg})` : `url(${jag1Img})`;
            return (
              <div
                key={i}
                style={{
                  backgroundImage: img,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  animation: `fadeIn 0.4s ease forwards`,
                  animationDelay: `${i * 25}ms`,
                  opacity: 0,
                }}
              />
            );
          })}
        </div>
      )}

      <Navbar setIsTransitioning={setIsTransitioning} />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              setIsTransitioning={setIsTransitioning}
              toggleDarkMode={toggleDarkMode}
            />
          }
        />
        <Route path="/cv" element={<CV />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/trueborders"
          element={<TrueBorders setIsTransitioning={setIsTransitioning} />}
        />
        <Route
          path="/snoit"
          element={<Snoit setIsTransitioning={setIsTransitioning} />}
        />
        <Route
          path="/jobbigt"
          element={<Jobbigt setIsTransitioning={setIsTransitioning} />}
        />
      </Routes>
    </div>
  );
}
