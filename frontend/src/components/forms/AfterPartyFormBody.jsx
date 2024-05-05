const AfterPartyFormBody = ({ handleInputs }) => {
  return (
    <div>
      <div className="pb-1 pt-1">Meet up later at:</div>
      <form>
        <label className="input input-bordered flex items-center gap-2 text-xl">
          <svg
            className="w-4 h-4 opacity-70"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
          >
            <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
          </svg>
          <input
            type="text"
            className="grow"
            placeholder="Location"
            onChange={(e) => {
              handleInputs("formData", { location: e.target.value });
            }}
          />
        </label>
      </form>
    </div>
  );
};

export default AfterPartyFormBody;
