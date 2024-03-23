import { useState } from "react";
import useSubmitUserEvent from "../../hooks/useSubmitUserEvent";

//import PotluckFormBody from "./PotluckFormBody";
import AfterPartyFormBody from "./AfterPartyFormBody";
import SurveyFormBody from "./SurveyFormBody";
import PollFormBody from "./PollFormBody";
import EventTypeForm from "./EventTypeForm";

import CheckBox from "./CheckBox";

const EventModal = ({ setShowEventModal, getUserEvents }) => {
  const { loading, submitUserEvent } = useSubmitUserEvent();

  const [inputs, setInputs] = useState({
    formType: null,
    shareResults: true,
    privateResults: false,
    shareable: true,
    formData: [],
  });

  const handleInputs = (prop, newVal) => {
    setInputs({ ...inputs, [prop]: newVal });
  };

  const handleSubmit = async (e) => {
    console.log(inputs);
    e.preventDefault();
    setShowEventModal(false);
    await submitUserEvent(inputs);
    await getUserEvents();
  };

  const renderForm = () => {
    switch (inputs.formType) {
      case "afterparty":
        return <AfterPartyFormBody handleInputs={handleInputs} />;
      case "potluck":
        //return <PotluckFormBody handleInputs={handleInputs} />;
        return <></>
      case "survey":
        return <SurveyFormBody handleInputs={handleInputs} />;
      case "poll":
        return <PollFormBody handleInputs={handleInputs} />;
      default:
        return <EventTypeForm handleInputs={handleInputs} />;
    }
  };

  return (
    <div className="modal-box w-full bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-0  border  border-gray-200">
      <div className="flex justify-end pb-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="30"
          width="30"
          viewBox="0 0 512 512"
          fill="currentColor"
          className="cursor-pointer hover:text-blue-500"
          onClick={() => setShowEventModal(false)}
        >
          <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z" />
        </svg>
      </div>

      <CheckBox
        label="Show results to participants"
        variant="secondary"
        handleChange={handleInputs}
        propValue={"shareResults"}
      />

      <CheckBox
        label="Share names in results to participants"
        variant="secondary"
        handleChange={handleInputs}
        propValue={"privateResults"}
      />
      <CheckBox
        label="Let participants share QR code"
        variant="secondary"
        handleChange={handleInputs}
        propValue={"shareable"}
      />

      {renderForm()}
      {inputs.formType !== null && (
        <div className="mt-5">
          <div>
            <button
              className="btn btn-outline btn-success"
              onClick={(e) => handleSubmit(e)}
            >
              Submit
            </button>
          </div>
        </div>
      )}

      <button
        className="btn btn-outline btn-success"
        onClick={() => console.log(inputs)}
      >
        Check form values
      </button>
    </div>
  );
};

export default EventModal;
