import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, {useState, useEffect}  from "react";
import { tokens } from "../../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../Components/global/Header";
import HomeIcon from "@mui/icons-material/Home";
import {getTeam}  from "../../apiClient";
import {useCompany} from "../../Context/CompanyContext";


const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { selectedCompany } = useCompany();
  const [team, setTeam] = useState([]);

  useEffect(() => {
    const fetchTeam = async () => {
        if (selectedCompany) {
            try {
                const response = await getTeam(selectedCompany);
                setTeam(response.data);
            } catch (error) {
                console.error("Failed to fetch team data", error);
            }
        }
    };
    fetchTeam();
    }, [selectedCompany]);


  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "role",
      headerName: "Access Level",
      flex: 1,
      renderCell: ({ row: { role } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              role === "ADMIN"
                ? colors.others[700]
                : colors.others[100]
            }
            borderRadius="4px"
          >
              {role === "ADMIN" && <AdminPanelSettingsOutlinedIcon />}
              {role === "USER" && <SecurityOutlinedIcon />}
            <Typography color={colors.textColor[100][100]} sx={{ ml: "5px" }}>
              {role}
            </Typography>
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Header title="TEAM" subtitle="Managing the Team Members" items={[
          { label: "Home", href: "/", icon: HomeIcon },
          { label: "team", href: "/team"},
        ]} />
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
            backgroundColor: colors.primary[100],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.textColor[100]} !important`,
          },
        }}
      >
        <DataGrid checkboxSelection rows={team} columns={columns} />
      </Box>
    </Box>
  );
};

export default Team;