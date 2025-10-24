import { createTheme, ThemeOptions } from "@mui/material/styles";
import { Plus_Jakarta_Sans } from "next/font/google";

export const plus = Plus_Jakarta_Sans({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

const getBaseThemeOptions = (mode: 'light' | 'dark' = 'light'): ThemeOptions => ({
  typography: {
    fontFamily: plus.style.fontFamily,
    h1: {
      fontWeight: 600,
      fontSize: "2.25rem",
      lineHeight: "2.75rem",
      fontFamily: plus.style.fontFamily,
    },
    h2: {
      fontWeight: 600,
      fontSize: "1.875rem",
      lineHeight: "2.25rem",
      fontFamily: plus.style.fontFamily,
    },
    h3: {
      fontWeight: 600,
      fontSize: "1.5rem",
      lineHeight: "1.75rem",
      fontFamily: plus.style.fontFamily,
    },
    h4: {
      fontWeight: 600,
      fontSize: "1.3125rem",
      lineHeight: "1.6rem",
    },
    h5: {
      fontWeight: 600,
      fontSize: "1.125rem",
      lineHeight: "1.6rem",
    },
    h6: {
      fontWeight: 600,
      fontSize: "1rem",
      lineHeight: "1.2rem",
    },
    button: {
      textTransform: "capitalize" as const,
      fontWeight: 400,
    },
    body1: {
      fontSize: "0.875rem",
      fontWeight: 400,
      lineHeight: "1.334rem",
    },
    body2: {
      fontSize: "0.75rem",
      letterSpacing: "0rem",
      fontWeight: 400,
      lineHeight: "1rem",
    },
    subtitle1: {
      fontSize: "0.875rem",
      fontWeight: 400,
    },
    subtitle2: {
      fontSize: "0.875rem",
      fontWeight: 400,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ".MuiPaper-elevation9, .MuiPopover-root .MuiPaper-elevation": {
          boxShadow:
            mode === 'dark'
              ? "rgb(0 0 0 / 50%) 0px 0px 2px 0px, rgb(0 0 0 / 30%) 0px 12px 24px -4px !important"
              : "rgb(145 158 171 / 30%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px !important",
        },
        body: {
          scrollbarColor: mode === 'dark' ? '#404040 #2A2A2A' : '#C1C1C1 #F5F5F5',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "7px",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
});

const baselightTheme = createTheme({
  direction: "ltr",
  palette: {
    mode: "light",
    primary: {
      main: "#5D87FF",
      light: "#ECF2FF",
      dark: "#4570EA",
    },
    secondary: {
      main: "#49BEFF",
      light: "#E8F7FF",
      dark: "#23afdb",
    },
    success: {
      main: "#13DEB9",
      light: "#E6FFFA",
      dark: "#02b3a9",
      contrastText: "#ffffff",
    },
    info: {
      main: "#539BFF",
      light: "#EBF3FE",
      dark: "#1682d4",
      contrastText: "#ffffff",
    },
    error: {
      main: "#FA896B",
      light: "#FDEDE8",
      dark: "#f3704d",
      contrastText: "#ffffff",
    },
    warning: {
      main: "#FFAE1F",
      light: "#FEF5E5",
      dark: "#ae8e59",
      contrastText: "#ffffff",
    },
    grey: {
      100: "#F2F6FA",
      200: "#EAEFF4",
      300: "#DFE5EF",
      400: "#7C8FAC",
      500: "#5A6A85",
      600: "#2A3547",
    },
    text: {
      primary: "#2A3547",
      secondary: "#5A6A85",
    },
    action: {
      disabledBackground: "rgba(73,82,88,0.12)",
      hoverOpacity: 0.02,
      hover: "#f6f9fc",
    },
    divider: "#e5eaef",
    background: {
      default: "#F5F7FA",
      paper: "#ffffff",
    },
  },
  ...getBaseThemeOptions('light'),
});

const darkTheme = createTheme({
  direction: "ltr",
  palette: {
    mode: "dark",
    primary: {
      main: "#5D87FF",
      light: "#7C9EFF",
      dark: "#4570EA",
    },
    secondary: {
      main: "#49BEFF",
      light: "#6DCBFF",
      dark: "#23afdb",
    },
    success: {
      main: "#13DEB9",
      light: "#42E8C8",
      dark: "#02b3a9",
      contrastText: "#000000",
    },
    info: {
      main: "#539BFF",
      light: "#75AFFF",
      dark: "#1682d4",
      contrastText: "#000000",
    },
    error: {
      main: "#FA896B",
      light: "#FBA789",
      dark: "#f3704d",
      contrastText: "#000000",
    },
    warning: {
      main: "#FFAE1F",
      light: "#FFC04C",
      dark: "#ae8e59",
      contrastText: "#000000",
    },
    grey: {
      100: "#333333",
      200: "#404040",
      300: "#525252",
      400: "#999999",
      500: "#CCCCCC",
      600: "#E0E0E0",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#B0B0B0",
    },
    action: {
      disabledBackground: "rgba(255,255,255,0.12)",
      hoverOpacity: 0.08,
      hover: "#2C2C2C",
    },
    divider: "#404040",
    background: {
      default: "#1C1C1C",
      paper: "#2A2A2A",
    },
  },
  ...getBaseThemeOptions('dark'),
});

const greenTheme = createTheme({
  direction: "ltr",
  palette: {
    mode: "light",
    primary: {
      main: "#4CAF50",
      light: "#81C784",
      dark: "#388E3C",
    },
    secondary: {
      main: "#8BC34A",
      light: "#AED581",
      dark: "#689F38",
    },
    success: {
      main: "#66BB6A",
      light: "#81C784",
      dark: "#388E3C",
      contrastText: "#ffffff",
    },
    info: {
      main: "#26A69A",
      light: "#4DB6AC",
      dark: "#00897B",
      contrastText: "#ffffff",
    },
    error: {
      main: "#EF5350",
      light: "#E57373",
      dark: "#C62828",
      contrastText: "#ffffff",
    },
    warning: {
      main: "#FFA726",
      light: "#FFB74D",
      dark: "#F57C00",
      contrastText: "#ffffff",
    },
    grey: {
      100: "#F1F8E9",
      200: "#DCEDC8",
      300: "#C5E1A5",
      400: "#7C8FAC",
      500: "#558B2F",
      600: "#33691E",
    },
    text: {
      primary: "#1B5E20",
      secondary: "#558B2F",
    },
    action: {
      disabledBackground: "rgba(73,82,88,0.12)",
      hoverOpacity: 0.02,
      hover: "#F1F8E9",
    },
    divider: "#C5E1A5",
    background: {
      default: "#F1F8E9",
      paper: "#ffffff",
    },
  },
  ...getBaseThemeOptions('light'),
});

const purpleTheme = createTheme({
  direction: "ltr",
  palette: {
    mode: "light",
    primary: {
      main: "#7C4DFF",
      light: "#B388FF",
      dark: "#651FFF",
    },
    secondary: {
      main: "#B388FF",
      light: "#D1C4E9",
      dark: "#7C4DFF",
    },
    success: {
      main: "#66BB6A",
      light: "#81C784",
      dark: "#388E3C",
      contrastText: "#ffffff",
    },
    info: {
      main: "#29B6F6",
      light: "#4FC3F7",
      dark: "#0288D1",
      contrastText: "#ffffff",
    },
    error: {
      main: "#EF5350",
      light: "#E57373",
      dark: "#C62828",
      contrastText: "#ffffff",
    },
    warning: {
      main: "#FFA726",
      light: "#FFB74D",
      dark: "#F57C00",
      contrastText: "#ffffff",
    },
    grey: {
      100: "#F3E5F5",
      200: "#E1BEE7",
      300: "#CE93D8",
      400: "#7C8FAC",
      500: "#6A1B9A",
      600: "#4A148C",
    },
    text: {
      primary: "#4A148C",
      secondary: "#6A1B9A",
    },
    action: {
      disabledBackground: "rgba(73,82,88,0.12)",
      hoverOpacity: 0.02,
      hover: "#F3E5F5",
    },
    divider: "#CE93D8",
    background: {
      default: "#F3E5F5",
      paper: "#ffffff",
    },
  },
  ...getBaseThemeOptions('light'),
});

const orangeTheme = createTheme({
  direction: "ltr",
  palette: {
    mode: "light",
    primary: {
      main: "#FF6F00",
      light: "#FFA726",
      dark: "#E65100",
    },
    secondary: {
      main: "#FFB74D",
      light: "#FFCC80",
      dark: "#F57C00",
    },
    success: {
      main: "#66BB6A",
      light: "#81C784",
      dark: "#388E3C",
      contrastText: "#ffffff",
    },
    info: {
      main: "#29B6F6",
      light: "#4FC3F7",
      dark: "#0288D1",
      contrastText: "#ffffff",
    },
    error: {
      main: "#EF5350",
      light: "#E57373",
      dark: "#C62828",
      contrastText: "#ffffff",
    },
    warning: {
      main: "#FFA726",
      light: "#FFB74D",
      dark: "#F57C00",
      contrastText: "#ffffff",
    },
    grey: {
      100: "#FFF3E0",
      200: "#FFE0B2",
      300: "#FFCC80",
      400: "#7C8FAC",
      500: "#E65100",
      600: "#BF360C",
    },
    text: {
      primary: "#BF360C",
      secondary: "#E65100",
    },
    action: {
      disabledBackground: "rgba(73,82,88,0.12)",
      hoverOpacity: 0.02,
      hover: "#FFF3E0",
    },
    divider: "#FFCC80",
    background: {
      default: "#FFF3E0",
      paper: "#ffffff",
    },
  },
  ...getBaseThemeOptions('light'),
});

const tealTheme = createTheme({
  direction: "ltr",
  palette: {
    mode: "light",
    primary: {
      main: "#00897B",
      light: "#4DB6AC",
      dark: "#00695C",
    },
    secondary: {
      main: "#4DB6AC",
      light: "#80CBC4",
      dark: "#00897B",
    },
    success: {
      main: "#66BB6A",
      light: "#81C784",
      dark: "#388E3C",
      contrastText: "#ffffff",
    },
    info: {
      main: "#29B6F6",
      light: "#4FC3F7",
      dark: "#0288D1",
      contrastText: "#ffffff",
    },
    error: {
      main: "#EF5350",
      light: "#E57373",
      dark: "#C62828",
      contrastText: "#ffffff",
    },
    warning: {
      main: "#FFA726",
      light: "#FFB74D",
      dark: "#F57C00",
      contrastText: "#ffffff",
    },
    grey: {
      100: "#E0F2F1",
      200: "#B2DFDB",
      300: "#80CBC4",
      400: "#7C8FAC",
      500: "#00695C",
      600: "#004D40",
    },
    text: {
      primary: "#004D40",
      secondary: "#00695C",
    },
    action: {
      disabledBackground: "rgba(73,82,88,0.12)",
      hoverOpacity: 0.02,
      hover: "#E0F2F1",
    },
    divider: "#80CBC4",
    background: {
      default: "#E0F2F1",
      paper: "#ffffff",
    },
  },
  ...getBaseThemeOptions('light'),
});

export const themes = {
  default: baselightTheme,
  dark: darkTheme,
  green: greenTheme,
  purple: purpleTheme,
  orange: orangeTheme,
  teal: tealTheme,
};

export { baselightTheme };
