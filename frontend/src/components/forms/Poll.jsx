//allows user to create a form with n number of radio buttons
//fields - n number of radio buttons
import useDynamicInputs from "../../hooks/useDynamicInputs";

const Poll = ({ handleInputs }) => {
  const { inputs, handleAddInput, handleChange, handleRemoveFirstEmpty } =
    useDynamicInputs();

  return (
    <div>
      <div className="pb-1">Multiple choice poll</div>
      {inputs.map((input, index) => (
        <div key={`survey-question-${index}`} className="pb-2">
          <label className="input input-bordered flex items-center gap-2 text-xl">
            <input
              type="text"
              className="grow"
              placeholder={`Poll option #${index + 1}`}
              value={input}
              onChange={(e) => handleChange(index, e.target.value)}
            />
          </label>
        </div>
      ))}

      <div className="flex justify-end pt-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="20"
          width="20"
          viewBox="0 0 448 512"
          fill="currentColor"
          className="cursor-pointer hover:text-blue-500"
          onClick={handleAddInput}
        >
          <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="20"
          width="20"
          viewBox="0 0 448 512"
          fill="currentColor"
          className="cursor-pointer hover:text-blue-500"
          onClick={handleRemoveFirstEmpty}
        >
          <path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" />
        </svg>
      </div>
    </div>
  );
};

export default Poll;
