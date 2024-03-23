import { useState } from "react";
import { useParams } from "react-router-dom";
import { set } from "mongoose";
import toast from "react-hot-toast";

const useCreateParticipantResponse = () => {
    const [creatingParticipantResponse, setSubmittingParticipantResponse] = useState(false);
    const createParticipantResponse = async (id) => {
        const success = handleInputErrors({});
        if (!success) return;
        
        try {
            setSubmittingParticipantResponse(true);
            const res = await fetch(`/api/participant/create/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await res.json();
            if (data.error) throw new Error(data.error);
        } catch (error) {
            console.log('Error in useCreateParticipantResponse', error.message)
            toast.error(error.message);
        } finally {
            setSubmittingParticipantResponse(false);
        }
    }
    return { creatingParticipantResponse, createParticipantResponse };
}

export default useCreateParticipantResponse;

function handleInputErrors({ }) {
    return true;
}