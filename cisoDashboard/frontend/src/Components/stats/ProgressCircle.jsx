import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";

const ProgressCircle = ({ progress = "0.75", size = "40", text = "" }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const angle = progress * 360;

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
      <Box
        sx={{
          background: `radial-gradient(${colors.sameColors[200]} 55%, transparent 56%),
            conic-gradient(transparent 0deg ${angle}deg, ${colors.others[800]} ${angle}deg 360deg),
            ${colors.others[500]}`,
          borderRadius: "50%",
          width: "100%",
          height: "100%",
        }}
      ></Box>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography variant="caption" fontSize={18} fontWeight="bold" sx={{ color: colors.textColor[400] }}>
          {text}
        </Typography>
      </Box>
    </Box>
  );
};

export default ProgressCircle;
