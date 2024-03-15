import { useEffect, useState } from 'react';

const useGetUserEvents = () => {
    const [loadingUserEvents, setLoadingUserEvents] = useState(false);
    const [userEvents, setUserEvents] = useState([]);

    useEffect(() => {
        const getUserEvents = async () => {
            setLoadingUserEvents(true);
            try {
                const res = await fetch('api/events/', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data = await res.json();
                if (data.error) throw new Error(data.error);

                setUserEvents(data.userEvents);
            } catch (error) {

            } finally {
                setLoadingUserEvents(false);
            }
        }
        getUserEvents();
    }, []);


    return { loadingUserEvents, userEvents };
}
export default useGetUserEvents