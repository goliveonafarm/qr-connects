import { useState } from "react";
import useSubmitUserEvent from "../../hooks/useSubmitUserEvent";
import capitalizeFirstLetter from "../../../utils/capitalizeFirstLetter";
import PotluckFormBodie from "./PotluckFormBodie";
import AfterPartyFormBody from "./AfterPartyFormBody";
import PollFormBody from "./PollFormBody";
import EventTypeForm from "./EventTypeForm";

import CheckBox from "./CheckBox";
import CircleXmark from "../icons/CircleXmark";

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
    <div className="modal-box w-full bg-clip-padding backdrop-filter border border-gray-500">
      <div className="flex">
        <div className="pb-3 text-4xl mr-auto">
          {capitalizeFirstLetter(inputs.formType)}
        </div>
        <div className="flex justify-end mb-auto">
          <button
            onClick={() => setShowEventModal(false)}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                setShowEventModal(false);
              }
            }}
          >
            <CircleXmark _size={35} />
          </button>
        </div>
      </div>
      {renderForm()}
      <div className="pt-2 text-2xl">Allow participants to -</div>
      <CheckBox
        label="See results"
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
        disabled={!inputs.shareResults}
      />
      <CheckBox
        label="Share QR-Connect"
        variant="secondary"
        handleChange={handleInputs}
        propValue={"shareable"}
        isChecked={inputs.shareable}
      />

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
    </div>
  );
};

export default EventModal;
