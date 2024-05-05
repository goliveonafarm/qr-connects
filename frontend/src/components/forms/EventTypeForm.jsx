const EventTypeForm = ({ handleInputs }) => {
  return (
    <div>
      <div className="pb-1">Choose connect type:</div>
      <div>
        <button
          className="btn btn-outline btn-lg btn-wide"
          onClick={() => handleInputs("formType", "afterparty")}
        >
          After Party
        </button>
      </div>
      <div className="pt-2">
        <button
          className="btn btn-outline btn-lg btn-wide"
          onClick={() => handleInputs("formType", "potluck")}
        >
          Potluck
        </button>
      </div>
      <div className="pt-2">
        <button
          className="btn btn-outline btn-lg btn-wide"
          onClick={() => handleInputs("formType", "poll")}
        >
          Poll
        </button>
      </div>
    </div>
  );
};

export default EventTypeForm;
