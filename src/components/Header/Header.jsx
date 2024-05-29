import './Header';

import { Link, NavLink } from 'react-router-dom';

function Header () {
    return (
        <header className='header'>
            <Link className='header__logo-link' to='/'>PMP EURO AUTO</Link>
            <nav className='header__nav'>
                <NavLink className='header__navlink'></NavLink>
            </nav>
        </header>
    );
}

export default Header;