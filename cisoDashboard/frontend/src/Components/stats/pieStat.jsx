
import { ResponsivePieCanvas } from '@nivo/pie'
import { mockCanvaPieData as data } from "../../data/mockData";
// import { tokens } from "../../theme";
// import { useTheme } from "@mui/material";

const PieStat = () => {  

    // const theme = useTheme();
    // const colors = tokens(theme.palette.mode);

    return (
        <ResponsivePieCanvas
        data={data}
        colors={data.map((d) => d.color)}
        margin={{ top: 40, right: 200, bottom: 40, left: 80 }}
        innerRadius={0.75}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    0.6
                ]
            ]
        }}
        enableArcLinkLabels={false}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        enableArcLabels={false}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor="#333333"
        isInteractive={false}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        legends={[
            {
                anchor: 'right',
                direction: 'column',
                justify: false,
                translateX: 140,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 120,
                itemHeight: 14,
                itemTextColor: '#999',
                itemDirection: 'left-to-right',
                itemOpacity: 1,
                symbolSize: 6,
                symbolShape: 'circle',
            }
        ]}
    />
        
    );
};

export default PieStat;