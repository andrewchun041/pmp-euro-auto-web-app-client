import './Header.scss';

import { Link, NavLink } from 'react-router-dom';

function Header () {
    return (
        <header className='header'>
            <Link className='header__logo-link logo' to='/'>PMP EURO AUTO</Link>
            <nav className='header__nav'>
                <NavLink className='header__navlink' to='/'>Home</NavLink>
                <NavLink className='header__navlink' to='/'>Vehicles</NavLink>
                <NavLink className='header__navlink' to='/'>Parts Inventory</NavLink>
                <NavLink className='header__navlink' to='/'>eBay Store</NavLink>
                <NavLink className='header__navlink' to='/'>About</NavLink>
                <NavLink className='header__navlink' to='/'>Contact</NavLink>
            </nav>
        </header>
    );
}

export default Header;