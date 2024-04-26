import { useState } from "react";
import toast from "react-hot-toast";

const useDeleteParticipantResponse = () => {
  console.log('ran useDelete')
  const [isDeletingParticipantResponse, setIsDeletingParticipantResponse] =
    useState(false);

  const deleteParticipantResponse = async (id) => {

    setIsDeletingParticipantResponse(true);
    try {
      const res = await fetch(`/api/participant/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsDeletingParticipantResponse(false);
    }
  };
  return { isDeletingParticipantResponse, deleteParticipantResponse };
};

export default useDeleteParticipantResponse;
