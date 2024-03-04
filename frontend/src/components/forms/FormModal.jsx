import { useState } from "react";
import useSubmitUserEvent from "../../hooks/useSubmitUserEvent";

import PotluckForm from "./PotLuck";
import AfterPartyForm from "./AfterParty";
import SurveyForm from "./Survey";
import PollForm from "./Poll";
import PollType from "./PollType";

const FormModal = ({ setShowFormModal, getUserEvents }) => {
  const { loading, submitUserEvent } = useSubmitUserEvent();

  const [inputs, setInputs] = useState({
    formType: null,
    showResults: true,
    privateResults: false,
    shareable: true,
    formData: [],
  });

  const handleInputs = (prop, newVal) => {
    setInputs({ ...inputs, [prop]: newVal });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowFormModal(false);
    await submitUserEvent(inputs);
    await getUserEvents();
  };

  const renderForm = () => {
    switch (inputs.formType) {
      case "afterparty":
        return <AfterPartyForm handleInputs={handleInputs} />;
      case "potluck":
        return <PotluckForm handleInputs={handleInputs} />;
      case "survey":
        return <SurveyForm handleInputs={handleInputs} />;
      case "poll":
        return <PollForm handleInputs={handleInputs} />;
      default:
        return <PollType handleInputs={handleInputs} />;
    }
  };

  return (
    <div className="modal-box w-full bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
      <div className="flex justify-end pb-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="20"
          width="20"
          viewBox="0 0 512 512"
          fill="currentColor"
          className="cursor-pointer hover:text-blue-500"
          onClick={() => setShowFormModal(false)}
        >
          <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z" />
        </svg>
      </div>
      {renderForm()}
      {inputs.formType !== null && (
        <div className="mt-5">
          <div>
            <button
              className="btn btn-outline btn-success"
              onClick={(e) => handleSubmit(e)}
            >
              submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormModal;
