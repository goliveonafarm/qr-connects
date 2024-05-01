import { useState, useEffect } from "react";
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
    <div>
      <div>
        <h2 className="card-title text-3xl text-green-400 pb-2">{cardTitle}</h2>
        {responses?.length > 0 && (
          <CardTotalsPreview
            responses={responses}
            formData={userEvent.formData}
            formType="poll"
            title={cardTitle}
          />
        )}
      </div>
    </div>
  );
};

export default PollEventCardBody;
