import './Header';

import { Link, NavLink } from 'react-router-dom';

function Header () {
    return (
        <header>
            <Link to='/'>PMP AUTO EURO</Link>
            <nav>
                <NavLink></NavLink>
            </nav>
        </header>
    );
}

export default Header;