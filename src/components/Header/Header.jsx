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
            <NavLink className="header__navlink" to="/vehicles">
              Vehicles
            </NavLink>
          </li>
          <li className="header__navlist-item">
            <NavLink className="header__navlink" to="/parts">
              Parts
            </NavLink>
          </li>
          <li className="header__navlist-item">
            <NavLink className="header__navlink" to="https://www.ebay.ca/str/pmpeuroauto">
              eBay Store
            </NavLink>
          </li>
          <li className="header__navlist-item">
            <NavLink className="header__navlink" to="/about">
              About
            </NavLink>
          </li>
          <li className="header__navlist-item">
            <NavLink className="header__navlink" to="/contact">
              Contact
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
