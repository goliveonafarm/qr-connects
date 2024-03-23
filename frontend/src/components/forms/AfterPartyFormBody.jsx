//allows user to create form displaying location and time to meet with yes (thumbs up) or no (thumbs down) options
//fields - location, time
const AfterPartyFormBody = ({ handleInputs }) => {
  const handleChange = (e) => {
    
  }
  return (
    <div>
      <div className="pb-1 pt-1">Meet up later at:</div>
      <form>
        <label className="input input-bordered flex items-center gap-2 text-xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="text"
            className="grow"
            placeholder="Location"
            onChange={(e) =>{ 
              handleInputs('formData', {location: e.target.value})}}
          />
        </label>
      </form>
    </div>
  );
};

export default AfterPartyFormBody;
