import { useEffect, useState } from "react";
import useUpdateParticipantResponse from "../../hooks/useUpdateParticipantResponse";
import useGetParticipantEventResponses from "../../hooks/useGetParticipantEventResponses";
import ThumbsUp from "../icons/ThumbsUp";
import ThumbsDown from "../icons/ThumbsDown";
import CardTotalsPreview from "../CardTotalsPreview";
import useDebounce from "../../hooks/useDebounce";
import capitalizeFirstLetter from "../../../utils/capitalizeFirstLetter";

const PotluckResponseCardBody = ({ response, startLoading, stopLoading }) => {
  const [formData, setFormData] = useState({
    attending: response.responseData?.attending || null,
    dish: response.responseData?.dish || "",
    name: response.responseData?.name || "",
  });

  const { updatingResponse, updateResponse } = useUpdateParticipantResponse();
  const {
    loadingParticipantEventResponses,
    participantEventResponses,
    getParticipantEventResponses,
  } = useGetParticipantEventResponses(response._id);

  const debouncedName = useDebounce(formData.name, 1000);
  const debouncedDish = useDebounce(formData.dish, 1000);

  const [keyPressed, setKeyPressed] = useState(false);

  const handleChange = (e) => {
    setKeyPressed(true);
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleChangeAttending = async (newAttendingValue) => {
    const newVal =
      newAttendingValue === formData.attending ? null : newAttendingValue;

    submitChange("attending", newVal);
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
      if (debouncedDish != response.responseData?.dish || keyPressed) {
        submitChange("dish", debouncedDish);
      }
    };
    runThis();
  }, [debouncedName, debouncedDish]);

  const formattedDate = new Date(response.formData.date).toDateString();

  useEffect(() => {
    getParticipantEventResponses();
  }, []);

  const cardTitle = `Potluck at ${capitalizeFirstLetter(
    response.formData.location
  )}`;

  return (
    <div className="w-full ">
      <div className="pb-3 overflow-y-auto">
        <div className="card-title text-3xl text-green-400 text-left max-w-sm pb-3  ">
          {cardTitle}
        </div>
      </div>
      <div className="text-2xl text-white text-center pb-2">
        {`${new Date(response.formData.date).toDateString()}`} @{" "}
        {`${response.formData.time.hour}:${response.formData.time.minute} ${response.formData.time.period}`}
      </div>
      <div>
        <div className="flex">
          <div className="mr-auto ml-auto">
            <button
              onClick={() => handleChangeAttending(true)}
              title="Attending"
            >
              <ThumbsUp highlighted={formData.attending === true} />
            </button>
          </div>
          <div className="mr-auto ml-auto">
            <button onClick={() => handleChangeAttending(false)}>
              <ThumbsDown highlighted={formData.attending === false} />
            </button>
          </div>
        </div>
      </div>
      <div className="pb-1">
        <label className="input input-bordered flex items-center gap-2 text-xl">
          <input
            type="text"
            className="grow text-success placeholder-white"
            placeholder="Name (optional)"
            name="name"
            autoComplete="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label className="input input-bordered flex items-center gap-2 text-xl">
          <input
            type="text"
            className="grow text-success  placeholder-white"
            placeholder="Dish (optional)"
            name="dish"
            value={formData.dish}
            onChange={handleChange}
          />
        </label>
      </div>
      <div className="flex pb-2">
        <div className="mr-auto ml-auto text-white">{` ${
          formData?.attending === true ? "" : "You:"
        }
        ${
          formData.attending === true
            ? ""
            : formData.attending === false
            ? "Not attending"
            : "No attendance set"
        }`}</div>
      </div>
      {participantEventResponses.length > 0 && (
        <CardTotalsPreview
          responses={participantEventResponses}
          formData={response.formData}
          formType="potluck"
          title={cardTitle}
        />
      )}
    </div>
  );
};

export default PotluckResponseCardBody;
