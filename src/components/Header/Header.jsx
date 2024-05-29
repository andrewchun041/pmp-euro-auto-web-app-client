import './Header';

import { Link } from 'react-router-dom';

function Header () {
    return (
        <header>
            <Link to='/'>PMP AUTO EURO</Link>
        </header>
    );
}

export default Header;