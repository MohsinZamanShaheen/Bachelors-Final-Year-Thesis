import { useState, useContext, useEffect } from "react";
import Header from "../../../Components/global/Header";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import { Box, Typography, useTheme, Tabs, Tab, Button, Tooltip, IconButton } from "@mui/material";
import { LanguageContext } from "../../../Context/LanguageContext";
import InfoIcon from '@mui/icons-material/Info';
import HomeIcon from "@mui/icons-material/Home";
import { getControls, updateControlStatusByCode } from "../../../apiClient"; // Update this import

const Controls = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { language, setLanguage } = useContext(LanguageContext);
    const [selectedRows, setSelectedRows] = useState([]);
    const [controls, setControls] = useState([]);
    const [rows, setRows] = useState([]);
    const [selectedTabIndex, setSelectedTabIndex] = useState(0);

    useEffect(() => {
        const fetchControls = async () => {
            try {
                const response = await getControls(language);
                setControls(response.data);
                setRows(response.data); // Ensure rows are set to fetched data
            } catch (error) {
                console.error("Error fetching controls", error);
            }
        };

        fetchControls();
    }, [language]);

    const controlTypes = [...new Set(controls.map(control => control.category))];
    const selectedControlType = controlTypes[selectedTabIndex];
    const filteredRows = rows.filter(row => row.category === selectedControlType);

    const columns = [
        { field: "title", headerName: selectedControlType, flex: 2,
            renderCell: (params) => (
                <Box display="flex" alignItems="center">
                    <Typography variant="h5">
                        {params.value}
                    </Typography>
                    <Tooltip title={
                        <div
                            style={{
                                fontSize: "1rem",
                            }}
                        >
                            {params.row.description || "No description available"}
                        </div>
                    }>
                        <IconButton>
                            <InfoIcon color="action" />
                        </IconButton>
                    </Tooltip>
                </Box>
            )
        },
        {
            field: "status",
            headerName: "Status",
            flex: 1,
            renderCell: (params) => (
                <Button
                    variant="contained"
                    color={params.row.checked ? "success" : "error"}
                    style={{color: 'white'}}
                >
                    {params.row.checked ? "Checked" : "Unchecked"}
                </Button>
            ),
        },
    ];

    const handleControlCheck = async () => {
        const updatedRows = [...rows];

        for (let id of selectedRows) {
            try {
                const control = rows.find(row => row.id === id);
                if (control) {
                    await updateControlStatusByCode(control.controlCode, true); // Update this call
                    const indices = updatedRows.filter(row => row.controlCode === control.controlCode);
                    indices.forEach(index => {
                        index.checked = true;
                    });
                }
            } catch (error) {
                console.error("Error updating control status", error);
            }
        }

        setRows(updatedRows);
    };

    const handleControlUncheck = async () => {
        const updatedRows = [...rows];

        for (let id of selectedRows) {
            try {
                const control = rows.find(row => row.id === id);
                if (control) {
                    await updateControlStatusByCode(control.controlCode, false); // Update this call
                    const indices = updatedRows.filter(row => row.controlCode === control.controlCode);
                    indices.forEach(index => {
                        index.checked = false;
                    });
                }
            } catch (error) {
                console.error("Error updating control status", error);
            }
        }

        setRows(updatedRows);
    };

    return (
        <Box m="20px">
            <Header
                title="ISO 27002 Controls"
                subtitle="Manage the security controls"
                items={[
                    { label: "Home", href: "/", icon: HomeIcon },
                    { label: "ISO27002", href: "/iso27002"},
                ]}
            />
            <Box display="flex" justifyContent="end">
                <Button
                    variant={language === "en" ? "contained" : "outlined"}
                    onClick={() => setLanguage("en")}
                >
                    English
                </Button>
                <Button
                    variant={language === "es" ? "contained" : "outlined"}
                    onClick={() => setLanguage("es")}
                    style={{ marginLeft: "10px" }}
                >
                    Spanish
                </Button>
            </Box>
            <Tabs
                value={selectedTabIndex}
                onChange={(event, newIndex) => {
                    setSelectedTabIndex(newIndex);
                }}
                textColor="primary"
                indicatorColor="primary"
            >
                {controlTypes.map((controlType, index) => (
                    <Tab key={index} label={controlType} />
                ))}
            </Tabs>
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
                    "& .MuiDataGrid-columnHeaderTitleContainerContent .MuiSvgIcon-root":{
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
                        backgroundColor: colors.primary[100]
                    },
                    "& .MuiCheckbox-root": {
                        color: `${colors.textColor[100]}`
                    },
                }}
            >
                <DataGrid
                    checkboxSelection
                    rows={filteredRows}
                    columns={columns}
                    disableRowSelectionOnClick
                    onRowSelectionModelChange={(newSelection) => {
                        setSelectedRows(newSelection);
                    }}
                    rowSelectionModel={selectedRows}
                />

                <Box display="flex" justifyContent="end" m="20px 10px" pb="20px">
                    <Button
                        color= "primary"
                        variant="contained"
                        onClick={handleControlCheck}
                        style={{ backgroundColor: colors.buttonColor[100], color: 'white', height: '50px' }}
                    >
                        Mark selected as checked
                    </Button>
                    <Button
                        color= "primary"
                        variant="contained"
                        onClick={handleControlUncheck}
                        style={{ marginLeft: "10px", backgroundColor: colors.buttonColor[100], color: 'white', height: '50px' }}
                    >
                        Mark selected as unchecked
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default Controls;
