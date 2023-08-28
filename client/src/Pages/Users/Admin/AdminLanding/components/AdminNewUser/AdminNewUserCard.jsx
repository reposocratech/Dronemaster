import React, { useState } from "react";
import FormularioCreacionTeacher from "../FormulariosCreacion/FormularioCreacionProfesor/FormularioCreacionTeacher";

const AdminNewUserCard = () => {
  const [showModalForm, setShowModalForm] = useState(false);

  const openCreateForm = () => {
    showModalForm(true);
  };

  const closeCreateForm = () => {
    showModalForm(false);
  };

  return (
    <div>
      <div>
        <button onClick={openCreateForm} className="btnOutline1">
          Añadir Usuario
        </button>
      </div>

      <div>
        <FormularioCreacionTeacher
          showModalForm={showModalForm}
          setShowModalForm={setShowModalForm}
          openCreateForm={openCreateForm}
          closeCreateForm={closeCreateForm}
        />
      </div>
    </div>
  );
};

export default AdminNewUserCard;
