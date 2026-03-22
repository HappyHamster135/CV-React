import { useState, useEffect } from 'react';
import { useNavigate, useLocation, NavLink } from 'react-router-dom';

export default function Navbar({ setIsTransitioning }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [animClass, setAnimClass] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const isPortfolioPage = location.pathname === '/';

    // Animationstajming för namnet
    useEffect(() => {
        setAnimClass('');
        const timer = setTimeout(() => {
            setAnimClass('run-anim');
        }, 800);
        return () => clearTimeout(timer);
    }, [location.pathname]);

    // Funktion för att hantera "Fade Out -> Byt sida"
    const handleNavigation = (e, path) => {
        e.preventDefault();
        if (location.pathname === path) return; // Gör inget om vi redan är på sidan

        setIsTransitioning(true); // Starta Fade Out (vit skärm dyker upp)

        setTimeout(() => {
            navigate(path); // Byt sida efter 500ms när skärmen är vit
        }, 500);
    };

    return (
        <header className="header-wrapper no-copy">
            <div className={`top-left-name ${animClass}`} id="site-logo">
                <div className="name-line">
                    <span className="initial">J</span><span className="expand">ONATHAN</span>
                </div>
                <div className="name-line">
                    <span className="initial">W</span><span className="expand">ENELL</span>
                </div>
            </div>

            <nav>
                <ul>
                    <li>
                        <a
                            href="/"
                            onClick={(e) => handleNavigation(e, '/')}
                            className={location.pathname === '/' ? 'active' : ''}
                        >
                            Hem
                        </a>
                    </li>
                    <li>
                        <a
                            href="/cv"
                            onClick={(e) => handleNavigation(e, '/cv')}
                            className={location.pathname === '/cv' ? 'active' : ''}
                        >
                            CV
                        </a>
                    </li>
                    <li>
                        <a
                            href="/about"
                            onClick={(e) => handleNavigation(e, '/about')}
                            className={location.pathname === '/about' ? 'active' : ''}
                        >
                            Om Mig
                        </a>
                    </li>
                    <li>
                        <a
                            href="/contact"
                            onClick={(e) => handleNavigation(e, '/contact')}
                            className={location.pathname === '/contact' ? 'active' : ''}
                        >
                            Kontakt
                        </a>
                    </li>
                </ul>
            </nav>
        </header>
    );
}