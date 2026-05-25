import { useNavigate, Link } from "react-router-dom";
import jobbigtImg from "./images/Jobbigt.png";

export default function Jobbigt({ setIsTransitioning }) {
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
        <h1>Jobbigt</h1>
        <p
          style={{
            fontSize: "1.2rem",
            color: "var(--color-charcoal)",
            fontWeight: "600",
          }}
        >
          AI-driven RPA för automatiserat jobbsökande
        </p>
      </div>

      <div className="cv-grid">
        <div className="cv-main-col">
          <img
            src={jobbigtImg}
            alt="Jobbigt Interface"
            style={{
              width: "100%",
              borderRadius: "12px",
              marginBottom: "30px",
              boxShadow: "0 10px 30px rgba(47, 62, 70, 0.1)",
            }}
          />

          <p>
            Att söka jobb kan ofta kännas som ett heltidsjobb i sig självt. Jag
            byggde <strong>Jobbigt</strong> för att utforska hur man kan
            kombinera modern AI med webbautomation för att ta bort det
            repetitiva och tråkiga i ansökningsprocessen, utan att tappa den
            personliga touchen.
          </p>

          <h2>Idén</h2>
          <p>
            Målet var att skapa en "end-to-end"-lösning där användaren bara
            behöver välja ett yrke och en ort, och sedan låta boten sköta
            resten: från att hitta relevanta annonser till att faktiskt fylla i
            formulären.
          </p>

          <h2>Hur det fungerar</h2>
          <p>
            Projektet är uppbyggt av tre huvudkomponenter som pratar med
            varandra:
          </p>
          <ul
            style={{
              marginBottom: "25px",
              paddingLeft: "20px",
              color: "var(--color-charcoal)",
            }}
          >
            <li style={{ marginBottom: "10px" }}>
              <strong>Smart Söklogik:</strong> Appen kopplar upp sig mot
              Arbetsförmedlingens API. Genom att mappa sökord mot officiella
              taxonomi-koder hittar boten exakt rätt annonser och prioriterar de
              system den är bäst på (optimerad för Teamtailor).
            </li>
            <li style={{ marginBottom: "10px" }}>
              <strong>Generativ AI (Google Gemini):</strong> För varje jobb som
              hittas analyserar boten annonstexten och matchar den mot
              användarens uppladdade CV. AI:n genererar sedan ett skräddarsytt
              personligt brev som är anpassat efter rollen och företagets ton.
            </li>
            <li style={{ marginBottom: "10px" }}>
              <strong>RPA-bot (Playwright):</strong> Detta är hjärtat i
              projektet. Boten öppnar en webbläsare i bakgrunden, navigerar till
              ansökningssidan och fyller i formuläret. Den hanterar allt från
              enkla textfält till komplexa element som dropdown-menyer,
              radioknappar och filuppladdningar.
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
              <strong>Dynamiska formulär:</strong> Att bygga en bot som förstår
              skillnaden mellan en "profilbilds-uppladdning" och en
              "CV-uppladdning" krävde en smart målsökande logik baserad på
              etiketter och DOM-struktur.
            </li>
            <li style={{ marginBottom: "10px" }}>
              <strong>Säkerhet & State:</strong> Byggde ett inloggningssystem
              med Flask och SQLite där användarens dokument konverteras (t.ex.
              bild till PDF) och sparas säkert.
            </li>
          </ul>

          <h2>Resultat</h2>
          <p>
            I mina tester uppnådde boten en extremt hög success rate på
            slumpmässigt valda Teamtailor-annonser. Den klarar av att hantera
            oväntade fält och säkerställer att all data, inklusive de
            konverterade PDF-filerna, laddas upp korrekt innan ansökan slutförs.
          </p>
        </div>

        <div className="cv-side-col">
          <h2> Tech Stack</h2>
          <ul className="skills-list">
            <li>Python (Flask)</li>
            <li>Playwright (RPA Automation)</li>
            <li>Google Gemini 3.1 Pro API</li>
            <li>JobTechDev API</li>
            <li>SQLite & SQLAlchemy</li>
            <li>HTML5, CSS3, JavaScript</li>
          </ul>

          <h2 style={{ marginTop: "50px" }}> Länkar</h2>
          <a
            href="https://github.com/HappyHamster135/ai-job-bot.git"
            target="_blank"
            rel="noreferrer"
            className="submit-btn"
            style={{
              display: "block",
              textAlign: "center",
              textDecoration: "none",
              marginBottom: "15px",
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
