import React from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Para manejar la navegación
import "../assets/styles/HeaderSimple.css"; // Archivo de estilos

const HeaderSimple = () => {
  const navigate = useNavigate(); // Inicializamos el hook de navegación
  const location = useLocation(); // Para verificar la ruta actual

  // Función para redirigir al inicio
  const handleGoHome = () => {
    navigate("/"); // Redirige al inicio
  };

  // Función para volver a la página anterior
  const handleGoBack = () => {
    navigate(-1); // Regresa a la página anterior
  };

  // Función para manejar la navegación a preguntas
  const handlePreguntasClick = () => {
    if (location.pathname !== "/") {
      // Si no estamos en el inicio, primero redirige al inicio
      navigate("/");

      // Después de redirigir, desplazarse a la sección de preguntas
      setTimeout(() => {
        const preguntasSection = document.getElementById("preguntas_frecuentes");
        if (preguntasSection) {
          preguntasSection.scrollIntoView({ behavior: "smooth" });
        }
      }, 500); // Esperar medio segundo para asegurar la carga
    } else {
      // Si ya estamos en el inicio, desplazar directamente a preguntas
      const preguntasSection = document.getElementById("preguntas_frecuentes");
      if (preguntasSection) {
        preguntasSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header className="header-simple">
      <div className="header-title">Salud Confiable</div>
      <nav className="header-nav">
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
