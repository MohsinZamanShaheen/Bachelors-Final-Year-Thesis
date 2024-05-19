import React, { useState, useEffect } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem, Select, FormControl, InputLabel, Button } from "@mui/material";
import { getProviders } from "../../apiClient";

const AddInvoiceModal = ({ open, onClose, onSave }) => {
    const [providers, setProviders] = useState([]);
    const [providerId, setProviderId] = useState("");
    const [cost, setCost] = useState("");
    const [date, setDate] = useState("");
    const [concept, setConcept] = useState("");

    useEffect(() => {
        const fetchProviders = async () => {
            try {
                const response = await getProviders();
                setProviders(response.data);
            } catch (error) {
                console.error("Failed to fetch providers data", error);
            }
        };

        fetchProviders();
    }, []);

    const handleSave = () => {
        const selectedProvider = providers.find(provider => provider.id === providerId);
        const newInvoice = {
            providerId: selectedProvider.id,
            providerName: selectedProvider.name,
            cost,
            date,
            concept
        };
        onSave(newInvoice);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add Invoice</DialogTitle>
            <DialogContent>
                <FormControl fullWidth margin="normal">
                    <InputLabel>Provider</InputLabel>
                    <Select
                        value={providerId}
                        onChange={(e) => setProviderId(e.target.value)}
                        label="Provider"
                    >
                        {providers.map((provider) => (
                            <MenuItem key={provider.id} value={provider.id}>
                                {provider.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    margin="normal"
                    label="Cost"
                    type="number"
                    fullWidth
                    value={cost}
                    onChange={(e) => setCost(e.target.value)}
                />
                <TextField
                    margin="normal"
                    label="Date"
                    type="date"
                    fullWidth
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    margin="normal"
                    label="Concept"
                    type="text"
                    fullWidth
                    value={concept}
                    onChange={(e) => setConcept(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSave} variant="contained" color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddInvoiceModal;
