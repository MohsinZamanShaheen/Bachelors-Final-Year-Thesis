import { ResponsivePieCanvas } from "@nivo/pie";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";

const PieStat = ({dataInfo}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <ResponsivePieCanvas
      data={dataInfo}
      theme={{
        legends: {
          text: {
            fill: colors.textColor[100],
            fontSize: 16,
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
      colors={dataInfo.map((d) => d.color)}
      margin={{ top: 40, right: 200, bottom: 40, left: 80 }}
      innerRadius={0.75}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.6]],
      }}
      enableArcLinkLabels={false}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      enableArcLabels={true}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={colors.sameColors[200]}
      isInteractive={true}
      legends={[
        {
          anchor: "right",
          direction: "column",
          justify: false,
          translateX: 140,
          translateY: 0,
          itemsSpacing: 10,
          itemWidth: 130,
          itemHeight: 20,
          itemTextColor: colors.textColor[100],
          itemDirection: "left-to-right",
          itemOpacity: 1,
          symbolSize: 15,
          symbolShape: "square",
          fontSize: 16,
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: colors.buttonColor[100],
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};

export default PieStat;
