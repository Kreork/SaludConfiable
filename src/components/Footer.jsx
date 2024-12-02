import React from "react";
import facebookIcon from "../assets/images/facebook.svg";
import twitterIcon from "../assets/images/twitter.svg";
import youtubeIcon from "../assets/images/youtube.svg";
import "../assets/styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <section className="footer__container container">
        <nav className="nav nav--footer">
          <h2 className="footer__title">SaludConfiable</h2>
          <ul className="nav__link nav__link--footer">
            <li className="nav__items">
              <a href="#" className="nav__links">Inicio</a>
            </li>
          </ul>
        </nav>
      </section>

      <section className="footer__copy container">
        <div className="footer__social">
          <a href="#" className="footer__icons"><img src={facebookIcon} alt="Facebook" /></a>
          <a href="#" className="footer__icons"><img src={twitterIcon} alt="Twitter" /></a>
          <a href="#" className="footer__icons"><img src={youtubeIcon} alt="YouTube" /></a>
        </div>
        <h3 className="footer__copyright">Derechos reservados &copy;</h3>
      </section>
    </footer>
  );
};

export default Footer;
