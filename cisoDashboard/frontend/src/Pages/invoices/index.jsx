import { Box, Typography, useTheme, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../Components/global/Header";
import HomeIcon from "@mui/icons-material/Home";
import AddInvoiceModal from "./addInvoiceModal";
import { getInvoices, addInvoice } from "../../apiClient";
import { useCompany } from "../../Context/CompanyContext";

const Invoices = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { selectedCompany } = useCompany();
    const [invoices, setInvoices] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        const fetchInvoices = async () => {
            if (selectedCompany) {
                try {
                    const response = await getInvoices(selectedCompany);
                    console.log("Invoice:", response);
                    setInvoices(response.data);
                } catch (error) {
                    console.error("Error fetching invoices", error);
                }
            }
        };

        fetchInvoices();
    }, [selectedCompany]);

    const handleAddInvoice = async (newInvoice) => {
        if (selectedCompany) {
            try {
                const response = await addInvoice(newInvoice, selectedCompany);
                const addedInvoice = {
                    ...response.data,
                    providerName: newInvoice.providerName,
                };
                setInvoices([...invoices, addedInvoice]);
            } catch (error) {
                console.error("Error adding invoice", error);
            }
        }
    };

    const columns = [
        { field: "id", headerName: "ID", flex: 0.5 },
        {
            field: "providerName",
            headerName: "Provider",
            flex: 1,
        },
        {
            field: "cost",
            headerName: "Cost",
            flex: 1,
        },
        {
            field: "date",
            headerName: "Date",
            flex: 1,
        },
        {
            field: "concept",
            headerName: "Concept",
            flex: 1,
        },
    ];

    return (
        <Box m="20px">
            <Header title="INVOICES" subtitle="List of Invoice Balances" items={[
                { label: "Home", href: "/", icon: HomeIcon },
                { label: "invoices", href: "/invoices" },
            ]} />
            <Box display="flex" justifyContent="flex-end" mb={2}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setModalOpen(true)}
                >
                    Add Invoice
                </Button>
            </Box>
            <Box
                m="40px 0 0 0"
                height="75vh"
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
                    "& .MuiDataGrid-columnHeaderTitleContainerContent .MuiSvgIcon-root": {
                        color: theme.palette.mode === "dark" ? colors.sameColors[100] : colors.sameColors[200],
                    },
                    "& .MuiButtonBase-root": {
                        color: theme.palette.mode === "dark" ? colors.sameColors[100] : colors.sameColors[200],
                    },
                    "& .MuiDataGrid-row": {
                        borderBottom: `1px solid ${colors.elementBorders[100]}`,
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: colors.primary[100],
                    },
                    "& .MuiDataGrid-footerContainer": {
                        borderTop: "none",
                        backgroundColor: colors.primary[100],
                    },
                    "& .MuiCheckbox-root": {
                        color: `${colors.textColor[100]} !important`,
                    },
                }}
            >
                <DataGrid checkboxSelection rows={invoices} columns={columns} />
            </Box>
            <AddInvoiceModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                onSave={handleAddInvoice}
            />
        </Box>
    );
};

export default Invoices;
