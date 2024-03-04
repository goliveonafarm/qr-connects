import { useState } from 'react';

const useDeleteUserEvent = () => {
    const [loading, setLoading] = useState(false);

    const deleteUserEvent = async (id) => {
        setLoading(true);
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
            setLoading(false);
        }
    }
    return { loading, deleteUserEvent };
}

export default useDeleteUserEvent;