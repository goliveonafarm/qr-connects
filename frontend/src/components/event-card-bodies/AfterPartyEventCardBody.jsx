import { useEffect } from "react";
import useGetEventResponses from "../../hooks/useGetEventResponses";

const AfterPartyEventCardBody = ({ userEvent }) => {
  console.log(userEvent);
  const { loadingEventResponses, eventResponses, getEventResponses } =
    useGetEventResponses(userEvent._id);

  useEffect(() => {
    getEventResponses();
  }, []);

  return (
    <div>
      {eventResponses?.map((response) => (
        <div key={response._id}>
          <div>Response ID: {response._id}</div>
          <div className="text-lg">Name: {response.responseData?.name}</div>
          <div>Attending: {response.responseData.attending ? "Yes" : "No"}</div>
          -----------------
        </div>
      ))}
    </div>
  );
};

export default AfterPartyEventCardBody;
