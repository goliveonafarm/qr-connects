import { useState } from "react";
import useSubmitUserEvent from "../../hooks/useSubmitUserEvent";
import PotluckFormBodie from "./PotluckFormBodie";
import AfterPartyFormBody from "./AfterPartyFormBody";
import PollFormBody from "./PollFormBody";
import EventTypeForm from "./EventTypeForm";

import CheckBox from "./CheckBox";

const EventModal = ({ setShowEventModal, getUserEvents }) => {
  const { loading, submitUserEvent } = useSubmitUserEvent();

  const [inputs, setInputs] = useState({
    formType: null,
    shareResults: true,
    showNames: true,
    shareable: true,
    formData: {},
  });

  const handleInputs = (prop, newVal) => {
    setInputs((inputs) => ({
      ...inputs,
      [prop]:
        prop === "formData"
          ? { ...inputs[prop], ...newVal } // Only merge like this for formData
          : newVal, // For all other props, just set the new value directly
    }));
  };

  const handleSubmit = async (e) => {
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
        return <PotluckFormBodie handleInputs={handleInputs} />;
      case "poll":
        return <PollFormBody handleInputs={handleInputs} />;
      default:
        return <EventTypeForm handleInputs={handleInputs} />;
    }
  };

  return (
    <div className="modal-box w-full bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0  border  ">
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
      <div className="text-2xl">Let participants -</div>
      <CheckBox
        label="See Results"
        variant="secondary"
        handleChange={handleInputs}
        propValue={"shareResults"}
        isChecked={inputs.shareResults}
      />

      <CheckBox
        label="See names in results"
        variant="secondary"
        handleChange={handleInputs}
        propValue={"showNames"}
        isChecked={inputs.showNames}
      />
      <CheckBox
        label="Share QR-Connect"
        variant="secondary"
        handleChange={handleInputs}
        propValue={"shareable"}
        isChecked={inputs.shareable}
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
      <div className="pt-2">
        <button
          className="btn btn-outline btn-success btn-xs"
          onClick={() => {
            console.log(
              `Form values:`,
              inputs,
              `\n`,
              `formData.length: `,
              inputs.formData.length,
              `\n`,
              `formData: `,
              inputs.formData
            );
          }}
        >
          Check form values
        </button>
      </div>
    </div>
  );
};

export default EventModal;
