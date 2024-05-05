import { useEffect, useState } from "react";
import useUpdateParticipantResponse from "../../hooks/useUpdateParticipantResponse";
import useGetParticipantEventResponses from "../../hooks/useGetParticipantEventResponses";
import CardTotalsPreview from "../CardTotalsPreview";
import ThumbsUp from "../icons/ThumbsUp";
import ThumbsDown from "../icons/ThumbsDown";
import Input from "../forms/Input";
import useDebounce from "../../hooks/useDebounce";
import capitalizeFirstLetter from "../../../utils/capitalizeFirstLetter";

const AfterPartyResponseCardBody = ({
  response,
  startLoading,
  stopLoading,
}) => {
  const [formData, setFormData] = useState({
    attending: response.responseData?.attending || null,
    name: response.responseData?.name || "",
  });

  const { updatingResponse, updateResponse } = useUpdateParticipantResponse();
  const {
    loadingParticipantEventResponses,
    participantEventResponses,
    getParticipantEventResponses,
  } = useGetParticipantEventResponses(response._id);

  const debouncedName = useDebounce(formData.name, 1000);

  const [keyPressed, setKeyPressed] = useState(false);

  const handleChangeName = (e) => {
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
    };
    runThis();
  }, [debouncedName]);

  useEffect(() => {
    getParticipantEventResponses();
  }, []);

  const cardTitle = `Afterparty at ${capitalizeFirstLetter(
    response.formData.location
  )}`;

  return (
    <div className="w-full">
      <div className="pb-3 overflow-y-auto">
        <div className="card-title text-3xl text-green-400 text-left max-w-sm">
          {cardTitle}
        </div>
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
      <Input
        placeholder="Name (optional)"
        name="name"
        value={formData.name}
        onChange={handleChangeName}
      />
      <div className="flex pb-2">
        <div className="mr-auto ml-auto text-white">{`${
          formData?.attending === true ? "" : "You:"
        }
           ${
             formData.attending === true
               ? ""
               : formData.attending === false
               ? "Not Attending"
               : "No attendance set"
           }`}</div>
      </div>
      {participantEventResponses.length > 0 && (
        <CardTotalsPreview
          responses={participantEventResponses}
          formData={response.formData}
          formType={"afterparty"}
          title={cardTitle}
        />
      )}
    </div>
  );
};

export default AfterPartyResponseCardBody;
