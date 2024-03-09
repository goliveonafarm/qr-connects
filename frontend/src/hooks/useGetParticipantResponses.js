import { useState } from 'react';
import toast from 'react-hot-toast';
//get participantEvents by participantId

const useGetParticipantResponses = () => {
    const [loadingParticipantResponses, setLoadingParticipantResponses] = useState(false);
    const [participantResponses, setParticipantResponses] = useState([]);

    const getParticipantResponses = async () => {
        setLoadingParticipantResponses(true);
        try {
            const res = await fetch('api/participant/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await res.json();
            console.log(data)
            if (data.error) throw new Error(data.error);

            setParticipantResponses(data.participantResponses);
        } catch (error) {
            console.log('Error in useGetParticipantResponses', error.message)
            toast.error(error.message);
        }finally{
            setLoadingParticipantResponses(false);
        }
    }
    return { participantResponses, getParticipantResponses };
}
export default useGetParticipantResponses;