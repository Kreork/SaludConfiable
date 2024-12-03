import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../assets/styles/HeaderSimple.css";

const HeaderSimple = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Estado para manejar la visibilidad del menú móvil
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Función para redirigir al inicio
  const handleGoHome = () => {
    navigate("/");
  };

  // Función para volver a la página anterior
  const handleGoBack = () => {
    navigate(-1);
  };

  // Función para manejar la navegación a preguntas
  const handlePreguntasClick = () => {
    if (location.pathname !== "/") {
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

  // Función para alternar el menú móvil
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header-simple">
      <div className="header-title">Salud Confiable</div>

      {/* Botón de menú para pantallas pequeñas */}
      <button className="menu-toggle" onClick={toggleMenu}>
        {isMenuOpen ? "Cerrar" : "☰"}
      </button>

      {/* Menú de navegación */}
      <nav className={`header-nav ${isMenuOpen ? "nav-open" : ""}`}>
        <button className="header-button" onClick={handleGoHome}>
          Inicio
        </button>
        <button className="header-button" onClick={handleGoBack}>
          Buscar
        </button>
        <button className="header-button" onClick={handlePreguntasClick}>
          Preguntas
        </button>
      </nav>
    </header>
  );
};

export default HeaderSimple;
