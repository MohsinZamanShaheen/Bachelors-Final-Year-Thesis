import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, useTheme, MenuItem, Select, TextField } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../Components/global/Header";
import HomeIcon from "@mui/icons-material/Home";
import { getAlerts, getTeam, updateAssignee, updateStatus, updateAction, updateComments } from "../../apiClient";
import { useCompany } from "../../Context/CompanyContext";

const AlertTable = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { selectedCompany } = useCompany();
  const [rows, setRows] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (selectedCompany) {
        const alertsResponse = await getAlerts(selectedCompany);
        const usersResponse = await getTeam(selectedCompany);
        setRows(alertsResponse.data);
        setUsers(usersResponse.data);
      }
    };

    fetchData();
  }, [selectedCompany]);

  const handleAssigneeChange = async (id, assignee) => {
    await updateAssignee(id, assignee, selectedCompany);
    setRows(rows.map(row => row.id === id ? { ...row, assignees: assignee } : row));
  };

  const handleStatusChange = async (id, status) => {
    await updateStatus(id, status, selectedCompany);
    setRows(rows.map(row => row.id === id ? { ...row, status: status } : row));
  };

  const handleActionChange = async (id, action) => {
    await updateAction(id, action, selectedCompany);
    setRows(rows.map(row => row.id === id ? { ...row, actionTaken: action } : row));
  };

  const handleCommentsChange = async (id, comments) => {
    await updateComments(id, comments, selectedCompany);
    setRows(rows.map(row => row.id === id ? { ...row, comments: comments } : row));
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'timestamp', headerName: 'Timestamp', width: 200 },
    { field: 'rule', headerName: 'Rule', width: 200 },
    { field: 'assignees', headerName: 'Assignees', width: 150, renderCell: (params) => (
          <Select
              value={params.row.assignees || ''}
              onChange={(e) => handleAssigneeChange(params.row.id, e.target.value)}
              sx={{ width: '100%' }}
          >
            {users.map(user => (
                <MenuItem key={user.id} value={user.username}>
                  {user.username}
                </MenuItem>
            ))}
          </Select>
      )},
    { field: 'severity', headerName: 'Severity', width: 120 },
    { field: 'riskScore', headerName: 'Risk Score', width: 120 },
    { field: 'reason', headerName: 'Reason', width: 300 },
    { field: 'source', headerName: 'Source', width: 150 },
    { field: 'destination', headerName: 'Destination', width: 150 },
    { field: 'eventType', headerName: 'Event Type', width: 150 },
    { field: 'status', headerName: 'Status', width: 120, renderCell: (params) => (
          <Select
              value={params.row.status || ''}
              onChange={(e) => handleStatusChange(params.row.id, e.target.value)}
              sx={{ width: '100%' }}
          >
            <MenuItem value="open">Open</MenuItem>
            <MenuItem value="closed">Closed</MenuItem>
            <MenuItem value="partially filled">Partially Filled</MenuItem>
            <MenuItem value="filled">Filled</MenuItem>
            <MenuItem value="rejected">Rejected</MenuItem>
          </Select>
      )},
    { field: 'actionTaken', headerName: 'Action Taken', width: 200, renderCell: (params) => (
          <Select
              value={params.row.actionTaken || ''}
              onChange={(e) => handleActionChange(params.row.id, e.target.value)}
              sx={{ width: '100%' }}
          >
            <MenuItem value="Blocked">Blocked</MenuItem>
            <MenuItem value="Quarantined">Quarantined</MenuItem>
            <MenuItem value="None">None</MenuItem>
          </Select>
      )},
    { field: 'comments', headerName: 'Comments', width: 300, renderCell: (params) => (
          <TextField
              value={params.row.comments || ''}
              onChange={(e) => handleCommentsChange(params.row.id, e.target.value)}
              sx={{ width: '100%' }}
          />
      )},
  ];

  return (
      <Box m="20px">
        <Header
            title="ALERTS"
            subtitle="List of reported alerts"
            items={[
              { label: "Home", href: "/", icon: HomeIcon },
              { label: "alerts", href: "/detailedAlerts" },
            ]}
        />
        <Box m="40px 0 0 0" height="75vh">
          <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[5, 10, 20]}
              checkboxSelection
              disableSelectionOnClick
              components={{
                Toolbar: GridToolbar,
              }}
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
                  backgroundColor:
                      theme.palette.mode === "dark"
                          ? colors.sameColors[200]
                          : colors.sameColors[100],
                  borderBottom: `8px solid ${colors.elementBorders[100]}`,
                  color:
                      theme.palette.mode === "dark"
                          ? colors.sameColors[100]
                          : colors.sameColors[200],
                },
                "& .MuiButtonBase-root": {
                  color:
                      theme.palette.mode === "dark"
                          ? colors.sameColors[100]
                          : colors.sameColors[200],
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
                "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                  color: `${colors.textColor[100]}`,
                },
              }}
          />
        </Box>
      </Box>
  );
};

export default AlertTable;
