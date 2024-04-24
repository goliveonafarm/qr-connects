import { useState, useEffect } from "react";
import useUpdateParticipantResponse from "../../hooks/useUpdateParticipantResponse";
import useDebounce from "../../hooks/useDebounce";
import capitalizeFirstLetter from "../../../utils/capitalizeFirstLetter";

const PollResponseCardBody = ({ response, startLoading, stopLoading }) => {
  const [formData, setFormData] = useState({
    vote: response.responseData?.vote >= 0 ? response.responseData.vote : null,
    name: response.responseData?.name || "",
  });

  const { updatingResponse, updateResponse } = useUpdateParticipantResponse();
  const debouncedName = useDebounce(formData.name, 1000);

  // Debounce name changes to avoid too frequent updates
  useEffect(() => {
    if (debouncedName !== response.responseData?.name) {
      submitChange("name", debouncedName);
    }
  }, [debouncedName]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleChangeVote = async (newVoteValue) => {
    console.log(newVoteValue);
    submitChange("vote", newVoteValue);
  };

  const submitChange = async (prop, newVal) => {
    startLoading();
    const previousFormData = { ...formData };
    setFormData((prevFormData) => ({ ...prevFormData, [prop]: newVal }));

    try {
      const { success } = await updateResponse(response._id, {
        ...formData,
        [prop]: newVal,
      });
      if (!success) throw new Error("Error updating response");
    } catch (error) {
      setFormData(previousFormData);
    } finally {
      stopLoading();
    }
  };

  return (
    <div>
      <div className="flex flex-col pb-2">
        <div className="card-title text-4xl text-green-400 text-center">{`${response.formData.name}`}</div>
      </div>
      <div className="flex flex-col">
        {/* map through the questions and display each option (vote) with a radio button*/}
        {response.formData.options?.map((option, index) => (
          <div
            key={`key-option-${response._id}-${index}`}
            className="flex pb-1 text-xl"
          >
            <input
              className="radio radio-lg"
              type="radio"
              id={`id-option-${response._id}-${index}`}
              value={index}
              checked={formData.vote === index}
              name={`vote-${response._id}`}
              onChange={(e) => {
                handleChangeVote(parseInt(e.target.value));
              }}
            />
            <label className="pl-2">{option.text}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PollResponseCardBody;
