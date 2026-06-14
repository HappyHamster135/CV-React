import cvData from "./cvData.json";

export default function CV() {
  return (
    <main className="cv-page">
      <header className="cv-header">
        <h1>Jonathan Wenell</h1>
        <p className="cv-intro">
          Erfaren och målinriktad tekniker med bred kompetens inom
          Programmering, design och nätverksteknik.
        </p>
      </header>

      <div className="cv-grid">
        <div className="cv-main-col">
          <section>
            <h2>Arbetslivserfarenhet</h2>
            {cvData.experience.map((job, index) => (
              <div className="cv-item" key={index}>
                <h3>{job.title}</h3>
                <p>{job.description}</p>
              </div>
            ))}
          </section>

          <section>
            <h2>Utbildning</h2>
            {cvData.education.map((edu, index) => (
              <div className="cv-item" key={index}>
                <h3>{edu.title}</h3>
                <p>{edu.description}</p>
              </div>
            ))}
          </section>
        </div>

        <aside className="cv-side-col">
          <section className="cv-sidebar-box">
            <h2>Kontakt</h2>
            <p>
              <a
                href="mailto:jwenell99@gmail.com"
                style={{ color: "var(--color-slate)" }}
              >
                jwenell99@gmail.com
              </a>
            </p>
            <p>Stockholm, Sverige</p>
          </section>

          <section className="cv-sidebar-box">
            <h2>Färdigheter</h2>
            <ul className="skills-list">
              <li>CSS, C#, Python, Java, SQL & React </li>
              <li>Nätverk (Cisco CCNA)</li>
              <li>Windows, Linux & Mac</li>
              <li>Fusion 360, Unity & Visual studio</li>
              <li>Excel, Sales Force & MEWS</li>
            </ul>
          </section>

          <section className="cv-sidebar-box">
            <h2>Språk</h2>
            <p>Svenska & Engelska</p>
          </section>
        </aside>
      </div>
    </main>
  );
}
