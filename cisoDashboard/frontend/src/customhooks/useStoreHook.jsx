import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useStorePath = () => {
    const location = useLocation();

    useEffect(() => {
        localStorage.setItem('currentPath', location.pathname);
    }, [location.pathname]);
};

export default useStorePath;
