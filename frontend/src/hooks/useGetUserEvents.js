import { useState } from 'react';

const useGetUserEvents = () => {
    const [loading, setLoading] = useState(false);
    const [userEvents, setUserEvents] = useState([]);
    
    const getUserEvents = async () => {
        setLoading(true);
        console.log('ran here')
        try {
            const res = await fetch('api/events/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await res.json();
            if(data.error) throw new Error(data.error);

            setUserEvents(data.userEvents);
        } catch (error) {

        }finally{
            setLoading(false);
        }
    }

    return {userEvents, getUserEvents};
}
export default useGetUserEvents