import { Link } from "react-router-dom";
import "../styles/nav.css";

const Nav = () => {
  return (
    <nav className="nav">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/" className="nav-link">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/saved" className="nav-link">Saved Candidates</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;