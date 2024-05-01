import { useState, useEffect } from "react";
import useUpdateParticipantResponse from "../../hooks/useUpdateParticipantResponse";
import useGetParticipantEventResponses from "../../hooks/useGetParticipantEventResponses";
import CardTotalsPreview from "../CardTotalsPreview";
import useDebounce from "../../hooks/useDebounce";

const PollResponseCardBody = ({ response, startLoading, stopLoading }) => {
  const [formData, setFormData] = useState({
    vote: response.responseData?.vote >= 0 ? response.responseData.vote : null,
    name: response.responseData?.name || "",
  });

  const [optionVotes, setOptionVotes] = useState([]);

  const {
    loadingParticipantEventResponses,
    participantEventResponses,
    getParticipantEventResponses,
  } = useGetParticipantEventResponses(response._id);

  const { updatingResponse, updateResponse } = useUpdateParticipantResponse();

  const debouncedName = useDebounce(formData.name, 1000);

  const [keyPressed, setKeyPressed] = useState(false);

  const handleChangeName = (e) => {
    setKeyPressed(true);
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleChangeVote = async (newVoteValue) => {
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
      getParticipantEventResponses();
    } catch (error) {
      setFormData(previousFormData);
    } finally {
      stopLoading();
    }
  };

  useEffect(() => {
    const runThis = async () => {
      if (debouncedName != response.responseData?.name || keyPressed) {
        submitChange("name", debouncedName);
      }
    };
    runThis();
  }, [debouncedName]);

  useEffect(() => {
    getParticipantEventResponses();
  }, []);

  useEffect(() => {
    if (participantEventResponses) {
      const votes = new Array(response.formData.options.length).fill(0);
      participantEventResponses.forEach((response) => {
        if (typeof response.vote === "number") {
          const voteIndex = response.vote;
          if (voteIndex >= 0 && voteIndex < votes.length) {
            votes[voteIndex]++;
          }
        }
      });
      setOptionVotes(votes);
    }
  }, [participantEventResponses]);

  const cardTitle = `${response.formData.name}`;

  return (
    <div>
      <div className="flex flex-col pb-2">
        <div className="card-title text-3xl text-green-400 text-center">
          {cardTitle}
        </div>
      </div>
      <div className="flex flex-col">
        {/* map through the questions and display each option (vote) with a radio button*/}
        {formData.vote === null &&
          response.formData.options?.map((option, index) => (
            <div
              key={`key-option-${response._id}-${index}`}
              className="flex pb-1 text-md"
            >
              <input
                className="radio radio-success"
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
      <div className="pb-2">
        <label className="input input-bordered flex items-center gap-2 text-xl">
          <input
            type="text"
            className="grow text-success  placeholder-white"
            placeholder="Name (optional)"
            name="name"
            value={formData.name}
            onChange={handleChangeName}
          />
        </label>
      </div>
      <div>
        <div className="pb-1">
          <button
            className="btn btn-success btn-sm"
            onClick={() => {
              handleChangeVote(null);
            }}
          >
            Change submission
          </button>
        </div>
        {formData.vote !== null && participantEventResponses?.length > 0 && (
          <CardTotalsPreview
            responses={participantEventResponses}
            formData={response.formData}
            formType="poll"
            title={cardTitle}
          />
        )}
      </div>
    </div>
  );
};

export default PollResponseCardBody;
