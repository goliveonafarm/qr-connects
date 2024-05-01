import { useState, useEffect } from "react";
import useGetEventResponses from "../../hooks/useGetEventResponses";
import CardTotalsPreview from "../CardTotalsPreview";
import capitalizeFirstLetter from "../../../utils/capitalizeFirstLetter";

const AfterPartyEventCardBody = ({ userEvent }) => {
  const { loadingEventResponses, eventResponses, getEventResponses } =
    useGetEventResponses(userEvent._id);

  useEffect(() => {
    getEventResponses();
  }, []);

  const responses = eventResponses?.map((response) => response.responseData);
  const cardTitle = `Afterparty at ${capitalizeFirstLetter(
    userEvent.formData.location
  )}`;

  if (loadingEventResponses) return <div>Loading...</div>;
  return (
    <div>
      <div>
        <h2 className="card-title text-3xl text-green-400">{cardTitle}</h2>
      </div>
      {responses?.length > 0 ? (
        <CardTotalsPreview
          responses={responses}
          formData={userEvent.formData}
          formType="afterparty"
          title={cardTitle}
        />
      ) : (
        <div className="text-2xl">
          <div>There are no responses for this card yet</div>
          <div>
            Click on the QR-Code above and scan on a device to get started
          </div>
        </div>
      )}
    </div>
  );
};

export default AfterPartyEventCardBody;
