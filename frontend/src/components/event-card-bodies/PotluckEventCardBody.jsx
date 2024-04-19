import { useEffect } from "react";
import useGetEventResponses from "../../hooks/useGetEventResponses";
import capitalizeFirstLetter from "../../../utils/capitalizeFirstLetter";

const PotluckEventCardBody = ({ userEvent }) => {
  return (
    <div>
      <div>
        {" "}
        <h2 className="card-title text-4xl text-green-400">{`Potluck at ${capitalizeFirstLetter(
          userEvent.formData.location
        )}`}</h2>
      </div>
    </div>
  );
};

export default PotluckEventCardBody;
