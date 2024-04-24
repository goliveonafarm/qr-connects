import { useState, useEffect } from "react";
import capitalizeFirstLetter from "../../../utils/capitalizeFirstLetter";
import useGetEventResponses from "../../hooks/useGetEventResponses";

const PollEventCardBody = ({ userEvent }) => {
  const { loadingEventResponses, eventResponses, getEventResponses } =
    useGetEventResponses(userEvent._id);

  const [optionVotes, setOptionVotes] = useState([]);

  useEffect(() => {
    getEventResponses();
  }, []);

  useEffect(() => {
    if (eventResponses) {
      const votes = new Array(userEvent.formData.options.length).fill(0);
      eventResponses.forEach((response) => {
        if (
          response.responseData &&
          typeof response.responseData.vote === "number"
        ) {
          const voteIndex = response.responseData.vote;
          if (voteIndex >= 0 && voteIndex < votes.length) {
            votes[voteIndex]++;
          }
        }
      });
      setOptionVotes(votes);
    }
  }, [eventResponses]);

  const totalVotes = optionVotes.reduce((a, b) => a + b, 0)

  if (loadingEventResponses) return <div>Loading...</div>;

  return (
    <div>
      <div>
        <h2 className="card-title text-4xl text-green-400 pb-2">{`${capitalizeFirstLetter(
          userEvent.formData.name
        )}`}</h2>
        <div className=" border-y-2">
          <h4 className="text-md">{`${totalVotes} total vote${
            totalVotes > 1 ? "s" : ""
          }`}</h4>
          <div className="border-t border-gray-300 my-1"></div>
          {userEvent.formData.options?.map((option, index) => (
            <div key={index} className="flex text-xl">
              <div className="pr-2">{`${optionVotes[index] || 0}`}</div>
              <div>{`${option.text}`}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PollEventCardBody;
