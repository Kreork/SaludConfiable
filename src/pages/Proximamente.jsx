import React from "react";
import { Link } from "react-router-dom";
import "../assets/styles/Proximamente.css"; // Asegúrate de tener este archivo de estilos si lo usas

const Proximamente = () => {
  return (
    <div className="proximamente-container">
      <h1>Próximamente</h1>
      <p>¡Estamos trabajando en ello! La página de inicio de sesión estará disponible pronto.</p>
      {/* Botón para regresar al inicio */}
      <Link to="/" className="btn-inicio">Inicio</Link>
    </div>
  );
};

export default Proximamente;
