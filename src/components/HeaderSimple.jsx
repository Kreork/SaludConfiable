import React from "react";
import { useNavigate } from "react-router-dom"; // Para manejar la navegación
import "../assets/styles/HeaderSimple.css"; // Archivo de estilos

const HeaderSimple = () => {
  const navigate = useNavigate(); // Inicializamos el hook de navegación

  const handleGoHome = () => {
    navigate("/"); // Redirige al inicio
  };

  const handleGoBack = () => {
    navigate(-1); // Regresa a la página anterior
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
        <button className="header-button">Preguntas</button>
      </nav>
    </header>
  );
};

export default HeaderSimple;
