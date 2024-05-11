import { Box } from "@mui/material";
import Header from "../../Components/global/Header";
import LineChart from "../../Components/charts/LineChart";

const Line = () => {
  return (
    <Box m="20px">
      <Header title="Line Chart" subtitle="Simple Line Chart" />
      <Box height="75vh">
        <LineChart />
      </Box>
    </Box>
  );
};

export default Line;