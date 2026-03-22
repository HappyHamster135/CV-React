import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home({ setIsTransitioning, toggleDarkMode }) {
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedProject, setSelectedProject] = useState(null);

    const navigate = useNavigate();
    const scrollContainerRef = useRef(null);
    const scrollBarRef = useRef(null);

    // Funktion för att navigera med animation
    const handleActionNavigation = (e, path) => {
        e.preventDefault();
        setIsTransitioning(true);
        setTimeout(() => {
            navigate(path);
        }, 500);
    };

    // 1. HÄMTA PROJEKTEN
    useEffect(() => {
        const manualProjects = [
            {
                id: 'jobbigt',
                name: 'Jobbigt AI-driven RPA',
                description: 'En intelligent bot som automatiserar jobbsökande genom att matcha ditt CV mot annonser och skriva personliga brev med hjälp av AI.',
                image: '/images/Jobbigt.png',
                html_url: 'https://github.com/HappyHamster135/ai-job-bot.git',
                readMorePath: '/jobbigt'
            },
            {
                id: 'snoit',
                name: 'Snöit din guide till fjällen',
                description: 'Realtidsdata för skandinaviska skidorter. En fullstack-lösning som kombinerar rå dataextraktion med moderna API-integrationer.',
                image: '/images/snoit.png',
                html_url: 'https://github.com/HappyHamster135/Snoit-hemsida.git',
                live_url: 'https://snoit.eu',
                readMorePath: '/snoit'
            }
        ];

        fetch('https://api.github.com/users/HappyHamster135/repos')
            .then(res => res.json())
            .then(data => {
                // Om GitHub blockerar (rate limit) är data ett objekt med ett felmeddelande
                if (data.message) {
                    console.warn("GitHub API gräns nådd, visar bara egna projekt tills vidare.");
                    setProjects(manualProjects);
                } else {
                    setProjects([...manualProjects, ...data]);
                }
                setIsLoading(false);
            })
            .catch(err => {
                console.error(err);
                setProjects(manualProjects); // Visa iallafall dina egna projekt om det kraschar
                setIsLoading(false);
            });
    }, []);

    // 2. SCROLL & ANIMATIONSLOGIK
    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;
        if (!scrollContainer) return;

        let targetScrollLeft = 0;
        let currentScrollLeft = 0;
        const speed = 0.02;
        let animationFrameId;

        const siteLogo = document.getElementById('site-logo');
        const scrollHint = document.querySelector('.scroll-hint');
        const scrollText = document.querySelector('.scroll-text');

        const handleWheel = (e) => {
            if (window.innerWidth <= 1024) return;
            if (e.deltaX !== 0) return;
            e.preventDefault();
            targetScrollLeft += e.deltaY;
            const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
            targetScrollLeft = Math.max(0, Math.min(targetScrollLeft, maxScroll));
        };

        const update = () => {
            if (window.innerWidth > 1024) {
                const velocity = targetScrollLeft - currentScrollLeft;
                const skew = velocity * 0.008;
                scrollContainer.style.transform = `skewX(${skew}deg)`;
                currentScrollLeft += (targetScrollLeft - currentScrollLeft) * speed;
                scrollContainer.scrollLeft = currentScrollLeft;

                // Dölj element när man scrollar på dator
                if (currentScrollLeft > 10) {
                    if (scrollHint) scrollHint.classList.add('hidden');
                    if (scrollText) scrollText.classList.add('hidden');
                    if (siteLogo) {
                        siteLogo.style.opacity = '0';
                        siteLogo.style.pointerEvents = 'none';
                    }
                } else {
                    if (scrollHint) scrollHint.classList.remove('hidden');
                    if (scrollText) scrollText.classList.remove('hidden');
                    if (siteLogo) {
                        siteLogo.style.opacity = '1';
                        siteLogo.style.pointerEvents = 'auto';
                    }
                }

                if (scrollBarRef.current) {
                    const maxScrollDesktop = scrollContainer.scrollWidth - scrollContainer.clientWidth;
                    if (maxScrollDesktop > 0) {
                        const scrollPercentage = (scrollContainer.scrollLeft / maxScrollDesktop) * 100;
                        scrollBarRef.current.style.height = scrollPercentage + '%';
                    }
                }
            } else {
                scrollContainer.style.transform = 'none';
            }
            animationFrameId = requestAnimationFrame(update);
        };

        const handleMobileScroll = () => {
            if (window.innerWidth <= 1024) {
                const currentScrollY = window.scrollY;

                // --- NY KOD FÖR ATT FYLLA BAREN PÅ MOBIL ---
                if (scrollBarRef.current) {
                    // Räkna ut hur mycket av sidan som finns kvar att scrolla
                    const windowHeight = window.innerHeight;
                    const fullHeight = document.documentElement.scrollHeight;
                    const maxScrollY = fullHeight - windowHeight;

                    if (maxScrollY > 0) {
                        const scrollPercentage = (currentScrollY / maxScrollY) * 100;
                        scrollBarRef.current.style.height = scrollPercentage + '%';
                    }
                }
                // -------------------------------------------

                // Din befintliga kod för att dölja logga/text
                if (currentScrollY > 10) {
                    if (scrollHint) scrollHint.classList.add('hidden');
                    if (scrollText) scrollText.classList.add('hidden');
                    if (siteLogo) {
                        siteLogo.style.opacity = '0';
                        siteLogo.style.pointerEvents = 'none';
                    }
                } else {
                    if (scrollHint) scrollHint.classList.remove('hidden');
                    if (scrollText) scrollText.classList.remove('hidden');
                    if (siteLogo) {
                        siteLogo.style.opacity = '1';
                        siteLogo.style.pointerEvents = 'auto';
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
                siteLogo.style.opacity = '1';
                siteLogo.style.pointerEvents = 'auto';
            }
        };
    }, [isLoading]);

    // 3. RENDERA SIDAN
    return (
        <div className="portfolio-page no-copy">
            <main className="full-screen-portfolio">
                {isLoading ? (
                    <div style={{ margin: '0 auto', textAlign: 'center' }}>
                        <h2 style={{ color: 'var(--color-slate)' }}>Laddar in projekt... ⏳</h2>
                    </div>
                ) : (
                    <>
                        <div className="portfolio-scroll" ref={scrollContainerRef}>
                            {projects.map(repo => (
                                <div
                                    className="project"
                                    key={repo.id}
                                    onClick={() => setSelectedProject(repo)}
                                >
                                    {repo.image ? (
                                        <img src={repo.image} alt={repo.name} />
                                    ) : (
                                        <div style={{ padding: '30px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                            <h3 style={{ color: 'var(--color-slate)', marginBottom: '15px' }}>{repo.name}</h3>
                                            <p style={{ color: 'var(--color-sage)', fontWeight: 'bold' }}>Klicka för att läsa mer →</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="scroll-indicator-wrap">
                            {/* HÄR ÄR DEN HEMLIGA KNAPPEN */}
                            <div
                                className="scroll-text"
                                onClick={toggleDarkMode}
                                style={{ cursor: 'pointer' }}
                            >
                                Scroll
                            </div>

                            <div className="progress-bar-container">
                                <div className="progress-bar-fill" ref={scrollBarRef}></div>
                            </div>
                            <div className="scroll-hint">Programmerare & Designer</div>
                        </div>

                        {selectedProject && (
                            <div className="modal" style={{ display: 'flex' }} onClick={() => setSelectedProject(null)}>
                                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                                    <span className="close" onClick={() => setSelectedProject(null)}>&times;</span>

                                    {selectedProject.image && <img id="modal-img" src={selectedProject.image} alt={selectedProject.name} />}

                                    <h2 id="modal-title">{selectedProject.name}</h2>
                                    <p id="modal-desc">{selectedProject.description || 'Ingen beskrivning tillgänglig.'}</p>

                                    <div className="modal-links">
                                        {selectedProject.live_url && (
                                            <a href={selectedProject.live_url} target="_blank" rel="noreferrer" className="modal-btn primary-btn">Besök hemsidan</a>
                                        )}
                                        {selectedProject.readMorePath && (
                                            <a
                                                href={selectedProject.readMorePath}
                                                className="modal-btn"
                                                onClick={(e) => handleActionNavigation(e, selectedProject.readMorePath)}
                                            >
                                                Läs mer här
                                            </a>
                                        )}
                                        <a href={selectedProject.html_url} target="_blank" rel="noreferrer" className="modal-btn secondary">Se koden på GitHub</a>
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