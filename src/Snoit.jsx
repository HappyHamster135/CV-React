import { useNavigate, Link } from "react-router-dom";
import snoitImg from "./images/snoit.png";

export default function Snoit({ setIsTransitioning }) {
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
        <h1>Snöit</h1>
        <p
          style={{
            fontSize: "1.2rem",
            color: "var(--color-charcoal)",
            fontWeight: "600",
          }}
        >
          Realtidsdata för skandinaviska skidorter
        </p>
      </div>

      <div className="cv-grid">
        <div className="cv-main-col">
          <img
            src={snoitImg}
            alt="Snöit Interface"
            style={{
              width: "100%",
              borderRadius: "12px",
              marginBottom: "30px",
              boxShadow: "0 10px 30px rgba(47, 62, 70, 0.1)",
            }}
          />

          <p>
            Att planera en skidresa kräver ofta att man hoppar mellan flera
            olika tunga hemsidor för att kolla väder, liftar och snödjup. Jag
            byggde <strong>Snöit</strong> för att lösa detta genom att samla all
            kritisk information i ett blixtsnabbt och mobiloptimerat gränssnitt.
          </p>

          <h2>Iden</h2>
          <p>
            Målet var att skapa en central knutpunkt för skidåkare. Istället för
            att navigera komplexa menyer på stora webbplatser får användaren
            allt på ett ställe genom ett enda klick, från aktuellt snödjup till
            exakta öppettider.
          </p>

          <h2>Hur det fungerar</h2>
          <p>
            Applikationen är en fullstack-lösning som kombinerar rå
            dataextraktion med moderna API-integrationer:
          </p>
          <ul
            style={{
              marginBottom: "25px",
              paddingLeft: "20px",
              color: "var(--color-charcoal)",
            }}
          >
            <li style={{ marginBottom: "10px" }}>
              <strong>Web Scraping (Node.js):</strong> Backend-servern skrapar
              Skistars officiella källor i realtid...
            </li>
            <li style={{ marginBottom: "10px" }}>
              <strong>API-integration (Open-Meteo):</strong> För att ge en
              komplett bild hämtar appen exakta väderprognoser...
            </li>
            <li style={{ marginBottom: "10px" }}>
              <strong>Interaktiva Kartor:</strong> Genom ett anpassat
              koordinatsystem kan användaren se position på pistkartan...
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
              <strong>Datastabilitet:</strong> Implementerade ett caching-system
              för att hantera om källsidan går ner.
            </li>
            <li style={{ marginBottom: "10px" }}>
              <strong>Mobiloptimering:</strong> Avancerad CSS Grid-layout för
              maximal läsbarhet.
            </li>
          </ul>

          <h2>Resultat</h2>
          <p>
            En högpresterande webbapp (snoit.eu) med SSL och automatiserad
            deployment via Vercel.
          </p>
        </div>

        <div className="cv-side-col">
          <h2> Tech Stack</h2>
          <ul className="skills-list">
            <li>JavaScript (ES6+)</li>
            <li>Node.js & Express</li>
            <li>Web Scraping (Regex/Fetch)</li>
            <li>Open-Meteo API</li>
            <li>CSS Grid & Flexbox</li>
            <li>Vercel & Render (Deployment)</li>
          </ul>

          <h2 style={{ marginTop: "50px" }}> Länkar</h2>

          <a
            href="https://github.com/HappyHamster135/Snoit-hemsida.git"
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
