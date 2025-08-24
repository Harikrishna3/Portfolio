import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  ListItemButton
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Experience", path: "/experience" },
  { label: "Projects", path: "/projects" },
  { label: "Contact", path: "/contact" },
  // { label: "Code Dharma", path: "/code-dharma" }
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const handleNavigation = (path: string) => {
    navigate(path);
    setMobileOpen(false); // Close mobile drawer after navigation
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const drawer = (
    <Box
      sx={{
        textAlign: "center",
        backgroundColor: theme.palette.background.default,
        height: "100%",
        color: theme.palette.text.primary,
      }}
    >
      <Typography 
        variant="h6" 
        sx={{ 
          my: 3, 
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 700,
          color: theme.palette.text.primary,
          cursor: "pointer"
        }}
        onClick={() => handleNavigation("/")}
      >
        HK
      </Typography>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              onClick={() => handleNavigation(item.path)}
              sx={{
                "&:hover": {
                  backgroundColor: "#FACC15",
                },
                backgroundColor: isActive(item.path) ? "rgba(250, 204, 21, 0.1)" : "transparent"
              }}
            >
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{ 
                  fontFamily: "'Inter', sans-serif", 
                  fontWeight: 500,
                  color: isActive(item.path) ? "#FACC15" : theme.palette.text.primary,
                  fontSize: "1rem"
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar
      component="nav"
      elevation={0}
      sx={{ 
        backgroundColor: "transparent",
        backdropFilter: "blur(3px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000
      }}
    >
      <Toolbar sx={{ 
        minHeight: { xs: 64, md: 80 },
        width: "100%",
        margin: "0 auto",
        px: { xs: 2, md: 3 }
      }}>
        <Typography
          variant="h6"
          onClick={() => handleNavigation("/")}
          sx={{
            flexGrow: 1,
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 700,
            color: theme.palette.text.primary,
            fontSize: { xs: "1.3rem", md: "1.5rem" },
            letterSpacing: "0.5px",
            cursor: "pointer",
            "&:hover": {
              color: "#FACC15"
            }
          }}
        >
          HK
        </Typography>

        {/* Desktop Menu */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
          {navItems.map((item) => (
            <Button
              key={item.label}
              onClick={() => handleNavigation(item.path)}
              sx={{
                color: isActive(item.path) ? "#FACC15" : theme.palette.text.secondary,
                textTransform: "none",
                fontSize: "1rem",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                px: 2,
                py: 1,
                borderRadius: "8px",
                transition: "all 0.3s ease",
                position: "relative",
                "&:hover": { 
                  color: "black",
                  backgroundColor: "#FACC15",
                  transform: "translateY(-1px)"
                },
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: 0,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: isActive(item.path) ? "80%" : "0%",
                  height: "2px",
                  backgroundColor: "#FACC15",
                  transition: "width 0.3s ease"
                }
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>

        {/* Mobile Menu Icon */}
        <IconButton
          color="inherit"
          edge="end"
          sx={{ 
            display: { md: "none" }, 
            color: theme.palette.text.primary,
            "&:hover": {
              backgroundColor: "rgba(250, 204, 21, 0.1)",
            }
          }}
          onClick={handleDrawerToggle}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 280,
            backgroundColor: theme.palette.background.default,
            borderLeft: "1px solid rgba(255, 255, 255, 0.1)",
          },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
}