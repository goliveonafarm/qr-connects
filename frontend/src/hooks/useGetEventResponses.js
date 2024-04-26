import { useEffect, useState } from 'react'

const useGetEventResponses = (eventId) => {
    const [loadingEventResponses, setLoadingEventResponses] = useState(false)
    const [eventResponses, setEventResponses] = useState(null)

    const getEventResponses = async () => {
        console.log('called...')
        setLoadingEventResponses(true)
        try {
            const res = await fetch(`api/responses/${eventId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await res.json();
            if (data.error) throw new Error(data.error);
            setEventResponses(data.responses);
        }
        catch (error) {
            console.log('Error in useGetEventResponses', error.message)
        }
        finally {
            setLoadingEventResponses(false);
        }
    }

    useEffect(() => {
        getEventResponses();
    }, []);

    return { loadingEventResponses, eventResponses, getEventResponses }
}

export default useGetEventResponses