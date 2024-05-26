import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../Components/global/Header";
import { useTheme, Button } from "@mui/material";
import { getProviders, addProvider } from "../../apiClient";
import HomeIcon from "@mui/icons-material/Home";
import AddProviderModal from "./addProviderModal";
import { useCompany } from "../../Context/CompanyContext";

const Providers = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { selectedCompany } = useCompany();
    const [providers, setProviders] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        const fetchProviders = async () => {
            if (selectedCompany) {
                try {
                    const response = await getProviders(selectedCompany);
                    console.log("Providers fetched:", response);
                    setProviders(response.data);
                } catch (error) {
                    console.error("Failed to fetch providers data", error);
                }
            }
        };

        fetchProviders();
    }, [selectedCompany]);

    const handleAddProvider = (newProvider) => {
        setProviders([...providers, newProvider]);
    };

    const columns = [
        { field: "id", headerName: "ID", flex: 0.5 },
        { field: "registrarId", headerName: "Registrar ID" },
        {
            field: "name",
            headerName: "Name",
            flex: 1,
            cellClassName: "name-column--cell",
        },
        {
            field: "phone",
            headerName: "Phone Number",
            flex: 1,
        },
        {
            field: "email",
            headerName: "Email",
            flex: 1,
        },
        {
            field: "address",
            headerName: "Address",
            flex: 1,
        },
        {
            field: "city",
            headerName: "City",
            flex: 1,
        },
        {
            field: "zipCode",
            headerName: "Zip Code",
            flex: 1,
        },
    ];

    return (
        <Box m="20px">
            <Header
                title="PROVIDERS"
                subtitle="List of Providers and partners contacts"
                items={[
                    { label: "Home", href: "/", icon: HomeIcon },
                    { label: "providers", href: "/providers"},
                ]}
            />
            <Box display="flex" justifyContent="flex-end" mb={2}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setModalOpen(true)}
                >
                    Add Provider
                </Button>
            </Box>
            <Box
                m="40px 0 0 0"
                height="75vh"
            >
                <DataGrid
                    rows={providers}
                    columns={columns}
                    components={{ Toolbar: GridToolbar }}
                    sx={{
                        "& .MuiDataGrid-root": {
                            border: "none",
                        },
                        "& .MuiDataGrid-cell": {
                            borderBottom: "none",
                        },
                        "& .name-column--cell": {
                            color: colors.textColor[100],
                        },
                        "& .MuiDataGrid-columnHeaders": {
                            backgroundColor: theme.palette.mode === "dark" ? colors.sameColors[200] : colors.sameColors[100],
                            borderBottom: `8px solid ${colors.elementBorders[100]}`,
                            color: theme.palette.mode === "dark" ? colors.sameColors[100] : colors.sameColors[200],
                        },
                        "& .MuiButtonBase-root": {
                            color: theme.palette.mode === "dark" ? colors.sameColors[100] : colors.sameColors[200],
                        },
                        "& .MuiDataGrid-row": {
                            borderBottom: `1px solid ${colors.elementBorders[100]}`,
                        },
                        "& .MuiDataGrid-virtualScroller": {
                            backgroundColor: colors.primary[100]
                        },
                        "& .MuiDataGrid-footerContainer": {
                            borderTop: "none",
                            backgroundColor: colors.primary[100],
                        },
                        "& .MuiCheckbox-root": {
                            color: `${colors.textColor[100]} !important`,
                        },
                        "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                            color: `${colors.textColor[100]}`
                        },
                    }}
                />
            </Box>
            <AddProviderModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                onAdd={handleAddProvider}
            />
        </Box>
    );
};

export default Providers;
