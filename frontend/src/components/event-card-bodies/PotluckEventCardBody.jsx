import { useEffect } from "react";
import useGetEventResponses from "../../hooks/useGetEventResponses";
import CardTotalsPreview from "../CardTotalsPreview";
import capitalizeFirstLetter from "../../../utils/capitalizeFirstLetter";

const PotluckEventCardBody = ({ userEvent }) => {
  const { loadingEventResponses, eventResponses, getEventResponses } =
    useGetEventResponses(userEvent._id);

  useEffect(() => {
    getEventResponses();
  }, []);

  const responses = eventResponses?.map((response) => response.responseData);

  const cardTitle = `Potluck at ${capitalizeFirstLetter(
    userEvent.formData.location
  )}`;

  if (loadingEventResponses) return <div>Loading...</div>;
  return (
    <div className="w-full ">
      <div className="pb-3 overflow-y-auto">
        <h2 className="card-title text-3xl text-green-400 max-w-sm">
          {cardTitle}
        </h2>
      </div>
      <div className="text-2xl text-white text-center pb-2">
        {`${new Date(userEvent.formData.date).toDateString()}`} @{" "}
        {`${userEvent.formData.time.hour}:${userEvent.formData.time.minute} ${userEvent.formData.time.period}`}
      </div>
      {responses?.length > 0 ? (
        <CardTotalsPreview
          responses={responses}
          formData={userEvent.formData}
          formType="potluck"
          title={cardTitle}
        />
      ) : (
        <div className="text-2xl">
          <div className="border-t border-gray-300 my-1"></div>
          <div>There are no responses for this card yet</div>
          <div>
            Click on the QR-Code above and scan on a device to get started
          </div>
        </div>
      )}
    </div>
  );
};

export default PotluckEventCardBody;
