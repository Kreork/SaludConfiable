import React from "react";
import visionIcon from "../assets/images/cruz.svg";
import missionIcon from "../assets/images/inyecion.svg";

const About = () => {
  return (
    <section className="container about">
      <h2 className="subtitle">¿Qué somos?</h2>
      <p className="about__paragraph">
        Somos tu aliado en la búsqueda de enfermeras profesionales  de confianza cerca de ti.
        Nuestro objetivo es facilitarte el acceso a la mejor atención médica disponible,
        proporcionando una plataforma intuitiva donde puedes encontrar y comparar enfermeras
        por código postal y leer reseñas reales de otros pacientes.
      </p>

      <div className="about__main">
        <article className="about__icons">
          <img src={missionIcon} alt="Icono misión" className="about__icon" />
          <h3 className="about__title">Misión</h3>
          <p className="about__paragrah">
            Nuestra misión es empoderar a los pacientes con información precisa y útil para tomar decisiones informadas sobre su salud.
          </p>
        </article>

        <article className="about__icons">
          <img src={visionIcon} alt="Icono visión" className="about__icon" />
          <h3 className="about__title">Visión</h3>
          <p className="about__paragrah">
            Aspiramos a ser la principal plataforma de búsqueda de enfermeras en línea, reconocida por nuestra transparencia, confiabilidad y el impacto positivo en la experiencia de atención médica de nuestros usuarios.
          </p>
        </article>
      </div>
    </section>
  );
};

export default About;
