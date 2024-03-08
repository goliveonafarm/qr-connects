import { useState } from 'react';
import toast from 'react-hot-toast';

// need some way to handle errors here (going into, or just in, UserEventCard.jsx)
const useDeleteUserEvent = () => {
    const [isDeletingEvent, setIsDeletingEvent] = useState(false);

    const deleteUserEvent = async (id) => {
        setIsDeletingEvent(true);
        try {
            const res = await fetch(`/api/events/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await res.json();
            if (data.error) throw new Error(data.error);

        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsDeletingEvent(false);
        }
    }
    return { isDeletingEvent, deleteUserEvent };
}

export default useDeleteUserEvent;