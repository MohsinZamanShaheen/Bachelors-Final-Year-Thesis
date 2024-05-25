import React, { useState, useEffect } from 'react';
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
import { tokens } from "../../theme";
import {getAlerts} from "../../apiClient";

// Example data for average downtime and repair time
const avgDowntimeData = {
    'CMS Issue': '00:09:20',
    'DNS Issues': '00:29:10',
    'Hardware Failure': '00:05:19',
    'Host Provider': '00:09:30',
    'default': '00:10:00'
};

const avgRepairTimeData = {
    'CMS Issue': '00:08:20',
    'DNS Issues': '00:24:55',
    'Hardware Failure': '00:03:19',
    'Host Provider': '00:08:11',
    'default': '00:10:00'
};

const MTTRChart = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [pieData, setPieData] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [totalIssues, setTotalIssues] = useState(0);

    useEffect(() => {
        const fetchAlertData = async () => {
            try {
                const response = await getAlerts(); // Adjust the URL as needed
                const alerts = response.data;

                // Count the issues by type
                const issueCounts = alerts.reduce((acc, alert) => {
                    const issue = alert.rule;
                    acc[issue] = (acc[issue] || 0) + 1;
                    return acc;
                }, {});

                // Map the data to the structure needed for the chart
                const data = Object.keys(issueCounts).map(issue => ({
                    id: issue,
                    label: issue,
                    value: issueCounts[issue],
                    color: getRandomColor()
                }));

                // Prepare table data with average downtime and repair time
                const tableData = Object.keys(issueCounts).map(issue => ({
                    issue,
                    avgDowntime: avgDowntimeData[issue] || avgDowntimeData['default'],
                    avgRepairTime: avgRepairTimeData[issue] || avgRepairTimeData['default']
                }));

                setPieData(data);
                setTableData(tableData);
                setTotalIssues(data.reduce((acc, item) => acc + item.value, 0));
            } catch (error) {
                console.error("Error fetching alerts", error);
            }
        };

        fetchAlertData();
    }, []);

    // Function to get random color for pie chart
    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    return (
        <Box sx={{ p: 3}}>
            <Typography variant="h4" align="center" gutterBottom>
                Mean Time To Repair
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                    <Box height="250px" mt="-10px">
                        <PieStat isAlert={false} passData={pieData} />
                    </Box>
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <Typography variant="h1">{totalIssues}</Typography>
                        <Typography variant="h6">Issues</Typography>
                    </Box>
                </Grid>
            </Grid>
            <Grid container spacing={2} mt={1}>
                <Grid item xs={12} md={12}>
                    <TableContainer component={Paper} sx={{backgroundColor:colors.primary[100], maxHeight: 250, border: '1px solid', borderColor: colors.elementBorders[100] }}>
                        <Table stickyHeader >
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Issue</TableCell>
                                    <TableCell align="right" sx={{ fontWeight: 'bold' }}>Avg Downtime</TableCell>
                                    <TableCell align="right" sx={{ fontWeight: 'bold' }}>Avg Repair Time</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tableData.map((row) => (
                                    <TableRow key={row.issue}>
                                        <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                            {row.issue}
                                        </TableCell>
                                        <TableCell align="right" sx={{ fontWeight: 'bold' }}>{row.avgDowntime}</TableCell>
                                        <TableCell align="right" sx={{ fontWeight: 'bold' }}>{row.avgRepairTime}</TableCell>
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
