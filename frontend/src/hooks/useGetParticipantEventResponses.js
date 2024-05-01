import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const useGetParticipantEventResponses = (responseId) => {
    const [loadingParticipantEventResponses, setLoadingParticipantEventResponses] = useState(false);
    const [participantEventResponses, setParticipantEventResponses] = useState([]);
    
    const getParticipantEventResponses = async () => {
        setLoadingParticipantEventResponses(true);
        
        if(responseId) {
        try {
            const res = await fetch(`api/participant/get/${responseId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await res.json();

            if (data.error) throw new Error(data.error);

            setParticipantEventResponses(data.responses);
        } catch (error) {
            console.log('Error in useGetParticipantEventResponses', error.message)
            toast.error(error.message);
        } finally {
            setLoadingParticipantEventResponses(false);
        }}
        else{
            setParticipantEventResponses([]);
        }
    }

    useEffect(() => {
        getParticipantEventResponses();
    }, []);

    return { loadingParticipantEventResponses, participantEventResponses, getParticipantEventResponses };
}
export default useGetParticipantEventResponses;