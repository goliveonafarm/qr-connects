import { useState } from "react"
import { toast } from "react-hot-toast"
import { useAuthContext } from "../context/AuthContext";

const useSignUp = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const signUp = async ({ username, password, confirmPassword }) => {
        const success = handleInputErrors({ username, password, confirmPassword });
        if (!success) return;

        setLoading(true);
        try {
            const res = await fetch('api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password, confirmPassword })
            });

            const data = await res.json();
            if (data.error) throw new Error(data.error)

            localStorage.setItem('event-user', JSON.stringify(data))
            setAuthUser(data);
        } catch (error) {
            toast.error(error.message)
        }
        finally {
            setLoading(false);
        }
    };

    return { loading, signUp };
}

export default useSignUp;

function handleInputErrors({ username, password, confirmPassword }) {
    if (!username || !password || !confirmPassword) {
        toast.error('Please fill in all fields');
        return false;
    }
    if (password.toString() !== confirmPassword.toString()) {
        toast.error('Passwords do not match');
        return false;
    }
    if (password.length < 13) {
        toast.error('Password must be at least 13 characters');
        return false;
    }

    return true;
}