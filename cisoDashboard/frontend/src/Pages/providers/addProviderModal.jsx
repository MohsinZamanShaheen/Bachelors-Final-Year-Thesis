import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import { addProvider } from '../../apiClient';
import {useCompany} from "../../Context/CompanyContext";

const AddProviderModal = ({ open, onClose, onAdd }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { selectedCompany } = useCompany();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        zipCode: '',
        registrarId: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(selectedCompany) {
            try {
                const response = await addProvider(formData,selectedCompany);
                onAdd(response.data);
                onClose();
            } catch (error) {
                console.error("Failed to add provider", error);
            }
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    boxShadow: 24,
                    p: 4,
                }}
            >
                <Typography variant="h6" component="h2">
                    Add New Provider
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="name"
                        label="Name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="email"
                        label="Email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="phone"
                        label="Phone"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="address"
                        label="Address"
                        value={formData.address}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="city"
                        label="City"
                        value={formData.city}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="zipCode"
                        label="Zip Code"
                        value={formData.zipCode}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="registrarId"
                        label="Registrar ID"
                        value={formData.registrarId}
                        onChange={handleChange}
                    />
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 2, backgroundColor: colors.buttonColor[200], color: 'white' }}>
                        Add Provider
                    </Button>
                </form>
            </Box>
        </Modal>
    );
};

export default AddProviderModal;
