//a place for signed in users to add or remove events.
//adding an event pulls up a modal containing the approriate form
import { useState } from "react";
import FormModal from "../../components/forms/FormModal";

const UserEvents = () => {
  const [showFormModal, setShowFormModal] = useState(false);
  const [formType, setFormType] = useState(null);

  const openFormModal = (type) => {
    setShowFormModal(formType);
    setFormType(true);
  };

  return (
    <div>
      <div>Connects</div>
      <FormModal />
    </div>
  );
};

export default UserEvents;
