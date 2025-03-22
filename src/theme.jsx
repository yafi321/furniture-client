// src/theme/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily:"'Heebo', sans-serif",
  },
  palette: {
    primary: {
      main: "#1976d2", // צבע כחול MUI
    },
    secondary: {
      main: "#ff4081", // ורוד
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none", // ביטול אותיות גדולות בכפתורים
        },
      },
    },
  },
});

export default theme;
