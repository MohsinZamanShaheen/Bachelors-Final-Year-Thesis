import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import BreadcrumbComp from "../other/BreadCrumb";

const Header = ({ title, subtitle, items=[] }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box mb="30px">
      {items.length > 0 && (
        <Box sx={{mb: 2}}>
          <BreadcrumbComp items={items} />
        </Box>
      )}
      <Box>
        <Typography
          variant="h2"
          color={colors.textColor[100]}
          fontWeight="bold"
          sx={{ m: "0 0 5px 0" }}
        >
          {title}
        </Typography>
        <Typography variant="h5" color={colors.textColor[100]}>
          {subtitle}
        </Typography>
      </Box>
    </Box>
  );
};

export default Header;
