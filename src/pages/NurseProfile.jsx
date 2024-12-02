import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Img from "../assets/images/enfermera.png";
import "../assets/styles/NurseProfile.css";
import Footer from "../components/Footer";
import HeaderSimple from "../components/HeaderSimple";

const NurseProfile = () => {
  const { id } = useParams();
  const [nurse, setNurse] = useState(null);
  const [reviews, setReviews] = useState([]); // Estado para las reseñas
  const [activeTab, setActiveTab] = useState("about"); // Estado para la pestaña activa (Acerca de, Reseñas, Mis Servicios)

  useEffect(() => {
    // Obtener los datos de la enfermera
    fetch(`https://distribuida.pockethost.io/api/collections/Enfermeras/records/${id}`)
      .then((response) => response.json())
      .then((data) => setNurse(data))
      .catch((error) => console.error("Error al cargar los datos:", error));

    // Obtener las reseñas de la enfermera utilizando el filtro adecuado
    fetch(`https://distribuida.pockethost.io/api/collections/Resenas/records?filter=(Enfermera="${id}")`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Respuesta de la API:", data); // Verificar la estructura de la respuesta
        setReviews(data.items || []); // Asegurarse de usar 'items' si existe
      })
      .catch((error) => {
        console.error("Error al cargar las reseñas:", error);
        setReviews([]); // Configurar un arreglo vacío si hay un error
      });
  }, [id]);

  const toggleReviews = () => {
    setActiveTab("reviews"); // Cambiar a la pestaña de reseñas
  };

  const toggleAbout = () => {
    setActiveTab("about"); // Cambiar a la pestaña de "Acerca de"
  };

  const toggleServices = () => {
    setActiveTab("services"); // Cambiar a la pestaña de "Mis Servicios"
  };

  if (!nurse) return <p>Cargando...</p>;

  return (
    <div>
      <HeaderSimple />

      <div className="profile-container">
        <div className="profile-header">
          <img src={Img} className="card-image" alt={nurse.Nombre} />
          <h1>{nurse.Nombre}</h1>
          <p className="specialty">{nurse.Especialidad}</p>
        </div>

        <div className="profile-info">
          <p><strong>Teléfono:</strong> {nurse.Telefono}</p>
          <p><strong>Estado:</strong> {nurse.Estado}</p>
          <p><strong>Municipio:</strong> {nurse.Municipio}</p>
          <div className="rating-container">
            <div className="stars">{"★".repeat(nurse.Rating)}</div>
          </div>
        </div>

        <div className="add-appointment">
          <button>Agregar cita</button>
          <p className="price-info">Precio: ${nurse.Precio} mxn/hr</p>
        </div>

        <div className="tabs">
          <button
            className={activeTab === "about" ? "active" : ""}
            onClick={toggleAbout}
          >
            Acerca de
          </button>
          <button
            className={activeTab === "reviews" ? "active" : ""}
            onClick={toggleReviews}
          >
            Reseñas
          </button>
          <button
            className={activeTab === "services" ? "active" : ""}
            onClick={toggleServices}
          >
            Mis Servicios
          </button>
        </div>

        {/* Solo mostrar la sección "Acerca de" si la pestaña activa es "about" */}
        {activeTab === "about" && (
          <div className="info-section">
            <p>{nurse.Info || "No hay información disponible."}</p>
          </div>
        )}

        {/* Solo mostrar la tabla de reseñas si la pestaña activa es "reviews" */}
        {activeTab === "reviews" && (
          <div className="reviews-section">
            <h3>Reseñas</h3>
            {reviews.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Contenido</th>
                    <th>Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {reviews.map((review) => (
                    <tr key={review.id}>
                      <td>{review.Nombre}</td>
                      <td>{review.Contenido}</td>
                      <td>{new Date(review.Fecha).toLocaleDateString()}</td> {/* Formateamos la fecha */}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No hay reseñas disponibles.</p> // Mensaje cuando no hay reseñas
            )}
          </div>
        )}

        {/* Solo mostrar el mensaje de "Mis Servicios" si la pestaña activa es "services" */}
        {activeTab === "services" && (
          <div className="services-section">
            <h3>Mis Servicios</h3>
            <p>Próximamente estamos trabajando en ello.</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default NurseProfile;
