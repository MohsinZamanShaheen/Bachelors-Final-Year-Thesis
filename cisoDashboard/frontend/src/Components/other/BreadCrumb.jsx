import * as React from "react";
import { emphasize, styled } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import { Link as RouterLink } from 'react-router-dom';

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const colors = tokens(theme.palette.mode);
  const backgroundColor =
    theme.palette.mode === "dark"
      ? colors.sameColors[100]
      : colors.elementBorders[200];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: colors.textColor[100],
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
});


export default function BreadcrumbComp({ items }) {
  const theme = useTheme();
  return (
    <Breadcrumbs aria-label="breadcrumb">
    {items.map((item, index) => (
        <StyledBreadcrumb
        key={index}
        component={item.href ? RouterLink : "div"}
        to={item.href || "#"}
        label={item.label}
        icon={item.icon ? <item.icon fontSize="small" /> : null}
        onClick={item.onClick || (() => {})} // Default to noop function if onClick isn't provided
        />
    ))}
    </Breadcrumbs>
  );
}
