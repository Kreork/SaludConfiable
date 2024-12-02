import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Importa Link de React Router
import "../assets/styles/estilos.css";
import "../assets/styles/Header.css";
import "../assets/styles/normalize.css";
import "../assets/styles/NursesPage.css";
import Card from "../components/Card";
import Footer from "../components/Footer";
import Header from "../components/Header";

const NursesPage = () => {
  const [nurses, setNurses] = useState([]); // Estado para almacenar los datos
  const [filter, setFilter] = useState("");
  const [selectedOption, setSelectedOption] = useState(""); // Estado para la opción seleccionada
  const [showOptions, setShowOptions] = useState(false); // Estado para mostrar/ocultar opciones

  useEffect(() => {
    fetch("https://distribuida.pockethost.io/api/collections/Enfermeras/records")
      .then((response) => response.json())
      .then((data) => {
        setNurses(data.items); // Asignar los datos obtenidos al estado
      })
      .catch((error) => console.error("Error al cargar los datos:", error));
  }, []);

  const filteredData = nurses
    .filter((person) =>
      person.Nombre.toLowerCase().includes(filter.toLowerCase()) ||
      (person.Especialidad?.toString().toLowerCase().includes(filter.toLowerCase()))
    )
    .filter((person) =>
      selectedOption ? person.Especialidad?.toLowerCase() === selectedOption.toLowerCase() : true
    );

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setShowOptions(false); // Cerrar el menú al seleccionar una opción
  };

  return (
    <div className="nurses-page">
      <Header />

      <header className="nurses-header">
        <h1>Lista de Enfermeras</h1>

        <input
          type="text"
          placeholder="Buscar por nombre o especialidad"
          value={filter}
          onChange={(e) => setFilter(e.target.value)} // Actualiza el filtro
          className="search-input"
        />

        <button
          className="filter-button"
          onClick={() => setShowOptions(!showOptions)}
        >
          {selectedOption || "Filtrar por especialidad"}
        </button>

        {showOptions && (
          <div className="filter-dropdown">
            <div className="filter-options">
              <button
                className="filter-option"
                onClick={() => handleOptionClick("General")}
              >
                General
              </button>
              <button
                className="filter-option"
                onClick={() => handleOptionClick("Pediátrico")}
              >
                Pediátrico
              </button>
              <button
                className="filter-option"
                onClick={() => handleOptionClick("Auxiliar")}
              >
                Auxiliar
              </button>
              <button
                className="filter-option"
                onClick={() => handleOptionClick("Geriátrico")}
              >
                Geriátrico
              </button>
              <button
                className="filter-option"
                onClick={() => handleOptionClick("")}
              >
                Todos
              </button>
            </div>
          </div>
        )}
      </header>

      <div className="card-container">
        {filteredData.map((person) => (
          <Link 
            key={person.id} 
            to={`/nurse/${person.id}`} // Navega a la página de detalles con el id
            style={{ textDecoration: "none", color: "inherit" }} // Quita estilos de enlace
          >
            <Card
              name={person.Nombre}
              specialty={
                Array.isArray(person.Especialidad)
                  ? person.Especialidad.join(", ")
                  : person.Especialidad
              }
              rating={person.Rating}
            />
          </Link>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default NursesPage;
