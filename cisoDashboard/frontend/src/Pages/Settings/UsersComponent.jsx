import React, { useState, useEffect, useCallback } from "react";
import {
    Box,
    IconButton,
    MenuItem,
    Select,
    Typography,
    Paper,
    useTheme,
    Alert,
    AlertTitle,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import PersonRemoveTwoToneIcon from '@mui/icons-material/PersonRemoveTwoTone';
import { getUsers, deleteUser, updateUserRole } from "../../apiClient";
import { tokens } from "../../theme";
import { useCompany } from "../../Context/CompanyContext";

const UsersComponent = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [users, setUsers] = useState([]);
    const { selectedCompany } = useCompany();
    const [roles] = useState(["ADMIN", "USER"]);
    const [error, setError] = useState(null);

    const fetchUsers = useCallback(async () => {
        if (selectedCompany) {
            try {
                const response = await getUsers(selectedCompany);
                setUsers(response.data);
            } catch (error) {
                console.error("Error fetching users", error);
                setError(error);
            }
        }
    }, [selectedCompany]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const handleDeleteUser = async (id) => {
        try {
            await deleteUser(id, selectedCompany);
            fetchUsers();
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setError(error.response.data);
            }else if(error.response && error.response.status === 403){
                setError("Error deleting user. Not authorized");
            }else {
                setError("An error occured deleting user.");
            }
        }
    };

    const handleRoleChange = async (id, newRole) => {
        try {
            await updateUserRole(id, newRole, selectedCompany);
            fetchUsers();
        } catch (error) {
            if(error.response && error.response.status === 403){
                setError("Error updating user role. Not authorized");
            }else {
                setError(error.response.data);
            }
        }
    };

    const columns = [
        { field: "name", headerName: "Name", width: 200 },
        { field: "username", headerName: "Username", width: 200 },
        { field: "email", headerName: "Email", width: 250 },
        {
            field: "role",
            headerName: "Role",
            width: 200,
            renderCell: (params) => (
                <Select
                    value={params.row.role}
                    onChange={(e) => handleRoleChange(params.row.id, e.target.value)}
                    displayEmpty
                    fullWidth
                >
                    {roles.map((role) => (
                        <MenuItem key={role} value={role}>
                            {role}
                        </MenuItem>
                    ))}
                </Select>
            ),
        },
        {
            field: "actions",
            headerName: "Actions",
            width: 150,
            renderCell: (params) => (
                <Box
                    width="60%"
                    m="0 auto"
                    p="1px"
                    display="flex"
                    justifyContent="center"
                    backgroundColor={colors.others[100]}
                    borderRadius="4px"
                    onClick={() => handleDeleteUser(params.row.id)}
                >
                    <IconButton>
                        <PersonRemoveTwoToneIcon />
                    </IconButton>
                </Box>
            ),
        },
    ];

    return (
        <Box>
            <Typography variant="h5" gutterBottom>
                Users Management
            </Typography>
            {error && (
                <Alert variant="filled" severity="error" onClose={() => setError(null)}>
                    <AlertTitle>Error</AlertTitle>
                    {error}
                </Alert>
            )}
            <Paper style={{ height: 400, width: "100%" }}>
                <DataGrid rows={users} columns={columns} pageSize={5} components={{ Toolbar: GridToolbar }} sx={{
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
            </Paper>
        </Box>
    );
};

export default UsersComponent;
