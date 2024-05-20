import { useTheme } from "@mui/material";
import { useState, useEffect } from "react";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../../../theme";
import {getControlSummary} from "../../../apiClient";

const transformData = (summaries) => {
  return summaries.map(summary => ({
    category: summary.category,
    checked: summary.checkedPercentage,
    color: summary.category === 'Total Checked' ? 'red' : 'blue' // Adjust color as needed
  }));
};


const ControlsBarChart = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchControlSummary = async () => {
      try {
        const response = await getControlSummary();
        const transformedData = transformData(response.data);
        setData(transformedData);
      } catch (error) {
        console.error("Error fetching control summary", error);
      }
    };

    fetchControlSummary();
  }, []);

  return (
      <ResponsiveBar
          data={data}
          groupMode="stacked"
          theme={{
            axis: {
              domain: {
                line: {
                  stroke: colors.textColor[100]
                },
              },
              legend: {
                text: {
                  fill: colors.textColor[100],
                  fontSize: 11,
                },
              },
              ticks: {
                line: {
                  stroke: colors.textColor[100],
                  strokeWidth: 1,
                },
                text: {
                  fill: colors.textColor[100]
                },
              },
            },
            legends: {
              text: {
                fill: colors.textColor[100],
              },
            },
            tooltip: {
              container: {
                color: theme.palette.mode === "dark" ? colors.primary[100] : colors.textColor[100],
              },
            },
          }}
          keys={["checked"]}
          indexBy="category"
          margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
          padding={0.3}
          valueScale={{ type: "linear", min: 0, max: 100 }}
          indexScale={{ type: "band", round: true }}
          colors={(d) => d.data.color}
          defs={[
            {
              id: "dots",
              type: "patternDots",
              background: "inherit",
              color: "#FFFFFF",
              size: 4,
              padding: 1,
              stagger: true,
            },
            {
              id: "lines",
              type: "patternLines",
              background: "inherit",
              color: "#eed312",
              rotation: -45,
              lineWidth: 6,
              spacing: 10,
            },
          ]}
          borderColor={{
            from: "color",
            modifiers: [["darker", "1.6"]],
          }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Controls By Category",
            legendPosition: "middle",
            legendOffset: 40,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Checked Controls",
            legendPosition: "middle",
            legendOffset: -45,
            format: value => `${value}%`,
          }}
          enableLabel={false}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{
            from: "color",
            modifiers: [["darker", 1.6]],
          }}
          legends={[
            {
              dataFrom: "indexes",
              anchor: "bottom-right",
              direction: "column",
              justify: false,
              translateX: 120,
              translateY: 0,
              itemsSpacing: 3,
              itemWidth: 120,
              itemHeight: 20,
              itemDirection: "left-to-right",
              itemOpacity: 0.85,
              symbolSize: 8,
              effects: [
                {
                  on: "hover",
                  style: {
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
      />
  );
};
export default ControlsBarChart;