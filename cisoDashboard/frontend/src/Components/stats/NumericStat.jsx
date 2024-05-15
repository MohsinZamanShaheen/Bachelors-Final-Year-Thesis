import { Box, Typography, useTheme, Grid } from "@mui/material";
import { tokens } from "../../theme";
import ProgressCircle from "./ProgressCircle";

const NumericStat = ({ title, subtitle, icon, progress, increase }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box width="100%" p={3}>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Box display="flex" alignItems="center" gap={1}>
            <Box>{icon}</Box>
            <Typography variant="h4" fontWeight="bold" color={colors.textColor[100]}>
              {title}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} display="flex" justifyContent="flex-end">
          <ProgressCircle progress={progress} />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h5"  color={colors.textColor[200]}>
            {subtitle}
          </Typography>
        </Grid>
        <Grid item xs={6} display="flex" justifyContent="flex-end" >
          <Typography variant="h5" fontStyle="italic" color={colors.textColor[100]} marginRight={0.5}>
            {increase}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  )
};

export default NumericStat;
