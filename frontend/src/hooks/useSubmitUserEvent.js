import { useState } from "react";
import { toast } from "react-hot-toast";

const useSubmitUserEvent = () => {
    const [loading, setLoading] = useState(false);

    const submitUserEvent = async ({ formType, shareResults, privateResults, shareable, formData }) => {

        const success = handleInputErrors({ formType, formData });
        if (!success) return;

        setLoading(true);
        try {
            const res = await fetch('api/events/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ formType, shareResults, privateResults, shareable, formData })
            });

            const data = await res.json();
            if (data.error) throw new Error(data.error);
        } catch (error) {
            console.log('Error in useSubmitUserEvent', error.message)
            toast.error(error.message)
        } finally {
            setLoading(false);
        }
    }
    return { loading, submitUserEvent }
}

export default useSubmitUserEvent;

function handleInputErrors({ formType, formData }) {
    if (!formType || !formData) {
        toast.error('There was an error in the input fields, please try again');
        return false;
    }

    if (formData.length > 1000) {
        toast.error('Form data is too large, please try again with less data');
        return false;
    }

    return true;
}