import { useState, useEffect } from "react";
import useUpdateParticipantResponse from "../../hooks/useUpdateParticipantResponse";
import useGetParticipantEventResponses from "../../hooks/useGetParticipantEventResponses";
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
  } = useGetParticipantEventResponses(response.eventId);

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

  const totalVotes = optionVotes.reduce((a, b) => a + b, 0);

  return (
    <div>
      <div className="flex flex-col pb-2">
        <div className="card-title text-3xl text-green-400 text-center">{`${response.formData.name}`}</div>
      </div>
      <div className="flex flex-col">
        {/* map through the questions and display each option (vote) with a radio button*/}
        {response.formData.options?.map((option, index) => (
          <div
            key={`key-option-${response._id}-${index}`}
            className="flex pb-1 text-xl"
          >
            <input
              className="radio radio-lg radio-success"
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
      {response.shareResults && (
        <div className=" border-y-2">
          <h4 className="text-md">{`${totalVotes} total vote${
            totalVotes > 1 ? "s" : ""
          }`}</h4>
          <div className="border-t border-gray-300 my-1"></div>
          {response.formData.options?.map((option, index) => (
            <div key={index} className="flex text-xl">
              <div className="pr-2">{`${optionVotes[index] || 0}`}</div>
              <div>{`${option.text}`}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PollResponseCardBody;
