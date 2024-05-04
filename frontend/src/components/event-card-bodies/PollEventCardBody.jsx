import { useEffect } from "react";
import CardTotalsPreview from "../CardTotalsPreview";
import capitalizeFirstLetter from "../../../utils/capitalizeFirstLetter";
import useGetEventResponses from "../../hooks/useGetEventResponses";

const PollEventCardBody = ({ userEvent }) => {
  const { loadingEventResponses, eventResponses, getEventResponses } =
    useGetEventResponses(userEvent._id);

  useEffect(() => {
    getEventResponses();
  }, []);

  const responses = eventResponses?.map((response) => response.responseData);

  const cardTitle = `${capitalizeFirstLetter(userEvent.formData.name)}`;
  if (loadingEventResponses) return <div>Loading...</div>;

  return (
    <div className="w-full ">
      <div className="overflow-y-auto">
        <h2 className="card-title text-3xl text-green-400 pb-2 max-w-sm">
          {cardTitle}
        </h2>
      </div>

      {responses?.length > 0 ? (
        <CardTotalsPreview
          responses={responses}
          formData={userEvent.formData}
          formType="poll"
          title={cardTitle}
        />
      ) : (
        <div className="text-2xl">
          <div className="border-t border-gray-300 my-1"></div>
          <div>There are no responses for this Connect yet.</div>
          <div>
            Click on the QR-Code above and scan on a device or click below to
            get started.
          </div>
        </div>
      )}
    </div>
  );
};

export default PollEventCardBody;
