import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
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
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="DASHBOARD"
          subtitle="Welcome to your dashboard"
          items={[
            { label: "Home", href: "/", icon: HomeIcon }
          ]}
        />
        <Box>
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
                    : colors.textColor[100],
              },
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
        paddingBottom="10px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[100]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          border={`1px solid  ${colors.elementBorders[100]}`}
        >
          <NumericStat
            title="25"
            subtitle="New Threats"
            progress="0.26"
            increase="+14%"
            icon={
              <VpnLockOutlinedIcon
                sx={{ color: colors.textColor[100], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[100]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          border={`1px solid  ${colors.elementBorders[100]}`}
        >
          <NumericStat
            title="$59,342.32"
            subtitle="Remaining budget"
            progress="0.50"
            increase="50%"
            icon={
              <PointOfSaleIcon
                sx={{ color: colors.textColor[100], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[100]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          border={`1px solid  ${colors.elementBorders[100]}`}
        >
          <NumericStat
            title="32,441"
            subtitle="Number of Clients"
            progress="0.30"
            increase="+5%"
            icon={
              <PersonAddIcon
                sx={{ color: colors.textColor[100], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[100]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          border={`1px solid  ${colors.elementBorders[100]}`}
        >
          <NumericStat
            title="1,325,134"
            subtitle="Traffic Received"
            progress="0.80"
            increase="+43%"
            icon={
              <TrafficIcon
                sx={{ color: colors.textColor[100], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
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
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
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
        </Box>

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
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[100]}
          overflow="auto"
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
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
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
          <Box height="250px" mt="-20px">
            <BarChart isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
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
          <Box height="200px">
            <GeographyChart isDashboard={true} />
          </Box>
        </Box>

        <Box
          gridColumn="span 5"
          gridRow="span 3"
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
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 3"
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
          <Box height="300px">
            <GeographyChart isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn="span 3"
          gridRow="span 3"
          backgroundColor={colors.primary[100]}
          overflow="auto"
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
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
