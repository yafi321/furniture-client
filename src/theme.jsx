// src/theme/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({

  typography: {
    fontFamily: "'Heebo', sans-serif", // גופן שנבחר
  },
  palette: {
    primary: {
      main: "#264653", // צבע כחול עמוק
    },
    secondary: {
      main: "#B76E79", // צבע ורוד מעודן
    },
    background: {
      default: "#F8F9FA", // רקע בהיר ונקי
      paper: "#FFFFFF", // צבע נייר לבן
    },
    text: {
      primary: "#343A40", // טקסט כהה
      secondary: "#6C757D", // טקסט משני אפור בהיר
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none", // ביטול אותיות גדולות בכפתורים
          backgroundColor: "#264653", // רקע כחול לכפתורים
          color: "#FFFFFF", // טקסט בכפתורים בצבע לבן
          '&:hover': {
            backgroundColor: "#223F4A", // גוון כהה יותר בכפתור בעת ריחוף
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#264653", // צבע רקע לאפליקציה (כחול עמוק)
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h1: {
          fontWeight: 700, // כותרת גדולה (H1) תהיה מודגשת יותר
        },
        h2: {
          fontWeight: 600, // כותרת H2 עם עיצוב מעט פחות מודגש
        },
      },
    },
  },
});

export default theme;
