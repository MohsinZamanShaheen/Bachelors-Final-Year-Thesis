import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";
import { light } from "@mui/material/styles/createPalette";

// color design tokens export
export const tokens = (mode) => ({
  ...(mode === "dark"
    ? {
      primary:{
        100: "#24303F" // Blue Dark
      },
      secondary:{
        100: "#1a3c66" // Nile Blue
      },
      textColor:{
        100: "#ffffff", // white
        200: "#a9b2bb", // light grey
        300: "#000000", // green
        400: "#50C878" // green
      },
      buttonColor:{
        100: "#3c50e0", //  light blue
        200: "#ff4b2b" // orange
      },
      elementBorders: {
        100: "#a9b2bb", // light grey
        200: "#d3d3d3"
      },
      sameColors:{
        100: "#24303F",
        200: "#ffffff"
      },
      others:{
        100: "#de3e3e", // red shade
        200: "#6d5ee0", // purple
        300: "#6ddbd7", // cian
        400: "#ffffff", // white
        500: "#89CFF0", // light blue
        600: "#000000", // black
        700: "#50C878", // green
        800: "#ff4b2b" // orange
      }
    } : {
      primary:{
        100: "#ffffff"
      },
      secondary:{
        100: "#24303F"
      },
      textColor:{
        100: "#000000", // black
        200: "#a9b2bb", // light grey
        300: "#ffffff", // white
        400: "#50C878" // green
      },
      buttonColor:{
        100: "#3c50e0", //  light blue
        200: "#ff4b2b" // orange
      },
      elementBorders: {
        100: "#a9b2bb", // light grey
        200: "#d3d3d3"
      },
      sameColors:{
        100: "#24303F",
        200: "#ffffff"
      },
      others:{
        100: "#de3e3e", // red shade
        200: "#6d5ee0", // purple
        300: "#6ddbd7", // cian
        400: "#ffffff", // white
        500: "#89CFF0", // light blue
        600: "#000000", // black
        700: "#50C878", // green
        800: "#ff4b2b" // orange
      }
  }),
});

// mui theme settings
export const themeSettings = (mode) => {
  const colors = tokens(mode);
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            // primary: {
            //   main: "#24303F",
            //   contrastText: colors.textColor[100][100],
            // },
            // secondary: {
            //   main: "#1a3c66",
            //   contrastText: colors.textColor[100]
            // },
            background: {
              default: "#1a222c",
            },
          }
        : {
            // palette values for light mode
            // primary: {
            //   main: colors.textColor[100][100],
            //   contrastText: colors.textColor[100][1100],
            // },
            // secondary: {
            //   main: colors.textColor[100]
            //   contrastText: colors.textColor[100]
            // },
            background: {
              default: "#f1f5f9",
            },
          }),
    },
    typography: {
      fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};

// context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState("dark");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return [theme, colorMode];
};
