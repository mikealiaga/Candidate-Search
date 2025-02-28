import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/nav.css";

const Nav = () => {
  const location = useLocation();
  const [activePage, setActivePage] = useState(location.pathname);

  useEffect(() => {
    setActivePage(location.pathname);
  }, [location]);

  return (
    <nav className="nav">
      <ul className="nav-list">
        <li className={`nav-item ${activePage === "/" ? "active" : ""}`}>
          <Link to="/" className="nav-link">Home</Link>
        </li>
        <li className={`nav-item ${activePage === "/saved" ? "active" : ""}`}>
          <Link to="/saved" className="nav-link">Saved Candidates</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;