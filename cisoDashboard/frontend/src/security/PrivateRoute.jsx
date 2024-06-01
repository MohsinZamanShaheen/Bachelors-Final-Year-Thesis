import React, { useContext, useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import { Snackbar, Alert } from '@mui/material';

const PrivateRoute = ({ role }) => {
    const { user } = useContext(AuthContext);
    const [open, setOpen] = useState(false);
    const [shouldRedirect, setShouldRedirect] = useState(false);

    useEffect(() => {
        if (!user || user.role !== role) {
            setOpen(true);
            setTimeout(() => setShouldRedirect(true), 3000);
        }
    }, [user, role]);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    if (shouldRedirect) {
        return <Navigate to="/" />;
    }

    return (
        <>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    You do not have the necessary permissions to access this page.
                </Alert>
            </Snackbar>
            {user && user.role === role ? <Outlet /> : null}
        </>
    );
};

export default PrivateRoute;