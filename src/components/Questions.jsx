import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import arrowIcon from "../assets/images/arrow.svg";

const Questions = () => {
  // Estado para manejar qué pregunta está activa
  const [activeQuestion, setActiveQuestion] = useState(null);

  // Hook de navegación
  const navigate = useNavigate(); // Inicializa el hook para la redirección

  // Lista de preguntas
  const questions = [
    { title: "¿Cómo funciona?", content: "Descripción de cómo funciona MediMapa." },
    { title: "¿Cómo puedo dejar mi reseña?", content: "Instrucciones para dejar una reseña." },
    { title: "¿Qué necesito para registrarme?", content: "Solo necesitas un correo electrónico válido, una contraseña segura y tus datos personales básicos. ¡Es rápido y sencillo!" },
  ];

  // Función para alternar el estado de la pregunta
  const toggleQuestion = (index) => {
    setActiveQuestion(activeQuestion === index ? null : index);
  };

  // Función para redirigir al inicio
  const handleRedirect = () => {
    navigate("/"); // Redirige a la página de inicio
  };

  return (
    <section id="preguntas_frecuentes" className="questions container">
      {/* Título que redirige al inicio */}
      <h2 
        className="subtitle" 
        style={{ cursor: "pointer" }} 
        onClick={handleRedirect} // Redirige al inicio cuando se hace clic
      >
        Preguntas frecuentes
      </h2>
      <p className="questions__paragraph">
        ¿Tienes preguntas o necesitas asistencia? Nuestro equipo de soporte está aquí para ayudarte.
      </p>

      <section className="questions__container">
        {questions.map((question, index) => (
          <article className="questions__padding" key={index}>
            <div className="questions__answer">
              {/* Título con un botón para desplegar/ocultar la respuesta */}
              <h3
                className="questions__title"
                onClick={() => toggleQuestion(index)}
                style={{ cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between" }}
              >
                {question.title}
                <span className={`questions__arrow ${activeQuestion === index ? "active" : ""}`}>
                  <img
                    src={arrowIcon}
                    alt="Arrow"
                    className={`questions__img ${activeQuestion === index ? "rotated" : ""}`}
                    style={{
                      transition: "transform 0.3s ease",
                      transform: activeQuestion === index ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  />
                </span>
              </h3>

              {/* Respuesta desplegable */}
              {activeQuestion === index && (
                <p className="questions__show" style={{ marginTop: "10px" }}>
                  {question.content}
                </p>
              )}
            </div>
          </article>
        ))}
      </section>
    </section>
  );
};

export default Questions;
