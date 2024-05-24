import React from 'react';
import {
    Box,
    Typography,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    useTheme
} from '@mui/material';
import PieStat from '../stats/pieStat';
import {tokens} from "../../theme";

const pieData = [
    { id: 'CMS Issue',label: 'CMS Issue', value: 7, color: "hsl(120, 69%, 37%)"},
    { id: 'DNS Issues',label: 'DNS Issues', value: 13, color: "hsl(123, 41%, 75%)"},
    { id: 'Hardware Failure',label: 'Hardware Failure', value: 53, color: "hsl(291, 46%, 60%)"},
    { id: 'Host Provider',label: 'Host Provider', value: 27, color: "hsl(14, 100%, 71%)"},
  ];
  

const tableData = [
  { issue: 'CMS Issue', avgDowntime: '00:09:20', avgRepairTime: '00:08:20' },
  { issue: 'DNS Issues', avgDowntime: '00:29:10', avgRepairTime: '00:24:55' },
  { issue: 'Hardware Failure', avgDowntime: '00:05:19', avgRepairTime: '00:03:19' },
  { issue: 'Host Provider', avgDowntime: '00:09:30', avgRepairTime: '00:08:11' },
];

const MTTRChart = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  return (
    <Box sx={{ p: 3}}>
      <Typography variant="h4" align="center" gutterBottom>
        Mean Time To Repair
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Box height="250px" mt="-10px">
            <PieStat dataInfo={pieData} />
          </Box>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h1">{pieData.reduce((acc, data) => acc + data.value, 0)}</Typography>
            <Typography variant="h6">Issues</Typography>
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={2} mt={1}>
        <Grid item xs={12} md={12}>
          <TableContainer component={Paper} sx={{backgroundColor:colors.primary[100]}}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Issue</TableCell>
                  <TableCell align="right">Avg Downtime</TableCell>
                  <TableCell align="right">Avg Repair Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData.map((row) => (
                  <TableRow key={row.issue}>
                    <TableCell component="th" scope="row">
                      {row.issue}
                    </TableCell>
                    <TableCell align="right">{row.avgDowntime}</TableCell>
                    <TableCell align="right">{row.avgRepairTime}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MTTRChart;
