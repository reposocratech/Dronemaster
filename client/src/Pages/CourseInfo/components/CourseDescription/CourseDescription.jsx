import React, { useState } from "react";

export const CourseDescription = ({ description }) => {
  const byteArray = new Uint8Array(description?.data);
  const descriptionText = new TextDecoder("utf-8").decode(byteArray);

  // Estado para controlar si se muestra el texto completo
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Función para cambiar el estado y mostrar el texto completo
  const handleShowFull = () => {
    setShowFullDescription(true);
  };

  const handleShowPart = () => {
    setShowFullDescription(false)

  }

  return (
    <div className="containerCourseDescription">
      <div className="headLineDescription">
        <h5 className="mb-1">Descripción</h5>
      </div>
      {
        descriptionText !== "undefined" && <>
          <div className={showFullDescription ? "fullDescription descriptionContent" : "smallDescription descriptionContent"}>
            {/* Mostrar solo las primeras 3 líneas del texto */}
            <p >
              {descriptionText}
            </p>
          </div>
          {!showFullDescription ? (
            <button className="showTextButton" onClick={handleShowFull}>
              Ver más
            </button>
          ) : (
            <button className="showTextButton" onClick={handleShowPart}>
              Ver menos
            </button>
          )}
        </>
      }
      {descriptionText === "undefined" &&
        <div className={showFullDescription ? "fullDescription descriptionContent" : "smallDescription descriptionContent"}>
          {/* Mostrar solo las primeras 3 líneas del texto */}
          <p >
            No hay descripción para mostrar...
          </p>
        </div>
      }
    </div>
  );
};
