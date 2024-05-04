import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

export const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const login = async (username, password) => {
        const success = handleInputErrors({ username, password });
        if (!success) return;

        setLoading(true);
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }

            localStorage.setItem('event-user', JSON.stringify(data));
            setAuthUser(data);
            toast.success('Login successful');
            return { success: true }            
        } catch (error) {
            toast.error(error.message);

        } finally {
            setLoading(false);
        }
    }
    return { loading, login };
}

export default useLogin;

function handleInputErrors({ username, password }) {
    if (!username || !password) {
        toast.error('Please fill in all fields');
        return false;
    }
    if (password.length < 13) {
        toast.error('Password must be at least 13 characters');
        return false;
    }

    return true;
}