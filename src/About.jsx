export default function About() {
  return (
    <main className="cv-page">
      <div className="cv-header">
        <h1>Hej, jag är Jonathan!</h1>
        <p
          style={{
            fontSize: "1.2rem",
            color: "var(--color-charcoal)",
            fontWeight: "600",
          }}
        >
          Problemlösare, tech entusiast och äventyrare.
        </p>
      </div>

      <div className="cv-grid">
        <div className="cv-main-col">
          <p>
            När jag inte kodar i .NET eller grejar med servrar, gillar jag
            verkligen att ta reda på hur saker fungerar, både under huven och i
            stort.
          </p>

          <h2>Hårdvara, Drönare & Elektronik</h2>
          <p>
            Mitt teknikintresse stannar inte bara vid mjukvara. Jag tycker det
            är riktigt kul att laga trasig elektronik och väcka liv i gamla
            prylar. Ett av mina största intressen är att bygga och skruva med
            drönare och radiostyrt. Det är en grym mix av mekanik, elektronik
            och kod. Att vara så hands on gör att jag är bekväm med att felsöka
            allt från koden till själva hårdvaran.
          </p>

          <h2>Klättring, Skidor & Disciplin</h2>
          <p>
            När jag inte sitter framför skärmen hittar du mig antagligen på en
            klättervägg eller i skidbacken. Klättring är grym problemlösning:
            man måste ha tålamod, fokusera och alltid planera nästa steg, vilket
            är exakt samma tänk jag använder när jag kodar. Utöver det gjorde
            jag lumpen som stridsvagnsskytt i Försvarsmakten, vilket gav mig bra
            disciplin och lärde mig att samarbeta i team även när det är
            stressigt.
          </p>
        </div>

        <div className="cv-side-col">
          <h2> Snabba Fakta</h2>
          <ul className="skills-list">
            <li>Bygger & flyger drönare</li>
            <li>Lagar trasig elektronik</li>
            <li>Data & servrar</li>
            <li>Klättrar & åker skidor</li>
            <li>Älskar växter</li>
          </ul>

          <h2 style={{ marginTop: "50px" }}> Varför anställa mig?</h2>
          <p
            style={{
              fontSize: "0.95rem",
              color: "var(--color-slate)",
              lineHeight: "1.6",
            }}
          >
            Med mig får du en utvecklare som fattar helheten. Jag förstår hur
            mjukvaran pratar med hårdvaran, hur nätverket hänger ihop och kanske
            det viktigaste hur man funkar bra ihop i ett team. Jag är envis, lär
            mig snabbt och ger mig inte i första taget när jag stöter på en
            knepig bugg.
          </p>
        </div>
      </div>
    </main>
  );
}
