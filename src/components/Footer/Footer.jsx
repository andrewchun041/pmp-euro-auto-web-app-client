import './Footer.scss'

import { Link, NavLink } from "react-router-dom";

function Footer () {
    return (
        <footer className='footer'>
            <div className='footer__content-top'>
                <div className='footer__quick-links'>

                </div>
                <Link className="header__logo-link logo" to="/">
                    PMP EURO AUTO
                </Link>
                <div>
                    
                </div>
            </div>
            <div className='footer__content-bottom'>

            </div>
        </footer>
    );
}

export default Footer;