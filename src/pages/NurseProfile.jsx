import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Img from "../assets/images/enfermera.png";
import "../assets/styles/NurseProfile.css";
import Footer from "../components/Footer";
import HeaderSimple from "../components/HeaderSimple";

const NurseProfile = () => {
  const { id } = useParams();
  const [nurse, setNurse] = useState(null);

  useEffect(() => {
    fetch(`https://distribuida.pockethost.io/api/collections/Enfermeras/records/${id}`)
      .then((response) => response.json())
      .then((data) => setNurse(data))
      .catch((error) => console.error("Error al cargar los datos:", error));
  }, [id]);

  if (!nurse) return <p>Cargando...</p>;

  return (
    <div>
      <HeaderSimple />

      <div className="profile-container">
        <div className="profile-header">
          <img
           src={Img}
           className="card-image"
            alt={nurse.Nombre}
          />
          <h1>{nurse.Nombre}</h1>
          <p className="specialty">{nurse.Especialidad}</p>
        </div>

        <div className="profile-info">
          <p><strong>Teléfono:</strong> {nurse.Telefono}</p>
          <div className="rating-container">
            <div className="stars">{"★".repeat(nurse.Rating)}</div>
          </div>
        </div>

        <div className="add-appointment">
          <button>Agregar cita</button>
          <p className="price-info">Precio: ${nurse.Honorarios} mxn/hr</p>
        </div>

        <div className="tabs">
          <button className="active">Acerca de</button>
          <button>Reseñas</button>
          <button>Especialidad</button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default NurseProfile;
