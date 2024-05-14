import { Box, Button, IconButton, Typography, useTheme,Grid } from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import VpnLockOutlinedIcon from "@mui/icons-material/VpnLockOutlined";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../Components/global/Header";
import LineChart from "../../Components/charts/LineChart";
import GeographyChart from "../../Components/charts/GeographyChart";
import BarChart from "../../Components/charts/BarChart";
import NumericStat from "../../Components/stats/NumericStat";
import ProgressCircle from "../../Components/stats/ProgressCircle";
import PieStat from "../../Components/stats/pieStat";
import ControlsBarChart from "../ISOcontrols/iso_27002/controlsBarChart";
import { CheckedRowsContext } from "../../Context/CheckedRowContext";
import HomeIcon from "@mui/icons-material/Home";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Grid container justifyContent="space-between" alignItems="center">
        <Header
          title="DASHBOARD"
          subtitle="Welcome to your dashboard"
          items={[
            { label: "Home", href: "/", icon: HomeIcon }
          ]}
        />
          <Button
            sx={{
              backgroundColor: colors.buttonColor[100],
              color: "white",
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              "&:hover": {
                backgroundColor:
                  theme.palette.mode == "dark"
                    ? colors.primary[100]
                    : colors.primary[100],
              },
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
      </Grid>

      {/* GRID & CHARTS */}
      <Grid container
       style={{
        display:"flex",
        justifyContent: "space-evenly",
       }}
      >
        {/* ROW 1 */}
        {['New Threats', 'Remaining budget', 'Number of Users', 'Traffic Received', 'Daily Threat Cost'].map((item, index) => (
          <Grid item xs={12} sm={6} md={2.3} key={index}
                style={{
                  backgroundColor: colors.primary[100],
                  border: `1px solid ${colors.elementBorders[100]}`,
                  display: 'flex',
                }}>
            <NumericStat
              title={["25", "$59,342.32", "32,441", "1,325,134","$371.87K"][index]}
              subtitle={item}
              progress={[0.26, 0.50, 0.30, 0.80, 0.80][index]}
              increase={["+14%", "50%", "+5%", "+43%","+43%"][index]}
              icon={[
                <VpnLockOutlinedIcon sx={{ color: colors.textColor[100], fontSize: "26px" }} />,
                <PointOfSaleIcon sx={{ color: colors.textColor[100], fontSize: "26px" }} />,
                <PersonAddIcon sx={{ color: colors.textColor[100], fontSize: "26px" }} />,
                <TrafficIcon sx={{ color: colors.textColor[100], fontSize: "26px" }} />,
                <TrafficIcon sx={{ color: colors.textColor[100], fontSize: "26px" }} />
              ][index]}
            />
            </Grid>
        ))}

        {/* ROW 2 */}
        <Grid item xs={12} md={8} mt={2}
          backgroundColor={colors.primary[100]}
          border={`1px solid  ${colors.elementBorders[100]}`}
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
                color={colors.textColor[100]}
              >
                Total Costs
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.textColor[100]}
              >
                $45,342.61
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{
                    fontSize: "26px",
                    color:
                      theme.palette.mode == "dark"
                        ? colors.textColor[200]
                        : colors.textColor[100],
                    "&:hover": {
                      color: colors.buttonColor[100],
                    },
                  }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" m="-20px 30px 0 0">
            <LineChart isDashboard={true} />
          </Box>
        </Grid>
        <Grid item xs={12} md={3.8} mt={2}
          backgroundColor={colors.primary[100]}
          border={`1px solid  ${colors.elementBorders[100]}`}
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
        </Grid>

        {/* ROW 3 */}
        {/* <Box
              gridColumn="span 4"
              gridRow="span 2"
              backgroundColor={colors.primary[400]}
              p="30px"
            >
              <Typography variant="h5" fontWeight="600">
                Campaign
              </Typography>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                mt="25px"
              >
                <ProgressCircle size="125" />
                <Typography
                  variant="h5"
                  color={colors.greenAccent[500]}
                  sx={{ mt: "15px" }}
                >
                  $48,352 revenue generated
                </Typography>
                <Typography>Includes extra misc expenditures and costs</Typography>
              </Box>
            </Box> */}
        <Grid item xs={12} md={5.9} mt={2}
          sx={{ height: 'fit-content' }}
          backgroundColor={colors.primary[100]}
          border={`1px solid  ${colors.elementBorders[100]}`}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Security Controls ISO 27002 Completion
          </Typography>
          <Box height="400px" mt="-20px">
            <ControlsBarChart isDashboard={true} />
          </Box>
        </Grid>
        <Grid item xs={12} md={5.9} mt={2}
          sx={{ height: 'fit-content' }}
          backgroundColor={colors.primary[100]}
          border={`1px solid  ${colors.elementBorders[100]}`}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Top 5 Threat Impact Cost Breakdown
          </Typography>
          <Box height="400px" mt="-20px">
            <BarChart />
          </Box>
        </Grid>
        <Grid item xs={12} md={4} mt={2}
          backgroundColor={colors.primary[100]}
          border={`1px solid  ${colors.elementBorders[100]}`}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[100]}`}
            colors={colors.textColor[100]}
            p="15px"
          >
            <Typography
              color={colors.textColor[100]}
              variant="h5"
              fontWeight="600"
            >
              Recent Transactions
            </Typography>
          </Box>
          {mockTransactions.map((transaction, i) => (
            <Box
              key={`${transaction.txId}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.textColor[100]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.primary[100]}
                  variant="h5"
                  fontWeight="600"
                >
                  {transaction.txId}
                </Typography>
                <Typography color={colors.textColor[100]}>
                  {transaction.user}
                </Typography>
              </Box>
              <Box color={colors.textColor[100]}>{transaction.date}</Box>
              <Box
                backgroundColor={colors.primary[100]}
                p="5px 10px"
                borderRadius="4px"
              >
                ${transaction.cost}
              </Box>
            </Box>
          ))}
        </Grid>
        <Grid item xs={12} md={5} mt={2}
          sx={{ height: 'fit-content' }}
          backgroundColor={colors.primary[100]}
          padding="30px"
          border={`1px solid  ${colors.elementBorders[100]}`}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ marginBottom: "15px" }}
          >
            Vulnerability Map
          </Typography>
          <Box>
            <GeographyChart/>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
