import { useState, useEffect, useContext } from "react";
import Header from "../../../Components/global/Header";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import { Box, Typography, useTheme, Tabs, Tab, Button, Tooltip, IconButton } from "@mui/material";
import { controls as ISOControls } from "../../../data/isoData";
import { controles as ISOControlsSpanish } from "../../../data/isoData";
import { LanguageContext } from "../../../Context/LanguageContext";
import { CheckedRowsContext } from "../../../Context/CheckedRowContext";
import InfoIcon from '@mui/icons-material/Info';
import HomeIcon from "@mui/icons-material/Home";


const Controls = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { language, setLanguage } = useContext(LanguageContext);
  const { checkedRows, setCheckedRows } = useContext(CheckedRowsContext);
  const [selectedRows, setSelectedRows] = useState([]);
  const controls = language === "en" ? ISOControls : ISOControlsSpanish;
  const [rows, setRows] = useState([]);
  const controlTypes = Object.keys(controls);
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const selectedControlType = controlTypes[selectedTabIndex];

  const categoryMapping = {
    "Controles Organizacionales": "Organizational Controls",
    "Controles de Personal": "People Controls",
    "Controles Físicos": "Physical Controls",
    "Controles Tecnológicos": "Technological Controls",
  };
  

  const getEnglishCategory = (category, language) => {
    return language === 'en' ? category : categoryMapping[category];
  };

  useEffect(() => {
    const savedCheckedRows = JSON.parse(localStorage.getItem('checkedRows')) || [];
    const newRows = Object.entries(controls[selectedControlType].data).map(([key, value]) => {
      const uniqueKey = `${getEnglishCategory(selectedControlType, language)}_${key}`;
      return {
        id: uniqueKey,
        [selectedControlType]: value.title,
        description: value.description,
        checked: value.status === 'checked' || savedCheckedRows.includes(uniqueKey),  
      };
    });
    setRows(newRows);
  }, [selectedControlType, controls, language]);

  const columns = [
    { field: selectedControlType, headerName: selectedControlType, flex: 2,
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

  const handleControlCheck = () => {
    setRows((prevRows) => {
      const updatedRows = prevRows.map((row) =>
        selectedRows.includes(row.id) ? { ...row, checked: true } : row
      );
      const allCheckedRows = [...new Set([...checkedRows, ...updatedRows.filter((row) => row.checked).map((row) => row.id)])];
      localStorage.setItem('checkedRows', JSON.stringify(allCheckedRows));
      setCheckedRows(allCheckedRows);
      return updatedRows;
    });
  };

  const handleControlUncheck = () => {
    setRows((prevRows) => {
      const updatedRows = prevRows.map((row) =>
        selectedRows.includes(row.id) ? { ...row, checked: false } : row
      );
      const allCheckedRows = checkedRows.filter((rowId) => !selectedRows.includes(rowId));
      localStorage.setItem('checkedRows', JSON.stringify(allCheckedRows));
      setCheckedRows(allCheckedRows);
      return updatedRows;
    });
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
          rows={rows}
          columns={columns}
          disableRowSelectionOnClick
          onRowSelectionModelChange={(newSelection) => {
            setSelectedRows(newSelection);
          }}
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