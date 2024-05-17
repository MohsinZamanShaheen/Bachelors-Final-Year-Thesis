import React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../Components/global/Header";
import HomeIcon from "@mui/icons-material/Home";


const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'timestamp', headerName: 'Timestamp', width: 200 },
  { field: 'rule', headerName: 'Rule', width: 200 },
  { field: 'assignees', headerName: 'Assignees', width: 150 },
  { field: 'severity', headerName: 'Severity', width: 120 },
  { field: 'riskScore', headerName: 'Risk Score', width: 120 },
  { field: 'reason', headerName: 'Reason', width: 300 },
  { field: 'sourceIP', headerName: 'Source IP', width: 150 },
  { field: 'destinationIP', headerName: 'Destination IP', width: 150 },
  { field: 'eventType', headerName: 'Event Type', width: 150 },
  { field: 'status', headerName: 'Status', width: 120 },
  { field: 'actionTaken', headerName: 'Action Taken', width: 200 },
  { field: 'comments', headerName: 'Comments', width: 300 },
];

const rows = [
  {
    id: 1,
    timestamp: 'Mar 27, 2024 @ 13:02',
    rule: 'Malware Prevention',
    assignees: 'John Doe',
    severity: 'high',
    riskScore: 73,
    reason: 'malware, intrusion_detection, file event with process p',
    sourceIP: '192.168.1.1',
    destinationIP: '10.0.0.1',
    eventType: 'Malware',
    status: 'open',
    actionTaken: 'Blocked',
    comments: 'Immediate action taken to block the malware.',
  },
  {
    id: 2,
    timestamp: 'Mar 27, 2024 @ 12:52',
    rule: 'Malware Prevention',
    assignees: 'Jane Smith',
    severity: 'medium',
    riskScore: 60,
    reason: 'malware, file event',
    sourceIP: '192.168.1.2',
    destinationIP: '10.0.0.2',
    eventType: 'Malware',
    status: 'closed',
    actionTaken: 'Quarantined',
    comments: 'Malware was quarantined successfully.',
  },
  {
    id: 3,
    timestamp: 'Mar 27, 2024 @ 12:52',
    rule: 'Malware Prevention',
    assignees: 'Jane Smith',
    severity: 'medium',
    riskScore: 60,
    reason: 'malware, file event',
    sourceIP: '192.168.1.2',
    destinationIP: '10.0.0.2',
    eventType: 'Malware',
    status: 'closed',
    actionTaken: 'Quarantined',
    comments: 'Malware was quarantined successfully.',
  },
  {
    id: 4,
    timestamp: 'Mar 27, 2024 @ 12:52',
    rule: 'Malware Prevention',
    assignees: 'Jane Smith',
    severity: 'medium',
    riskScore: 60,
    reason: 'malware, file event',
    sourceIP: '192.168.1.2',
    destinationIP: '10.0.0.2',
    eventType: 'Malware',
    status: 'closed',
    actionTaken: 'Quarantined',
    comments: 'Malware was quarantined successfully.',
  },
  {
    id: 5,
    timestamp: 'Mar 27, 2024 @ 12:52',
    rule: 'Malware Prevention',
    assignees: 'Jane Smith',
    severity: 'medium',
    riskScore: 60,
    reason: 'malware, file event',
    sourceIP: '192.168.1.2',
    destinationIP: '10.0.0.2',
    eventType: 'Malware',
    status: 'closed',
    actionTaken: 'Quarantined',
    comments: 'Malware was quarantined successfully.',
  },
  {
    id: 6,
    timestamp: 'Mar 27, 2024 @ 12:52',
    rule: 'Malware Prevention',
    assignees: 'Jane Smith',
    severity: 'medium',
    riskScore: 60,
    reason: 'malware, file event',
    sourceIP: '192.168.1.2',
    destinationIP: '10.0.0.2',
    eventType: 'Malware',
    status: 'closed',
    actionTaken: 'Quarantined',
    comments: 'Malware was quarantined successfully.',
  },
  {
    id: 7,
    timestamp: 'Mar 27, 2024 @ 12:52',
    rule: 'Malware Prevention',
    assignees: 'Jane Smith',
    severity: 'medium',
    riskScore: 60,
    reason: 'malware, file event',
    sourceIP: '192.168.1.2',
    destinationIP: '10.0.0.2',
    eventType: 'Malware',
    status: 'closed',
    actionTaken: 'Quarantined',
    comments: 'Malware was quarantined successfully.',
  },
  {
    id: 8,
    timestamp: 'Mar 27, 2024 @ 12:52',
    rule: 'Malware Prevention',
    assignees: 'Jane Smith',
    severity: 'medium',
    riskScore: 60,
    reason: 'malware, file event',
    sourceIP: '192.168.1.2',
    destinationIP: '10.0.0.2',
    eventType: 'Malware',
    status: 'closed',
    actionTaken: 'Quarantined',
    comments: 'Malware was quarantined successfully.',
  },
  {
    id: 9,
    timestamp: 'Mar 27, 2024 @ 12:52',
    rule: 'Malware Prevention',
    assignees: 'Jane Smith',
    severity: 'medium',
    riskScore: 60,
    reason: 'malware, file event',
    sourceIP: '192.168.1.2',
    destinationIP: '10.0.0.2',
    eventType: 'Malware',
    status: 'closed',
    actionTaken: 'Quarantined',
    comments: 'Malware was quarantined successfully.',
  },
  {
    id: 10,
    timestamp: 'Mar 27, 2024 @ 12:52',
    rule: 'Malware Prevention',
    assignees: 'Jane Smith',
    severity: 'medium',
    riskScore: 60,
    reason: 'malware, file event',
    sourceIP: '192.168.1.2',
    destinationIP: '10.0.0.2',
    eventType: 'Malware',
    status: 'closed',
    actionTaken: 'Quarantined',
    comments: 'Malware was quarantined successfully.',
  },
  {
    id: 11,
    timestamp: 'Mar 27, 2024 @ 12:52',
    rule: 'Malware Prevention',
    assignees: 'Jane Smith',
    severity: 'medium',
    riskScore: 60,
    reason: 'malware, file event',
    sourceIP: '192.168.1.2',
    destinationIP: '10.0.0.2',
    eventType: 'Malware',
    status: 'closed',
    actionTaken: 'Quarantined',
    comments: 'Malware was quarantined successfully.',
  },
  {
    id: 12,
    timestamp: 'Mar 27, 2024 @ 12:52',
    rule: 'Malware Prevention',
    assignees: 'Jane Smith',
    severity: 'medium',
    riskScore: 60,
    reason: 'malware, file event',
    sourceIP: '192.168.1.2',
    destinationIP: '10.0.0.2',
    eventType: 'Malware',
    status: 'closed',
    actionTaken: 'Quarantined',
    comments: 'Malware was quarantined successfully.',
  },
  {
    id: 12,
    timestamp: 'Mar 27, 2024 @ 12:52',
    rule: 'Malware Prevention',
    assignees: 'Jane Smith',
    severity: 'medium',
    riskScore: 60,
    reason: 'malware, file event',
    sourceIP: '192.168.1.2',
    destinationIP: '10.0.0.2',
    eventType: 'Malware',
    status: 'closed',
    actionTaken: 'Quarantined',
    comments: 'Malware was quarantined successfully.',
  },
  {
    id: 13,
    timestamp: 'Mar 27, 2024 @ 12:52',
    rule: 'Malware Prevention',
    assignees: 'Jane Smith',
    severity: 'medium',
    riskScore: 60,
    reason: 'malware, file event',
    sourceIP: '192.168.1.2',
    destinationIP: '10.0.0.2',
    eventType: 'Malware',
    status: 'closed',
    actionTaken: 'Quarantined',
    comments: 'Malware was quarantined successfully.',
  },
  {
    id: 14,
    timestamp: 'Mar 27, 2024 @ 12:52',
    rule: 'Malware Prevention',
    assignees: 'Jane Smith',
    severity: 'medium',
    riskScore: 60,
    reason: 'malware, file event',
    sourceIP: '192.168.1.2',
    destinationIP: '10.0.0.2',
    eventType: 'Malware',
    status: 'closed',
    actionTaken: 'Quarantined',
    comments: 'Malware was quarantined successfully.',
  },
];

const AlertTable = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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
