import { useState } from "react";
import capitalizeFirstLetter from "../../../utils/capitalizeFirstLetter";
const PotluckResponseCardBody = ({
  response,
  handleUpdateResponse,
  updateResponse,
}) => {
  const [formData, setFormData] = useState({
    attending: response.responseData?.attending || null,
    dish: response.responseData?.dish || "",
    name: response.responseData?.name || "",
  });

  const isAttending = response.responseData?.attending;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleUpdateResponse(formData, response._id);
  };

  return (
    <div>
      <div>
        <div className="card-title text-4xl text-success text-center pb-3">{`Potluck at ${capitalizeFirstLetter(
          response.formData.location
        )}`}</div>
      </div>
      <div className="flex text-xl">
        <div className="mr-auto">When: {response.formData.date}</div>
        <div className="ml-auto">Time: {response.formData.time}</div>
      </div>
    </div>
  );
};

export default PotluckResponseCardBody;
