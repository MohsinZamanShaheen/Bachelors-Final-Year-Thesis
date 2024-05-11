import { Box } from "@mui/material";
import Header from "../../Components/global/Header";
import PieChart from "../../Components/charts/PieChart";

const Pie = () => {
  return (
    <Box m="20px">
      <Header title="Pie Chart" subtitle="Pie Chart example with mock data" />
      <Box height="75vh">
        <PieChart />
      </Box>
    </Box>
  );
};

export default Pie;