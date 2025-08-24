import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "'Inter', 'Roboto', sans-serif",
    h1: { fontFamily: "'Poppins', sans-serif", fontWeight: 700 },
    h2: { fontFamily: "'Poppins', sans-serif", fontWeight: 700 },
    h3: { fontFamily: "'Poppins', sans-serif", fontWeight: 700 },
    body1: { fontFamily: "'Inter', 'Roboto', sans-serif" },
    body2: { fontFamily: "'Inter', 'Roboto', sans-serif" },
  },
  palette: {
    primary: { main: "#1E3A8A" },      // deep blue
    secondary: { main: "#FACC15" },    // Krishna yellow
    info: { main: "#38BDF8" },         // sky blue
    background: {
      default: "#0F172A",              // dark mode bg
      paper: "#1E293B",                // card background
    },
    text: {
      primary: "#FFFFFF",              // text on dark
      secondary: "#E2E8F0",            // softer text
    },
  },
  shape: {
    borderRadius: 20, // rounded corners globally
  },
});

export default theme;
