import { useState, useEffect } from 'react';
import { useNavigate, useLocation, NavLink } from 'react-router-dom';

export default function Navbar({ setIsTransitioning }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [animClass, setAnimClass] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const isPortfolioPage = location.pathname === '/';

    // Ser till att namnet animeras in lite fördröjt efter varje sidbyte
    useEffect(() => {
        setAnimClass('');
        const timer = setTimeout(() => {
            setAnimClass('run-anim');
        }, 800);

        return () => clearTimeout(timer);
    }, [location.pathname]);

    // Fördröjer routingen så att vi hinner spela upp övergångseffekten först
    const handleNavigation = (e, path) => {
        e.preventDefault();

        // Onödigt att köra effekten om vi redan är på rätt sida
        if (location.pathname === path) return;

        setIsTransitioning(true);

        // Ge fade-effekten 500ms att köra klart innan vi faktiskt navigerar
        setTimeout(() => {
            navigate(path);
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