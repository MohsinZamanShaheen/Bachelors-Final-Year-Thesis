import { Box, Button,IconButton, useTheme, Typography } from "@mui/material"
import Header from "../../Components/global/Header";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import PieStat from "../../Components/stats/pieStat";
import NumericStat from "../../Components/stats/NumericStat";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import LineChart from "../../Components/charts/LineChart";

const Dashboard2 = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box m="20px">
            {/* HEADER */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="DASHBOARD" subtitle="Welcome to your dashboard 2" />

                <Box>
                <Button
                    sx={{
                    backgroundColor: colors.blueAccent[700],
                    color: colors.grey[100],
                    fontSize: "14px",
                    fontWeight: "bold",
                    padding: "10px 20px",
                    }}
                >
                    <DownloadOutlinedIcon sx={{ mr: "10px" }} />
                    Download Reports
                </Button>
                </Box>
            </Box>

            {/* STATS */}
            <Box
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows="140px"
                gap="20px"
            >
                <Box
                    gridColumn="span 4"
                    gridRow="span 2"
                    backgroundColor={colors.primary[400]}
                    >
                    <Typography
                        variant="h3"
                        fontWeight="600"
                        sx={{ padding: "30px 30px 0 30px" }}
                    >
                        Alerts
                    </Typography>
                    <Box height="250px" mt="-10px">
                        <PieStat />
                    </Box>
                </Box>

                {/* ROW 1 */}
                {/* <Box
                gridColumn="span 4"
                backgroundColor={colors.primary[400]}
                display="flex"
                alignItems="center"
                justifyContent="center"
                >
                <NumericStat
                    title="12,361"
                    subtitle="Emails Sent"
                    progress="0.75"
                    increase="+14%"
                    icon={
                    <EmailIcon
                        sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                    />
                    }
                />
                </Box>
                <Box
                gridColumn="span 4"
                backgroundColor={colors.primary[400]}
                display="flex"
                alignItems="center"
                justifyContent="center"
                >
                <NumericStat
                    title="431,225"
                    subtitle="Sales Obtained"
                    progress="0.50"
                    increase="+21%"
                    icon={
                    <PointOfSaleIcon
                        sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                    />
                    }
                />
                </Box> */}

<Box
              gridColumn="span 8"
              gridRow="span 2"
              backgroundColor={colors.primary[400]}
            >
              <Box
                mt="25px"
                p="0 30px"
                display="flex "
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Typography
                    variant="h5"
                    fontWeight="600"
                    color={colors.grey[100]}
                  >
                    Revenue Generated
                  </Typography>
                  <Typography
                    variant="h3"
                    fontWeight="bold"
                    color={colors.greenAccent[500]}
                  >
                    $59,342.32
                  </Typography>
                </Box>
                <Box>
                  <IconButton>
                    <DownloadOutlinedIcon
                      sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                    />
                  </IconButton>
                </Box>
              </Box>
              <Box height="250px" m="-20px 0 0 0">
                <LineChart isDashboard={true} />
              </Box>
            </Box>
            
             </Box>
        </Box>
    )
};


export default Dashboard2;