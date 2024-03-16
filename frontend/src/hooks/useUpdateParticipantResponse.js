import { useState } from "react";
import { toast } from "react-hot-toast";

const useUpdateParticipantResponse = () => {
    const [updatingResponse, setUpdatingResponse] = useState(false);

    const updateResponse = async (responseId, responseData) => {
        const success = handleInputErrors(responseData);
        setUpdatingResponse(true);
        try {
            const res = await fetch(`api/participant/update/${responseId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ responseData }),
            });

            const data = await res.json();
            if (data.error) throw new Error(data.error);
        } catch (error) {
            toast.error(error.message);
            return null;
        } finally {
            setUpdatingResponse(false);
        }
    };

    return { updatingResponse, updateResponse };
}

export default useUpdateParticipantResponse;

function handleInputErrors(responseData) {
    return true;
}