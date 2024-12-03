import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import closeIcon from "../assets/images/close.svg";
import menuIcon from "../assets/images/menu.svg";
import "../assets/styles/estilos.css";
import "../assets/styles/Header.css";
import "../assets/styles/normalize.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false); // Estado para controlar el menú
  const location = useLocation();
  const navigate = useNavigate();

  const isOnNursesPage = location.pathname === "/nurses";

  const handlePreguntasClick = () => {
    if (isOnNursesPage) {
      navigate("/");
      setTimeout(() => {
        const preguntasSection = document.getElementById("preguntas_frecuentes");
        if (preguntasSection) {
          preguntasSection.scrollIntoView({ behavior: "smooth" });
        }
      }, 500);
    } else {
      const preguntasSection = document.getElementById("preguntas_frecuentes");
      if (preguntasSection) {
        preguntasSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const getHeaderText = () => {
    if (isOnNursesPage) {
      return "Empieza a buscar a la mejor enfermera para ti.";
    }
    return "Bienvenido a Salud Confiable";
  };

  // Función para alternar el estado del menú
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="hero">
      <nav className="nav container">
        <div className="nav__logo">
          <h2 className="nav__title">SaludConfiable</h2>
        </div>

        <ul className={`nav__link nav__link--menu ${menuOpen ? "nav__link--show" : ""}`}>
          <li className="nav__items">
            <Link
              to={isOnNursesPage ? "/" : "/nurses"}
              className="nav__links"
              onClick={toggleMenu} // Cerrar el menú al hacer clic en un enlace
            >
              {isOnNursesPage ? "Inicio" : "Buscar Enfermeras"}
            </Link>
          </li>
          <li className="nav__items">
            <Link to="/proximamente" className="nav__links" onClick={toggleMenu}>
              Iniciar Sesión
            </Link>
          </li>
          <li className="nav__items">
            <button
              onClick={() => {
                handlePreguntasClick();
                toggleMenu(); // Cerrar el menú después de navegar
              }}
              className="nav__links"
              style={{ background: "none", border: "none", padding: "0", cursor: "pointer" }}
            >
              Preguntas
            </button>
          </li>
          <img
            src={closeIcon}
            alt="Cerrar menú"
            className="nav__close"
            onClick={toggleMenu} // Cerrar el menú al hacer clic en el icono
          />
        </ul>

        <div className="nav__menu" onClick={toggleMenu}>
          <img src={menuIcon} alt="Abrir menú" className="nav__img" />
        </div>
      </nav>

      <section className="hero__container container">
        <h1 className="hero__title">{getHeaderText()}</h1>
      </section>
    </header>
  );
};

export default Header;
