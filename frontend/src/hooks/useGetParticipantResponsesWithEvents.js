import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const useGetParticipantResponsesWithEvents = () => {
    const [loadingParticipantResponsesWithEvents, setLoadingParticipantResponsesWithEvents] = useState(false);
    const [participantResponsesWithEvents, setParticipantResponsesWithEvents] = useState(null);
    
    const getParticipantResponsesWithEvents = async (id) => {
        setLoadingParticipantResponsesWithEvents(true);
        try {
            const res = await fetch('api/participant/get', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await res.json();
            console.log(data)
            if (data.error) throw new Error(data.error);
            setParticipantResponsesWithEvents(data.participantResponsesWithEvents);
        } catch (error) {
            console.log('Error in useGetParticipantResponsesWithEvents', error.message)
            toast.error(error.message);
        } finally {
            setLoadingParticipantResponsesWithEvents(false);
        }
    }

    useEffect(() => {
        getParticipantResponsesWithEvents();
    }, []);

    return { loadingParticipantResponsesWithEvents, participantResponsesWithEvents, getParticipantResponsesWithEvents };
}
export default useGetParticipantResponsesWithEvents;