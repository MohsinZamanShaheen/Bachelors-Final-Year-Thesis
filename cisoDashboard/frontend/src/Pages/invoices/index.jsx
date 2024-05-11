import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataInvoices } from "../../data/mockData";
import Header from "../../Components/global/Header";
import HomeIcon from "@mui/icons-material/Home";

const Invoices = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID" },
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
      field: "cost",
      headerName: "Cost",
      flex: 1,
      renderCell: (params) => (
        <Typography color={colors.textColor[100]}>
          ${params.row.cost}
        </Typography>
      ),
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
    },
  ];

  return (
    <Box m="20px">
      <Header title="INVOICES" subtitle="List of Invoice Balances" items={[
          { label: "Home", href: "/", icon: HomeIcon },
          { label: "invoices", href: "/invoices"},
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
        <DataGrid checkboxSelection rows={mockDataInvoices} columns={columns} />
      </Box>
    </Box>
  );
};

export default Invoices;