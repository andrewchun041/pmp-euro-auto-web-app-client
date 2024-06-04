import './Footer.scss'
import facebookIcon from '../../assets/icons/Icon-facebook.svg'
import instagramIcon from '../../assets/icons/Icon-instagram.svg'

import { Link, NavLink } from "react-router-dom";


function Footer () {
    return (
        <footer className='footer'>
            <div className='footer-one'>
                <div className='footer-one__block footer-one__block--one'>
                    <h3 className='footer-one__title'>Quick Links</h3>
                    <div className='footer-one__link-container'>
                        <div className='footer-one__link-wrapper footer-one__link-wrapper--block-one'>
                            <NavLink className="footer-one__navlink" to="/vehicles">
                                Vehicles
                            </NavLink>
                        </div>
                        <div className='footer-one__link-wrapper footer-one__link-wrapper--block-one'>
                            <NavLink className="footer-one__navlink" to="/parts">
                                Parts
                            </NavLink>
                        </div>
                        <div className='footer-one__link-wrapper footer-one__link-wrapper--block-one'>
                            <NavLink className="footer-one__navlink" to="https://www.ebay.ca/str/pmpeuroauto">
                                eBay Store
                            </NavLink>
                        </div>
                    </div>
                </div>
                <div className='footer-one__link-wrapper'>
                    <Link className="footer-one__logo-link logo" to="/">
                        PMP EURO AUTO
                    </Link>
                </div>
                <div className='footer-one__block footer-one__block--two'>
                    <h3 className='footer-one__title'>Info</h3>
                    <div className='footer-one__link-container'>
                        <div className='footer-one__link-wrapper footer-one__link-wrapper--block-two'>
                            <NavLink className="footer-one__navlink" to="/about">
                                About
                            </NavLink>
                        </div>
                        <div className='footer-one__link-wrapper footer-one__link-wrapper--block-two'>
                            <NavLink className="footer-one__navlink" to="/contact">
                                Contact
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
            <div className='footer-two'>
                <div className='footer-two__block'>
                    <div className='footer-two__socials-container'>
                        <a href="https://www.facebook.com"><img src={facebookIcon} alt="facebook icon" /></a>
                        <a href="https://www.instagram.com/wolfsburgautoparts/"><img src={instagramIcon} alt="instagram icon" /></a>
                    </div>
                </div>
                <div className='footer-two__block'>
                    <div className='footer-two__copyright-container'>
                        <p>PMP Euro Auto © {new Date().getFullYear()}. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;