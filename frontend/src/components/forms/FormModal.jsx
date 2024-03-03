//handle the shared fields and submission logic
//shared fields = partcipant's name, display results to participants, hide names on results, give participants access to qr code
//this form is for the user to generate a form
import { useState } from "react";
const FormModal = () => {
  const [formType, setFormType] = useState(null);
  const [partcipantName, setPartcipantName] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [shareForm, setShareForm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      formType,
      partcipantName,
      showResults,
      shareForm,
    };
    //handle submit here
  };

  return (
    <div className="modal-box">
      {formType === null && (
        <div>
          <button
            className="btn btn-outline btn-primary btn-lg btn-wide"
            onClick={() => setFormType("potluck")}
          >
            Pot Luck
          </button>
          <button
            className="btn btn-outline btn-secondary btn-lg btn-wide"
            onClick={() => setFormType("afterparty")}
          >
            After Party
          </button>
          <button
            className="btn btn-outline btn-accent btn-lg btn-wide"
            onClick={() => setFormType("survey")}
          >
            Survey
          </button>
          <button
            className="btn btn-outline btn-info btn-lg btn-wide"
            onClick={() => setFormType("poll")}
          >
            Poll
          </button>
        </div>
      )}

      {formType !== null && (
        <div className="mt-5">
          <input></input>
          <div>empty</div>
          <button onClick={() => setFormType(null)}>go back</button>
        </div>
      )}
    </div>
  );
};

export default FormModal;
