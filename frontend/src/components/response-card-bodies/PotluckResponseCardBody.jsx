import { useEffect, useState } from "react";
import useUpdateParticipantResponse from "../../hooks/useUpdateParticipantResponse";
import useDebounce from "../../hooks/useDebounce";
import capitalizeFirstLetter from "../../../utils/capitalizeFirstLetter";

const PotluckResponseCardBody = ({ response, startLoading, stopLoading }) => {
  const [formData, setFormData] = useState({
    attending: response.responseData?.attending || null,
    dish: response.responseData?.dish || "",
    name: response.responseData?.name || "",
  });

  const { updatingResponse, updateResponse } = useUpdateParticipantResponse();

  const debouncedName = useDebounce(formData.name, 1000);
  const debouncedDish = useDebounce(formData.dish, 1000);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleChangeAttending = async (newAttendingValue) => {
    const newVal =
      newAttendingValue === formData.attending ? null : newAttendingValue;

    submitChange("attending", newVal);
  };

  const submitChange = async (prop, newVal) => {
    startLoading();
    const previousFormData = { ...formData };
    setFormData((prevFormData) => ({ ...prevFormData, [prop]: newVal }));

    try {
      const { success } = await updateResponse(response._id, {
        ...formData,
        [prop]: newVal,
      });
      if (!success) throw new Error("Error updating response");
    } catch (error) {
      setFormData(previousFormData);
    } finally {
      stopLoading();
    }
  };

  useEffect(() => {
    const runThis = async () => {
      if (debouncedName != response.responseData?.name)
        submitChange("name", debouncedName);
      if (debouncedDish != response.responseData?.dish)
        submitChange("dish", debouncedDish);
    };

    if (
      debouncedName != response.responseData?.name ||
      debouncedDish != response.responseData?.dish
    )
      runThis();
  }, [debouncedName, debouncedDish]);

  const formattedDate = new Date(response.formData.date).toDateString();

  return (
    <div>
      <div>
        <div className="card-title text-4xl text-green-400 text-center pb-3">{`Potluck at ${capitalizeFirstLetter(
          response.formData.location
        )}`}</div>
      </div>
      <div className="text-2xl text-white">
        {`${new Date(response.formData.date).toDateString()}`} @{" "}
        {`${response.formData.time.hour}:${response.formData.time.minute} ${response.formData.time.period}`}
      </div>
      <div>
        <div className="flex">
          <div className="mr-auto ml-auto">
            <button
              onClick={() => handleChangeAttending(true)}
              title="Attending"
            >
              <svg
                height={"50"}
                width={"50"}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className={
                  formData.attending === true
                    ? "fill-green-400 hover:fill-blue-500"
                    : "fill-white hover:fill-blue-500"
                }
              >
                {/* // fill-info hover:fill-purple-500 */}
                <path d="M323.8 34.8c-38.2-10.9-78.1 11.2-89 49.4l-5.7 20c-3.7 13-10.4 25-19.5 35l-51.3 56.4c-8.9 9.8-8.2 25 1.6 33.9s25 8.2 33.9-1.6l51.3-56.4c14.1-15.5 24.4-34 30.1-54.1l5.7-20c3.6-12.7 16.9-20.1 29.7-16.5s20.1 16.9 16.5 29.7l-5.7 20c-5.7 19.9-14.7 38.7-26.6 55.5c-5.2 7.3-5.8 16.9-1.7 24.9s12.3 13 21.3 13L448 224c8.8 0 16 7.2 16 16c0 6.8-4.3 12.7-10.4 15c-7.4 2.8-13 9-14.9 16.7s.1 15.8 5.3 21.7c2.5 2.8 4 6.5 4 10.6c0 7.8-5.6 14.3-13 15.7c-8.2 1.6-15.1 7.3-18 15.2s-1.6 16.7 3.6 23.3c2.1 2.7 3.4 6.1 3.4 9.9c0 6.7-4.2 12.6-10.2 14.9c-11.5 4.5-17.7 16.9-14.4 28.8c.4 1.3 .6 2.8 .6 4.3c0 8.8-7.2 16-16 16H286.5c-12.6 0-25-3.7-35.5-10.7l-61.7-41.1c-11-7.4-25.9-4.4-33.3 6.7s-4.4 25.9 6.7 33.3l61.7 41.1c18.4 12.3 40 18.8 62.1 18.8H384c34.7 0 62.9-27.6 64-62c14.6-11.7 24-29.7 24-50c0-4.5-.5-8.8-1.3-13c15.4-11.7 25.3-30.2 25.3-51c0-6.5-1-12.8-2.8-18.7C504.8 273.7 512 257.7 512 240c0-35.3-28.6-64-64-64l-92.3 0c4.7-10.4 8.7-21.2 11.8-32.2l5.7-20c10.9-38.2-11.2-78.1-49.4-89zM32 192c-17.7 0-32 14.3-32 32V448c0 17.7 14.3 32 32 32H96c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32H32z" />
              </svg>
            </button>
          </div>
          <div className="mr-auto ml-auto">
            <button onClick={() => handleChangeAttending(false)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="50"
                width="50"
                viewBox="0 0 512 512"
                className={
                  formData.attending === false
                    ? "fill-green-400 hover:fill-blue-500"
                    : "fill-white hover:fill-blue-500"
                }
              >
                <path d="M323.8 477.2c-38.2 10.9-78.1-11.2-89-49.4l-5.7-20c-3.7-13-10.4-25-19.5-35l-51.3-56.4c-8.9-9.8-8.2-25 1.6-33.9s25-8.2 33.9 1.6l51.3 56.4c14.1 15.5 24.4 34 30.1 54.1l5.7 20c3.6 12.7 16.9 20.1 29.7 16.5s20.1-16.9 16.5-29.7l-5.7-20c-5.7-19.9-14.7-38.7-26.6-55.5c-5.2-7.3-5.8-16.9-1.7-24.9s12.3-13 21.3-13L448 288c8.8 0 16-7.2 16-16c0-6.8-4.3-12.7-10.4-15c-7.4-2.8-13-9-14.9-16.7s.1-15.8 5.3-21.7c2.5-2.8 4-6.5 4-10.6c0-7.8-5.6-14.3-13-15.7c-8.2-1.6-15.1-7.3-18-15.2s-1.6-16.7 3.6-23.3c2.1-2.7 3.4-6.1 3.4-9.9c0-6.7-4.2-12.6-10.2-14.9c-11.5-4.5-17.7-16.9-14.4-28.8c.4-1.3 .6-2.8 .6-4.3c0-8.8-7.2-16-16-16H286.5c-12.6 0-25 3.7-35.5 10.7l-61.7 41.1c-11 7.4-25.9 4.4-33.3-6.7s-4.4-25.9 6.7-33.3l61.7-41.1c18.4-12.3 40-18.8 62.1-18.8H384c34.7 0 62.9 27.6 64 62c14.6 11.7 24 29.7 24 50c0 4.5-.5 8.8-1.3 13c15.4 11.7 25.3 30.2 25.3 51c0 6.5-1 12.8-2.8 18.7C504.8 238.3 512 254.3 512 272c0 35.3-28.6 64-64 64l-92.3 0c4.7 10.4 8.7 21.2 11.8 32.2l5.7 20c10.9 38.2-11.2 78.1-49.4 89zM32 384c-17.7 0-32-14.3-32-32V128c0-17.7 14.3-32 32-32H96c17.7 0 32 14.3 32 32V352c0 17.7-14.3 32-32 32H32z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <label className="input input-bordered flex items-center gap-2 text-xl">
        <input
          type="text"
          className="grow text-success  placeholder-white"
          placeholder="Name (optional)"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </label>
      <label className="input input-bordered flex items-center gap-2 text-xl">
        <input
          type="text"
          className="grow text-success  placeholder-white"
          placeholder="Dish (optional)"
          name="dish"
          value={formData.dish}
          onChange={handleChange}
        />
      </label>
      <div className="flex">
        <div className="mr-auto ml-auto text-white">{`You: ${
          formData.name || "Anonymous"
        } - ${
          formData.attending === true
            ? "Attending"
            : formData.attending === false
            ? "Not Attending"
            : "No Response"
        }`}</div>
      </div>
      <div className="flex">
        <div className="mr-auto ml-auto text-white">{`Your Dish: ${
          formData.dish || "N/A"
        }`}</div>
      </div>
    </div>
  );
};

export default PotluckResponseCardBody;
