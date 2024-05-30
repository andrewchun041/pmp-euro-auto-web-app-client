import "./Header.scss";

import { Link, NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <Link className="header__logo-link logo" to="/">
        PMP EURO AUTO
      </Link>
      <nav className="header__nav">
        <ul className="header__navlist">
          <li className="header__navlist-item">
            <NavLink className="header__navlink" to="/">
              Home
            </NavLink>
          </li>
          <li className="header__navlist-item">
            <NavLink className="header__navlink" to="/">
              Vehicles
            </NavLink>
          </li>
          <li className="header__navlist-item">
            <NavLink className="header__navlink" to="/">
              Parts
            </NavLink>
          </li>
          <li className="header__navlist-item">
            <NavLink className="header__navlink" to="/">
              eBay Store
            </NavLink>
          </li>
          <li className="header__navlist-item">
            <NavLink className="header__navlink" to="/">
              About
            </NavLink>
          </li>
          <li className="header__navlist-item">
            <NavLink className="header__navlink" to="/">
              Contact
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
