import React from "react";
import Img from "../assets/images/enfermera.png";
import "../assets/styles/NursesPage.css";

const Card = ({ name, specialty, rating}) => {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={index < rating ? "star filled" : "star"}>★</span>
    ));
  };

  return (
    <div className="card">
      <img
        src={Img}
        alt={name}
        className="card-image"
      />
      <div className="card-info">
        <h3 className="card-name">{name}</h3>
        <p className="card-specialty">{specialty}</p>
        <div className="card-rating">{renderStars(rating)}</div>
      </div>
    </div>
  );
};

export default Card;
