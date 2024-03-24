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
        <h2 className="card-title text-4xl text-success text-center pb-3">{`Potluck at ${capitalizeFirstLetter(
          response.formData.location
        )}`}</h2>
      </div>
      <div>Where: {response.formData.location}</div>
      <div>When: {response.formData.date}</div>
      <div>Time: {response.formData.time}</div>
    </div>
  );
};

export default PotluckResponseCardBody;
