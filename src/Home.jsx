import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import jobbigtImg from "./images/Jobbigt.png";
import snoitImg from "./images/snoit.png";

export default function Home({ setIsTransitioning, toggleDarkMode }) {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);

  const navigate = useNavigate();
  const scrollContainerRef = useRef(null);
  const scrollBarRef = useRef(null);

  const scrollInnerRef = useRef(null);

  const handleActionNavigation = (e, path) => {
    e.preventDefault();
    setIsTransitioning(true);
    setTimeout(() => {
      navigate(path);
    }, 500);
  };

  useEffect(() => {
    const manualProjects = [
      {
        id: "jobbigt",
        name: "Jobbigt AI-driven RPA",
        description: "En intelligent bot som automatiserar jobbsökande...",
        image: jobbigtImg,
        html_url: "https://github.com/HappyHamster135/ai-job-bot.git",
        readMorePath: "/jobbigt",
      },
      {
        id: "snoit",
        name: "Snöit din guide till fjällen",
        description: "Realtidsdata för skandinaviska skidorter...",
        image: snoitImg,
        html_url: "https://github.com/HappyHamster135/Snoit-hemsida.git",
        live_url: "https://snoit.eu",
        readMorePath: "/snoit",
      },
    ];

    fetch("https://api.github.com/users/HappyHamster135/repos")
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          console.warn(
            "GitHub API gräns nådd, visar bara egna projekt tills vidare.",
          );
          setProjects(manualProjects);
        } else {
          setProjects([...manualProjects, ...data]);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setProjects(manualProjects);
        setIsLoading(false);
      });
  }, []);

  // 2. SCROLL & ANIMATIONSLOGIK
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    let currentScrollLeft = 0;
    let velocity = 0;
    const friction = 0.99;
    const wheelMultiplier = 0.03;
    let animationFrameId;

    const siteLogo = document.getElementById("site-logo");
    const scrollHint = document.querySelector(".scroll-hint");
    const scrollText = document.querySelector(".scroll-text");

    const handleWheel = (e) => {
      if (window.innerWidth <= 1024) return;
      if (e.deltaX !== 0) return;
      e.preventDefault();
      velocity += e.deltaY * wheelMultiplier;
    };

    const update = () => {
      if (window.innerWidth > 1024) {
        const scrollInner = scrollInnerRef.current;
        if (!scrollInner) {
          animationFrameId = requestAnimationFrame(update);
          return;
        }

        const maxScroll = scrollInner.scrollWidth - scrollContainer.clientWidth;

        currentScrollLeft += velocity;

        if (currentScrollLeft < 0) {
          currentScrollLeft = 0;
          velocity = 0;
        } else if (currentScrollLeft > maxScroll) {
          currentScrollLeft = maxScroll;
          velocity = 0;
        }

        velocity *= friction;

        if (Math.abs(velocity) < 0.05) {
          velocity = 0;
        }

        const skew = velocity * 0.15;

        scrollInner.style.transform = `translateX(${-currentScrollLeft}px) skewX(${skew}deg)`;

        // Disable hover under scroll
        if (Math.abs(velocity) > 1) {
          scrollContainer.classList.add("is-scrolling");
        } else {
          scrollContainer.classList.remove("is-scrolling");
        }

        if (currentScrollLeft > 10) {
          if (scrollHint) scrollHint.classList.add("hidden");
          if (scrollText) scrollText.classList.add("hidden");
          if (siteLogo) {
            siteLogo.style.opacity = "0";
            siteLogo.style.pointerEvents = "none";
          }
        } else {
          if (scrollHint) scrollHint.classList.remove("hidden");
          if (scrollText) scrollText.classList.remove("hidden");
          if (siteLogo) {
            siteLogo.style.opacity = "1";
            siteLogo.style.pointerEvents = "auto";
          }
        }

        // Progress bar
        if (scrollBarRef.current && maxScroll > 0) {
          const scrollPercentage = (currentScrollLeft / maxScroll) * 100;
          scrollBarRef.current.style.height = scrollPercentage + "%";
        }
      } else {
        const scrollInner = scrollInnerRef.current;
        if (scrollInner) scrollInner.style.transform = "none";
      }
      animationFrameId = requestAnimationFrame(update);
    };

    const handleMobileScroll = () => {
      if (window.innerWidth <= 1024) {
        const currentScrollY = window.scrollY;

        if (scrollBarRef.current) {
          const windowHeight = window.innerHeight;
          const fullHeight = document.documentElement.scrollHeight;
          const maxScrollY = fullHeight - windowHeight;

          if (maxScrollY > 0) {
            const scrollPercentage = (currentScrollY / maxScrollY) * 100;
            scrollBarRef.current.style.height = scrollPercentage + "%";
          }
        }

        if (currentScrollY > 10) {
          if (scrollHint) scrollHint.classList.add("hidden");
          if (scrollText) scrollText.classList.add("hidden");
          if (siteLogo) {
            siteLogo.style.opacity = "0";
            siteLogo.style.pointerEvents = "none";
          }
        } else {
          if (scrollHint) scrollHint.classList.remove("hidden");
          if (scrollText) scrollText.classList.remove("hidden");
          if (siteLogo) {
            siteLogo.style.opacity = "1";
            siteLogo.style.pointerEvents = "auto";
          }
        }
      }
    };

    scrollContainer.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("scroll", handleMobileScroll);
    update();

    return () => {
      scrollContainer.removeEventListener("wheel", handleWheel);
      window.removeEventListener("scroll", handleMobileScroll);
      cancelAnimationFrame(animationFrameId);

      if (siteLogo) {
        siteLogo.style.opacity = "1";
        siteLogo.style.pointerEvents = "auto";
      }
    };
  }, [isLoading]);

  return (
    <div className="portfolio-page no-copy">
      <main className="full-screen-portfolio">
        {isLoading ? (
          <div style={{ margin: "0 auto", textAlign: "center" }}>
            <h2 style={{ color: "var(--color-slate)" }}>
              Laddar in projekt... ⏳
            </h2>
          </div>
        ) : (
          <>
            <div className="portfolio-scroll" ref={scrollContainerRef}>
              <div className="portfolio-scroll-inner" ref={scrollInnerRef}>
                {projects.map((repo) => (
                  <div
                    className="project"
                    key={repo.id}
                    onClick={() => setSelectedProject(repo)}
                  >
                    {repo.image ? (
                      <img src={repo.image} alt={repo.name} />
                    ) : (
                      <div
                        style={{
                          padding: "30px",
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                        }}
                      >
                        <h3
                          style={{
                            color: "var(--color-slate)",
                            marginBottom: "15px",
                          }}
                        >
                          {repo.name}
                        </h3>
                        <p
                          style={{
                            color: "var(--color-sage)",
                            fontWeight: "bold",
                          }}
                        >
                          Klicka för att läsa mer →
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="scroll-indicator-wrap">
              <div
                className="scroll-text"
                onClick={toggleDarkMode}
                style={{ cursor: "pointer" }}
              >
                Scroll
              </div>

              <div className="progress-bar-container">
                <div className="progress-bar-fill" ref={scrollBarRef}></div>
              </div>
              <div className="scroll-hint">Programmerare & Designer</div>
            </div>

            {selectedProject && (
              <div
                className="modal"
                style={{ display: "flex" }}
                onClick={() => setSelectedProject(null)}
              >
                <div
                  className="modal-content"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span
                    className="close"
                    onClick={() => setSelectedProject(null)}
                  >
                    &times;
                  </span>

                  {selectedProject.image && (
                    <img
                      id="modal-img"
                      src={selectedProject.image}
                      alt={selectedProject.name}
                    />
                  )}

                  <h2 id="modal-title">{selectedProject.name}</h2>
                  <p id="modal-desc">
                    {selectedProject.description ||
                      "Ingen beskrivning tillgänglig."}
                  </p>

                  <div className="modal-links">
                    {selectedProject.readMorePath && (
                      <a
                        href={selectedProject.readMorePath}
                        className="modal-btn"
                        onClick={(e) =>
                          handleActionNavigation(
                            e,
                            selectedProject.readMorePath,
                          )
                        }
                      >
                        Läs mer här
                      </a>
                    )}
                    <a
                      href={selectedProject.html_url}
                      target="_blank"
                      rel="noreferrer"
                      className="modal-btn secondary"
                    >
                      Se koden på GitHub
                    </a>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
