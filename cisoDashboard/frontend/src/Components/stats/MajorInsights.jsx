import React from "react";
import { Box,Typography, Paper, Grid, useTheme, Link } from "@mui/material";
import { tokens } from "../../theme";

const MajorInsights = ({ insights, isInsights=false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Paper sx={{ backgroundColor: colors.primary[100] }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ backgroundColor:colors.primary[100] }}>
        <Typography
            variant="h4" fontWeight="600"
          sx={{ pb: 2, backgroundColor: colors.primary[100] }}
        >
           {!isInsights ? "Attack Paths" : "Major Insights"}
        </Typography>
        <Link href="#" variant="body2">
          See All
        </Link>
      </Box>
      <Box sx={{ maxHeight: '290px',pl:2, pr:2, overflowY: 'auto', backgroundColor:colors.primary[100] }}>
        <Grid container direction="column" spacing={2} backgroundColor={colors.primary[100]}>
          {insights.map((insight, index) => (
            <Grid item xs={12} key={index} backgroundColor={colors.primary[100]}>
              <Paper variant="outlined" sx={{ borderLeft:`5px solid  ${colors.elementBorders[100]}`, display: 'flex', alignItems: 'center', p: 2, backgroundColor: colors.primary[100] }}>
                <Grid container alignItems="center">
                  <Grid item xs={1.5} mr={2} borderRight={`2px solid  ${colors.elementBorders[100]}`} >
                    <Typography variant="h3" color="primary" sx={{ mb: 1}}>
                      {insight.value}
                    </Typography>
                  </Grid>
                  <Grid item xs={9.8}>
                    <Typography variant="body1">{insight.description}</Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Paper>
  );
};

export default MajorInsights;
