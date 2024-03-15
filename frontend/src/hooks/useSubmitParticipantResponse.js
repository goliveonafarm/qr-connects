import { useState } from "react";
import { useParams } from "react-router-dom";
import { set } from "mongoose";
import toast from "react-hot-toast";

const useSubmitParticipantResponse = () => {
    const [submittingParticipantResponse, setSubmittingParticipantResponse] = useState(false);
    const submitParticipantResponse = async ( responseData, id ) => {
        const success = handleInputErrors({});
        if (!success) return;
        try {
            setSubmittingParticipantResponse(true);
            const res = await fetch(`api/participant/create/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ responseData })
            });

            const data = await res.json();
            if (data.error) throw new Error(data.error);
        } catch (error) {
            console.log('Error in useSubmitParticipantResponse', error.message)
            toast.error(error.message);
        } finally {
            setSubmittingParticipantResponse(false);
        }
    }
    return { submittingParticipantResponse, submitParticipantResponse };
}

export default useSubmitParticipantResponse;

function handleInputErrors({ }) {
    return true;
}