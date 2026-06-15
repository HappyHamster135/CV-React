// src/SvenskGeo.jsx (eller var du har dina komponenter)
import { useNavigate } from "react-router-dom";
// Importera din bild här
import svenskGeoImg from "./images/svensk-geo.png";

export default function SvenskGeo({ setIsTransitioning }) {
  const navigate = useNavigate();

  const handleBack = (e) => {
    e.preventDefault();
    setIsTransitioning(true);
    setTimeout(() => {
      navigate("/");
    }, 500);
  };

  return (
    <main className="cv-page">
      <div className="cv-header">
        <h1>Svensk Geo</h1>
        <p
          style={{
            fontSize: "1.2rem",
            color: "var(--color-charcoal)",
            fontWeight: "600",
          }}
        >
          Interaktivt lärande om Sveriges geografi
        </p>
      </div>

      <div className="cv-grid">
        <div className="cv-main-col">
          <img
            src={svenskGeoImg}
            alt="Svensk Geo Interface"
            style={{
              width: "100%",
              borderRadius: "12px",
              marginBottom: "30px",
              boxShadow: "0 10px 30px rgba(47, 62, 70, 0.1)",
            }}
          />

          <p>
            Att lära sig Sveriges landskap, städer och hav kan vara en utmaning.
            Jag byggde <strong>Svensk Geo</strong> för att göra denna process
            interaktiv, engagerande och rolig genom visualisering och
            gamification.
          </p>

          <h2>Idén</h2>
          <p>
            Målet var att skapa ett verktyg där användaren visuellt kan utforska
            Sverige. Istället för att bara läsa listor, får användaren
            interagera med kartor och testa sina kunskaper i olika quiz-lägen.
          </p>

          <h2>Hur det fungerar</h2>
          <p>
            Applikationen fokuserar på en sömlös användarupplevelse med dynamisk
            kartrendering:
          </p>
          <ul
            style={{
              marginBottom: "25px",
              paddingLeft: "20px",
              color: "var(--color-charcoal)",
            }}
          >
            <li style={{ marginBottom: "10px" }}>
              <strong>Dynamisk Kartinteraktion:</strong> Använder SVG-kartor
              eller kartbibliotek för att låta användaren klicka på regioner.
            </li>
            <li style={{ marginBottom: "10px" }}>
              <strong>State Management:</strong> Hanterar valda landskap,
              poängställning och nuvarande fråga i realtid.
            </li>
            <li style={{ marginBottom: "10px" }}>
              <strong>Responsiv Design:</strong> Anpassad för att fungera lika
              bra på surfplattor i klassrummet som på stationära datorer.
            </li>
          </ul>

          <h2>Tekniska utmaningar jag löste</h2>
          <ul
            style={{
              marginBottom: "25px",
              paddingLeft: "20px",
              color: "var(--color-charcoal)",
            }}
          >
            <li style={{ marginBottom: "10px" }}>
              <strong>Optimering av vektorgrafik:</strong> Säkerställde att den
              interaktiva kartan laddar snabbt och renderar mjukt även på äldre
              enheter.
            </li>
            <li style={{ marginBottom: "10px" }}>
              <strong>Logik för Quiz:</strong> Implementerade algoritmer för att
              slumpa frågor och validera svar mot geografiska koordinater/id:n.
            </li>
          </ul>

          <h2>Resultat</h2>
          <p>
            En pedagogisk webbapplikation som gör geografiundervisningen mer
            modern och tillgänglig.
          </p>
        </div>

        <div className="cv-side-col">
          <h2> Tech Stack</h2>
          <ul className="skills-list">
            <li>React</li>
            <li>JavaScript (ES6+)</li>
            <li>SVG / HTML5 Canvas</li>
            <li>CSS Grid & Flexbox</li>
            <li>Vercel (Deployment)</li>
            {/* Lägg till fler tekniker om du använde backend t.ex. Node.js */}
          </ul>

          <h2 style={{ marginTop: "50px" }}> Länkar</h2>

          <a
            href="https://github.com/HappyHamster135/Svensk-geo.git"
            target="_blank"
            rel="noreferrer"
            className="submit-btn"
            style={{
              display: "block",
              textAlign: "center",
              textDecoration: "none",
              marginBottom: "15px",
              backgroundColor: "var(--color-slate)",
            }}
          >
            Se kod på GitHub
          </a>

          {/* Om du har en live-demo, avkommentera detta: */}
          {/* <a
            href="https://din-demo-lank.com"
            target="_blank"
            rel="noreferrer"
            className="submit-btn"
            style={{
              display: "block",
              textAlign: "center",
              textDecoration: "none",
              marginBottom: "15px",
              backgroundColor: "var(--color-sage)",
            }}
          >
            Se Live Demo
          </a> 
          */}

          <a
            href="/"
            onClick={handleBack}
            style={{
              display: "block",
              textAlign: "center",
              color: "var(--color-slate)",
              fontWeight: "700",
              textDecoration: "none",
              marginTop: "25px",
              fontSize: "0.9rem",
              textTransform: "uppercase",
              letterSpacing: "1px",
              cursor: "pointer",
            }}
          >
            ← Tillbaka till Portfolio
          </a>
        </div>
      </div>
    </main>
  );
}
