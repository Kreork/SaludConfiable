import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "../src/assets/styles/estilos.css";
import "../src/assets/styles/normalize.css";
import About from "./components/About";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Questions from "./components/Questions";
import NurseProfile from "./pages/NurseProfile"; // Página de detalles de la enfermera
import NursesPage from "./pages/NursesPage"; // Página de enfermeras
import Proximamente from "./pages/Proximamente";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Ruta principal */}
        <Route
          path="/"
          element={
            <>
              <Header />
              <main>
                <About />
                <Questions />
              </main>
              <Footer />
            </>
          }
        />

        {/* Ruta para la página de enfermeras */}
        <Route path="/nurses" element={<NursesPage />} />

        {/* Ruta para la página de detalles de la enfermera */}
        <Route path="/nurse/:id" element={<NurseProfile />} />

        {/* Ruta para la página "Próximamente" */}
        <Route path="/proximamente" element={<Proximamente />} />
      </Routes>
    </Router>
  );
};

export default App;
