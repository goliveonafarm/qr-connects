import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import useCreateParticipantResponse from "../../hooks/useCreateParticipantResponse";

const Loading = () => {
  //next we need to figure out what happens when an incorrect eventId is passed
  let { eventId } = useParams();
  const navigate = useNavigate();
  const { creatingParticipantResponse, createParticipantResponse } =
    useCreateParticipantResponse();

    let loadingNow = false;

  useEffect(() => {
    const runThis = async () => {
      const handleSubmitNewResponse = async (eventId) => {
        return createParticipantResponse(eventId);
      };
      loadingNow = true;
      await handleSubmitNewResponse(eventId).then(() => {
        eventId = null;
        navigate("/");
      });
    };

    if (!loadingNow) runThis();
  }, []);
  return <div className="loading loading-spinner"></div>;
};

export default Loading;
