import { createTheme } from "@mui/material/styles";

export const muiTheme = createTheme({
  shape: {
    borderRadius: 8,
  },
  palette: {
    type: "light",
    primary: {
      main: "#4943da",
    },
    secondary: {
      main: "#55efc4",
    },
    text: {
      secondary: "#4d596a",
      disabled: "#8b8b8b",
    },
  },
  typography: {
    fontFamily: "Lexend",
    button: {
      textTransform: "none",
    },
  },
});
