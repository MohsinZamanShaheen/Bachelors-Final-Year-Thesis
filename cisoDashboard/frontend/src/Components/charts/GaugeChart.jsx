import React from 'react';
import {Box, Typography, Grid, useTheme} from '@mui/material';
import GaugeChart from 'react-gauge-chart';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
  ResponsiveContainer,
} from 'recharts';
import {tokens} from "../../theme";

const gaugeData = {
  value: 22.1,
  min: 0,
  max: 60,
};

const barData = [
  { name: 'Trojans', value: 26, fill: '#2E91E5' },
  { name: 'Adware', value: 23, fill: '#2E91E5' },
  { name: 'Spyware', value: 8.8, fill: '#1CA71C' },
  { name: 'Worms', value: 5.7, fill: '#1CA71C' },
  { name: 'Ransomware', value: 3.6, fill: '#1CA71C' },
];

const lineData = [
  { week: 'W 01 22', value: 20, fill: '#1CA71C' },
  { week: 'W 02 22', value: 18, fill: '#1CA71C' },
  { week: 'W 03 22', value: 15, fill: '#1CA71C' },
  { week: 'W 04 22', value: 40, fill: '#EA4228' },
  { week: 'W 05 22', value: 10, fill: '#1CA71C' },
  { week: 'W 06 22', value: 25, fill: '#F5CD19' },
  { week: 'W 07 22', value: 12, fill: '#1CA71C' },
  { week: 'W 08 22', value: 30, fill: '#F5CD19' },
  { week: 'W 09 22', value: 20, fill: '#1CA71C' },
];

const MyGaugeChart = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h3" fontWeight="bold" mb={2} align="center" gutterBottom>
        Mean Time To Detect (MTTD)
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={5.9} lg={5.9} mt={2}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
            }}
          >
            <GaugeChart
              id="gauge-chart"
              type="radial"
              nrOfLevels={3}
              percent={gaugeData.value / gaugeData.max}
              colors={['#1CA71C', '#2E91E5', '#EA4228']}
              arcWidth={0.3}
              textColor={colors.textColor[100]}
              formatTextValue={(value) => `${gaugeData.value.toFixed(1)} min`}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={5.9} lg={6} mt={2}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Types of Attacks
          </Typography>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={barData} layout="vertical" margin={{ left: 30 }}>
              <XAxis type="number" />
              <YAxis type="category" dataKey="name" />
              <Tooltip />
              <CartesianGrid stroke="#f5f5f5" />
              <Bar dataKey="value" />
            </BarChart>
          </ResponsiveContainer>
        </Grid>
        <Grid item xs={12} mt={6}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Weekly Detection Time
          </Typography>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={lineData} margin={{ top: 20, right: 30 }}>
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <CartesianGrid stroke="#f5f5f5" />
              <Line type="monotone" dataKey="value" stroke="#ff7300" dot={{ stroke: lineData.fill, strokeWidth: 2 }} />
            </LineChart>
          </ResponsiveContainer>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MyGaugeChart;
