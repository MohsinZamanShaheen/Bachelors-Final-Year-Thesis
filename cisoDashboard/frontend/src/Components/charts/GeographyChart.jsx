import { useTheme } from "@mui/material";
import { ResponsiveChoropleth } from "@nivo/geo";
import { geoFeatures } from "../../data/mockGeoFeatures";
import { tokens } from "../../theme";
import { mockGeographyData as data } from "../../data/mockData";
import { bubbleData } from "../../data/mockData";

const GeographyChart = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <div style={{ height: 332, position: 'relative', backgroundColor:"grey" }}>
      <ResponsiveChoropleth
        data={data}
        theme={{
          axis: {
            domain: {
              line: {
                stroke: colors.textColor[100],
              },
            },
            legend: {
              text: {
                fill: colors.textColor[100],
              },
            },
            ticks: {
              line: {
                stroke: colors.textColor[100],
                strokeWidth: 1,
              },
              text: {
                fill: colors.textColor[100],
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
              color:
                theme.palette.mode == "dark"
                  ? colors.primary[100]
                  : colors.textColor[100],
            },
          },
        }}
        features={geoFeatures.features}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        domain={[0, 1000000]}
        unknownColor="#666666"
        label="properties.name"
        valueFormat=".2s"
        enableGraticule={true}
        projectionScale={80}
        projectionTranslation={[0.6, 0.5]}
        projectionRotation={[0, 0, 0]}
        colors="nivo"
        borderWidth={1.5}
        borderColor="#ffffff"
        legends={[
          {
            anchor: "bottom-left",
            direction: "column",
            justify: true,
            translateX: 20,
            translateY: -20,
            itemsSpacing: 0,
            itemWidth: 94,
            itemHeight: 18,
            itemDirection: "left-to-right",
            itemTextColor: colors.textColor[100],
            itemOpacity: 0.85,
            symbolSize: 18,
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: colors.buttonColor[100],
                  itemOpacity: 0.8,
                },
              },
            ],
          },
        ]}
      />
      <svg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
        }}
      >
        {bubbleData.map((bubble) => (
          <g key={bubble.id}>
            <title>{bubble.name}</title>
            <circle
              key={bubble.id}
              cx={bubble.x}
              cy={bubble.y}
              r={bubble.value}
              fill="rgba(240, 0, 0, 0.75)"
              stroke="white"
              strokeWidth={1.5}
            />
          </g>
        ))}
      </svg>
    </div>
  );
};

export default GeographyChart;
