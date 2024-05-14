import { Box } from "@mui/material";
import Header from "../../Components/global/Header";
import MapChart from "../../Components/charts/MapChart";

const Map = () => {
  return (
    <Box m="20px">
      <Header title="Bar Chart" subtitle="Simple Bar Chart" />
      <Box height="700px">
        <MapChart />
      </Box>
    </Box>
  );
};

export default Map;