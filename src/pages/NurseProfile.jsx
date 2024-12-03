import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker"; // Importamos el componente DatePicker
import "react-datepicker/dist/react-datepicker.css"; // Importamos los estilos de DatePicker
import { useNavigate, useParams } from "react-router-dom";
import Img from "../assets/images/enfermera.png";
import "../assets/styles/NurseProfile.css";
import Footer from "../components/Footer";
import HeaderSimple from "../components/HeaderSimple";

const NurseProfile = () => {
  const { id } = useParams();
  const [nurse, setNurse] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [activeTab, setActiveTab] = useState("about");
  const [showAppointmentForm, setShowAppointmentForm] = useState(false); // Estado para controlar la visibilidad del formulario
  const [appointmentDate, setAppointmentDate] = useState(new Date()); // Estado para la fecha seleccionada
  const [name, setName] = useState(""); // Estado para el nombre
  const [phone, setPhone] = useState(""); // Estado para el número de teléfono
  const [ubicacion, setUbi] = useState(""); // Estado para la dirección
  const [confirmationMessage, setConfirmationMessage] = useState(""); // Estado para el mensaje de confirmación
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://distribuida.pockethost.io/api/collections/Enfermeras/records/${id}`)
      .then((response) => response.json())
      .then((data) => setNurse(data))
      .catch((error) => console.error("Error al cargar los datos:", error));

    fetch(`https://distribuida.pockethost.io/api/collections/Resenas/records?filter=(Enfermera="${id}")`)
      .then((response) => response.json())
      .then((data) => {
        setReviews(data.items || []);
      })
      .catch((error) => {
        setReviews([]);
      });
  }, [id]);

  const toggleReviews = () => {
    setActiveTab("reviews");
  };

  const toggleAbout = () => {
    setActiveTab("about");
  };

  const toggleServices = () => {
    setActiveTab("services");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleAppointmentSubmit = () => {
    // Aquí puedes manejar la lógica para guardar la cita, por ejemplo, enviándola a una API
    console.log("Cita agendada:", { name, phone, appointmentDate });
    setShowAppointmentForm(false); // Ocultar el formulario después de enviar la cita
    setConfirmationMessage(
      "¡Se ha agendado su cita! Dos horas antes, la enfermera se comunicará con usted para confirmar su cita."
    ); // Establecemos el mensaje de confirmación
  };

  if (!nurse) return <p>Cargando...</p>;

  return (
    <div>
      <HeaderSimple />
      <div className="back-button">
        <button onClick={handleGoBack}>Regresar</button>
      </div>

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
          <button onClick={() => setShowAppointmentForm(true)}>Agregar cita</button>
          <p className="price-info">Precio: ${nurse.Precio} mxn/hr</p>
        </div>

        {showAppointmentForm && (
          <div className="appointment-form">
            <h3>Agendar cita</h3>
            <DatePicker
              selected={appointmentDate}
              onChange={(date) => setAppointmentDate(date)} // Cambiamos a onChange de DatePicker
              dateFormat="dd/MM/yyyy" // O cualquier formato de fecha que prefieras
              className="calendar-input"
            />
            <div className="input-container">
              <label>Nombre:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ingresa tu nombre"
              />
            </div>
            <div className="input-container">
              <label>Teléfono:</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Ingresa tu número de teléfono"
              />
            </div>
            <div className="input-container">
              <label>Dirección:</label>
              <input
                type="text"
                value={ubicacion}
                onChange={(e) => setUbi(e.target.value)}
                placeholder="Ingresa su dirección"
              />
            </div>
            <button className="back-button" onClick={handleAppointmentSubmit}>Confirmar cita</button>
            <button className="back-button" onClick={() => setShowAppointmentForm(false)}>Cancelar</button>
          </div>
        )}

        {/* Aquí mostramos el mensaje de confirmación después de agendar la cita */}
        {confirmationMessage && <p className="confirmation-message">{confirmationMessage}</p>}

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

        {activeTab === "about" && (
          <div className="info-section">
            <p>{nurse.Info || "No hay información disponible."}</p>
          </div>
        )}

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
                      <td>{new Date(review.Fecha).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No hay reseñas disponibles.</p>
            )}
          </div>
        )}

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
