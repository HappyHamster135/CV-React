import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar({ setIsTransitioning }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (e, path) => {
    e.preventDefault();
    if (location.pathname === path) return;

    setIsTransitioning(true);
    setTimeout(() => navigate(path), 500);
  };

  return (
    <header className="header-wrapper">
      <div
        key={location.pathname}
        className="top-left-name run-anim"
        id="site-logo"
      >
        <div className="name-line">
          <span className="initial">J</span>
          <span className="expand">ONATHAN</span>
        </div>
        <div className="name-line">
          <span className="initial">W</span>
          <span className="expand">ENELL</span>
        </div>
      </div>

      <nav>
        <ul>
          <li>
            <a
              href="#/"
              onClick={(e) => handleNavigation(e, "/")}
              className={location.pathname === "/" ? "active" : ""}
            >
              Hem
            </a>
          </li>
          <li>
            <a
              href="#/cv"
              onClick={(e) => handleNavigation(e, "/cv")}
              className={location.pathname === "/cv" ? "active" : ""}
            >
              CV
            </a>
          </li>
          <li>
            <a
              href="#/about"
              onClick={(e) => handleNavigation(e, "/about")}
              className={location.pathname === "/about" ? "active" : ""}
            >
              Om Mig
            </a>
          </li>
          <li>
            <a
              href="#/contact"
              onClick={(e) => handleNavigation(e, "/contact")}
              className={location.pathname === "/contact" ? "active" : ""}
            >
              Kontakt
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
