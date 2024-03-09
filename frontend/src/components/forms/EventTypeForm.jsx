const EventTypeForm = ({ handleInputs }) => {
  return (
    <div>
      <div className="pb-1">Connect type</div>
      <div>
        <button
          className="btn btn-outline btn-secondary btn-lg btn-wide"
          onClick={() => handleInputs("formType", "afterparty")}
        >
          After Party
        </button>
      </div>
      <div className="pt-2">
        <button
          className="btn btn-outline btn-primary btn-lg btn-wide"
          onClick={() => handleInputs("formType", "potluck")}
        >
          Pot Luck
        </button>
      </div>
      <div className="pt-2">
        <button
          className="btn btn-outline btn-accent btn-lg btn-wide"
          onClick={() => handleInputs("formType", "survey")}
        >
          Survey
        </button>
      </div>
      <div className="pt-2">
        <button
          className="btn btn-outline btn-info btn-lg btn-wide"
          onClick={() => handleInputs("formType", "poll")}
        >
          Poll
        </button>
      </div>
    </div>
  );
};

export default EventTypeForm;
