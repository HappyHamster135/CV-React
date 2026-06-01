import { useNavigate } from "react-router-dom";
import trueBordersImg from "./images/trueborder.png";

export default function TrueBorders({ setIsTransitioning }) {
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
        <h1>True Borders</h1>
        <p
          style={{
            fontSize: "1.2rem",
            color: "var(--color-charcoal)",
            fontWeight: "600",
          }}
        >
          Borderless windowed mode för Windows — snabbt, smidigt, osynligt
        </p>
      </div>

      <div className="cv-grid">
        <div className="cv-main-col">
          <img
            src={trueBordersImg}
            alt="True Borders Interface"
            style={{
              width: "100%",
              borderRadius: "12px",
              marginBottom: "30px",
              boxShadow: "0 10px 30px rgba(47, 62, 70, 0.1)",
            }}
          />

          <p>
            Många spel saknar ett riktigt borderless-läge — antingen är de låsta
            i fullscreen eller så har de fula fönsterramar. Jag byggde{" "}
            <strong>True Borders</strong> för att lösa det med ett enda klick,
            samtidigt som appen lever diskret i bakgrunden och kommer ihåg
            inställningar per spel.
          </p>

          <h2>Iden</h2>
          <p>
            Verktyget skulle vara så lätt och osynligt att man glömmer bort att
            det körs. Inga installationer, inga konfigurationsfiler. Bara en
            visuell karta över skärmarna där man drar och släpper sitt spel på
            rätt plats, och en profil sparas automatiskt.
          </p>

          <h2>Hur det fungerar</h2>
          <p>
            Applikationen är en hybrid mellan en Python-backend och ett modernt
            webbgränssnitt via Eel-ramverket:
          </p>
          <ul
            style={{
              marginBottom: "25px",
              paddingLeft: "20px",
              color: "var(--color-charcoal)",
            }}
          >
            <li style={{ marginBottom: "10px" }}>
              <strong>Windows API (pywin32):</strong> Manipulerar fönsterstilar
              direkt via SetWindowPos för att strippa kantramar utan att störa
              spelets rendering.
            </li>
            <li style={{ marginBottom: "10px" }}>
              <strong>Visual Map:</strong> Interaktiv multi-monitor-karta där
              spelfönstret kan placeras pixel-perfekt med drag, snap, och
              D-pad-finjustering.
            </li>
            <li style={{ marginBottom: "10px" }}>
              <strong>Smart matchning:</strong> Profiler matchas via exe-sökväg
              och ikon, inte fönstertitel — så att spel som Terraria, som
              slumpar sin titel vid varje start, ändå alltid hittas rätt.
            </li>
            <li style={{ marginBottom: "10px" }}>
              <strong>Spelmotor-integration:</strong> Skriver upplösning direkt
              till Paradox- och Terraria-config-filer så att spelets interna
              renderingsupplösning matchar fönstret.
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
              <strong>Slumpade fönstertitlar:</strong> Byggde en poängsättande
              matchare som väger exe-sökväg över ikon över titel för robust
              identifiering.
            </li>
            <li style={{ marginBottom: "10px" }}>
              <strong>Auto-uppdaterare:</strong> Egen Tkinter-baserad updater
              som hämtar nya releaser från GitHub, byter ut sig själv atomärt
              och startar om — helt utan att användaren behöver göra något.
            </li>
            <li style={{ marginBottom: "10px" }}>
              <strong>Drift-skydd:</strong> Bakgrundstråd som upptäcker när spel
              försöker återta sin storlek och tvingar tillbaka borderless inom
              millisekunder.
            </li>
          </ul>

          <h2>Resultat</h2>
          <p>
            En tray-applikation som körs på tusentals fönster i bakgrunden utan
            att slö ner systemet, med inbyggd auto-updater så användarna alltid
            har senaste versionen.
          </p>
        </div>

        <div className="cv-side-col">
          <h2> Tech Stack</h2>
          <ul className="skills-list">
            <li>Python 3</li>
            <li>Eel (web-frontend för Python)</li>
            <li>pywin32 & Windows API</li>
            <li>JavaScript</li>
            <li>HTML & CSS</li>
            <li>PyInstaller</li>
          </ul>

          <h2 style={{ marginTop: "50px" }}> Länkar</h2>

          <a
            href="https://github.com/HappyHamster135/True-Borders"
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
            href="https://github.com/HappyHamster135/True-Borders/releases"
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
            Ladda ner senaste versionen
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
