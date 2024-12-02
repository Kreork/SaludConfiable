import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import closeIcon from "../assets/images/close.svg";
import menuIcon from "../assets/images/menu.svg";
import "../assets/styles/estilos.css";
import "../assets/styles/Header.css";
import "../assets/styles/normalize.css";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Verificar si estamos en la página /nurses
  const isOnNursesPage = location.pathname === "/nurses";

  // Función para manejar la redirección y desplazamiento
  const handlePreguntasClick = () => {
    if (isOnNursesPage) {
      // Primero, redirigir al inicio
      navigate("/");
      
      // Después de la redirección, desplazarse a la sección de preguntas
      setTimeout(() => {
        const preguntasSection = document.getElementById("preguntas_frecuentes");
        if (preguntasSection) {
          preguntasSection.scrollIntoView({ behavior: "smooth" });
        }
      }, 500); // Esperar medio segundo para asegurar que la redirección haya ocurrido
    } else {
      // Si no estamos en /nurses, solo desplazamos a las preguntas
      const preguntasSection = document.getElementById("preguntas_frecuentes");
      if (preguntasSection) {
        preguntasSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // Determinar el texto del título dependiendo de la ruta actual
  const getHeaderText = () => {
    if (isOnNursesPage) {
      return "Empieza a buscar a la mejor enfermera para ti.";
    }
    return "Bienvenido a Salud Confiable";
  };

  return (
    <header className="hero">
      <nav className="nav container">
        <div className="nav__logo">
          <h2 className="nav__title">SaludConfiable</h2>
        </div>

        <ul className="nav__link nav__link--menu">
          <li className="nav__items">
            <Link to={isOnNursesPage ? "/" : "/nurses"} className="nav__links">
              {isOnNursesPage ? "Inicio" : "Buscar Enfermeras"}
            </Link>
          </li>
          <li className="nav__items">
          <Link to="/proximamente" className="nav__links">
              Iniciar Sesión
            </Link>
          </li>
          <li className="nav__items">
            {/* Aquí usamos un button con la misma clase nav__links */}
            <button 
              onClick={handlePreguntasClick} 
              className="nav__links" 
              style={{ background: 'none', border: 'none', padding: '0', cursor: 'pointer' }}
            >
              Preguntas
            </button>
          </li>
          <img src={closeIcon} alt="Cerrar menú" className="nav__close" />
        </ul>

        <div className="nav__menu">
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
