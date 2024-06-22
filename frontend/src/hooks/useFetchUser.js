import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setIsAuth } from '../app/slices/authSlice';

const useFetchUser = () => {
    const token = localStorage.getItem('token');
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        let isMounted = true;

        const fetchUser = async () => {
            if (!token) {
                dispatch(setIsAuth(false));
                setLoading(false);
                return;
            }

            try {
                const { data } = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/auth/profile`, {
                    headers: {
                        token: token
                    }
                });

                if (isMounted) {
                    if (data.user) {
                        dispatch(setIsAuth(true));
                    } else {
                        dispatch(setIsAuth(false));
                    }
                }
            } catch (err) {
                if (isMounted) {
                    dispatch(setIsAuth(false));
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchUser();

        return () => {
            isMounted = false;
        };
    }, [dispatch, token]);

    return loading;
};

export default useFetchUser;
