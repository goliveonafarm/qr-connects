import { useState, useEffect } from "react";
import useGetEventResponses from "../../hooks/useGetEventResponses";
import capitalizeFirstLetter from "../../../utils/capitalizeFirstLetter";

const AfterPartyEventCardBody = ({ userEvent }) => {
  const { loadingEventResponses, eventResponses, getEventResponses } =
    useGetEventResponses(userEvent._id);

  const [responseSummary, setResponseSummary] = useState({
    total: 0,
    attending: 0,
  });

  useEffect(() => {
    getEventResponses();
  }, []);

  useEffect(() => {
    const total = eventResponses?.length;
    const attending = eventResponses?.reduce(
      (acc, curr) => acc + (curr.responseData?.attending ? 1 : 0),
      0
    );

    setResponseSummary({ total, attending });
  }, [eventResponses]);

  if (loadingEventResponses) return <div>Loading...</div>;
  return (
    <div>
      <div>
        <h2 className="card-title text-3xl text-green-400">{`Afterparty at ${capitalizeFirstLetter(
          userEvent.formData.location
        )}`}</h2>
      </div>
      <div className=" border-y-2">
        <div className="text-lg">
          <div>{`${responseSummary?.total || 0} Invite${
            responseSummary?.total === 1 ? `` : `s`
          } sent`}</div>
          <div>{`${responseSummary?.attending || 0} Attending`}</div>
        </div>
      </div>
    </div>
  );
};

export default AfterPartyEventCardBody;
