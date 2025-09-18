import { useState, useEffect, useRef, useCallback } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Container,
  Stack,
  useTheme,
  alpha,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import BookIcon from '@mui/icons-material/Book';
import { Email, LinkedIn, GitHub } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import { motion } from "framer-motion";
import BlackMap from "../assets/BlankMap_World_simple.svg";

const commandsList = ["hire harikrishna", "linkedin", "github"];

const ContactPage = () => {
  const theme = useTheme();

  // States
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState("");
  
  const [command, setCommand] = useState("");
  const [placeholder, setPlaceholder] = useState("");
  

  const animationStateRef = useRef({
    commandIndex: 0,
    charIndex: 0,
    isTyping: true,
    isAnimating: true
  });
  
  const timerRef : any = useRef(null);


  const animateTyping = useCallback(() => {
    if (command.length > 0) {
      animationStateRef.current.isAnimating = false;
      return;
    }

    if (!animationStateRef.current.isAnimating) {
      animationStateRef.current.isAnimating = true;
    }

    const state = animationStateRef.current;
    const currentCommand = commandsList[state.commandIndex];
    
    if (state.isTyping) {
      // Typing forward
      state.charIndex++;
      setPlaceholder(currentCommand.substring(0, state.charIndex));
      
      if (state.charIndex >= currentCommand.length) {
        state.isTyping = false;
        // Pause before starting to delete
        timerRef.current = setTimeout(animateTyping, 1500);
        return;
      }
    } else {
      // Typing backward (deleting)
      state.charIndex--;
      setPlaceholder(currentCommand.substring(0, state.charIndex));
      
      if (state.charIndex <= 0) {
        state.isTyping = true;
        state.commandIndex = (state.commandIndex + 1) % commandsList.length;
        // Pause before starting next command
        timerRef.current = setTimeout(animateTyping, 500);
        return;
      }
    }
    
    // Continue animation with appropriate timing
    const delay = state.isTyping ? 
      Math.random() * 100 + 50 : // Variable typing speed (50-150ms)
      Math.random() * 50 + 25;   // Faster deleting speed (25-75ms)
    
    timerRef.current = setTimeout(animateTyping, delay);
  }, [command.length]);

  // Initialize and cleanup animation
  useEffect(() => {
    // Start animation
    animateTyping();
    
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [animateTyping]);

  // Reset animation when command is cleared
  useEffect(() => {
    if (command.length === 0 && !animationStateRef.current.isAnimating) {
      animationStateRef.current.isAnimating = true;
      animateTyping();
    }
  }, [command.length, animateTyping]);

  const handleCommand = (e: React.KeyboardEvent) => {
    if (e.key !== "Enter") return;

    const cmd = command.toLowerCase().trim();
    switch (cmd) {
      case "hire harikrishna":
      case "hire":
        window.location.href = "mailto:harikrishnabbomen@gmail.com";
        break;
      case "linkedin":
        window.open("https://www.linkedin.com/in/harikrishnabomen/", "_blank");
        break;
      case "github":
      case "git":
        window.open("https://github.com/Harikrishna3", "_blank");
        break;
      case "clear":
        setCommand("");
        return;
      default:
        setDialogContent(
          `Unknown command: "${cmd}". Try: hire harikrishna, linkedin, github, or clear`
        );
        setOpenDialog(true);
    }
    setCommand("");
  };

  return (
    <Box 
      sx={{ 
        minHeight: "100vh", 
        position: "relative", 
        overflow: "hidden", 
        color: "white",
        width: "100%",
        display: "flex",
        flexDirection: "column"
      }}
    >
      {/* World Map Background */}
      <Box 
        sx={{ 
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          filter: "drop-shadow(0 0 20px rgba(59, 130, 246, 0.3))",
          zIndex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          "& img": {
            width: "100%",
            height: "100%",
            objectFit: "cover",
            // opacity: { 
            //   xs: 0.25,        
            //   sm: 0.3,         
            //   md: 0.35,        
            //   lg: 0.4,         
            //   xl: 0.45         
            // }, 
          }
        }}
      >
        <img src={BlackMap} alt="World Map" />
      </Box>

      {/* Main Content */}
      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          zIndex: 50,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          px: { 
            xs: 1.5,         
            sm: 2,           
            md: 2.5,         
            lg: 3,           
            xl: 4            
          }, 
          py: { 
            xs: 3,           
            sm: 4,           
            md: 5,           
            lg: 6,           
            xl: 8            
          }, 
        }}
      >
        {/* Header */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ duration: 1, delay: 0.5 }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { 
                xs: "1.75rem",   
                sm: "2.25rem",   
                md: "3.25rem",   
                lg: "4rem",      
                xl: "4.75rem"    
              },
              fontWeight: 800,
              mb: { xs: 1, sm: 1.5, md: 2 },
              background: "linear-gradient(135deg, #facc15, #f59e0b)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: theme.palette.secondary.main,
              textShadow: "0 0 40px rgba(250, 204, 21, 0.3)",
              lineHeight: { xs: 1.2, sm: 1.15, md: 1.1, lg: 1.05, xl: 1 },
              // Better text wrapping on small screens
              wordBreak: "break-word",
              hyphens: "auto",
            }}
          >
            Let's Build Together{" "}
            <motion.span
              animate={{ y: [-10, 0, -10] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              style={{ display: "inline-block" }}
            >
              🚀
            </motion.span>
          </Typography>
        </motion.div>

        {/* Subheader */}
        <motion.div 
          initial={{ y: 30, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ duration: 1, delay: 0.7 }}
        >
          <Typography 
            variant="h6" 
            sx={{ 
              color: alpha("#fff", 0.8), 
              mb: { xs: 2.5, sm: 3, md: 3.5, lg: 4, xl: 4.5 }, 
              maxWidth: { xs: "100%", sm: 500, md: 600, lg: 700, xl: 800 }, 
              fontSize: { 
                xs: "0.875rem",  
                sm: "1rem",      
                md: "1.125rem",  
                lg: "1.25rem",   
                xl: "1.375rem"   
              },
              px: { xs: 1, sm: 2, md: 0 },
              lineHeight: { xs: 1.4, sm: 1.45, md: 1.5, lg: 1.55, xl: 1.6 },
            }}
          >
            I'm open to opportunities, collaborations, and exciting projects. Let's connect!
          </Typography>
        </motion.div>

        {/* Buttons */}
        <motion.div 
          initial={{ y: 30, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ duration: 1, delay: 0.9 }}
        >
          <Stack 
            direction={{ xs: "column", sm: "column", md: "row" }} 
            spacing={{ xs: 1.5, sm: 2, md: 2.5, lg: 3, xl: 3.5 }} 
            sx={{ 
              mb: { xs: 2.5, sm: 3, md: 3.5, lg: 4, xl: 4.5 },
              width: "100%",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            {[
              {
                label: "Email",
                icon: <Email />,
                variant: "contained" as "contained",
                href: "mailto:harikrishnabbomen@gmail.com",
                sx: {
                  background: "#3b82f6",
                  "&:hover": { 
                    background: "#2563eb", 
                    transform: "translateY(-2px)", 
                    boxShadow: "0 10px 25px rgba(59, 130, 246, 0.4)" 
                  },
                },
              },
              {
                label: "LinkedIn",
                icon: <LinkedIn />,
                variant: "outlined" as "outlined",
                href: "https://www.linkedin.com/in/harikrishnabomen/",
                sx: {
                  borderColor: "#facc15",
                  color: "#facc15",
                  "&:hover": { 
                    background: "#facc15", 
                    color: "#0f172a", 
                    transform: "translateY(-2px)", 
                    boxShadow: "0 10px 25px rgba(250, 204, 21, 0.4)" 
                  },
                },
              },
              {
                label: "GitHub",
                icon: <GitHub />,
                variant: "outlined" as "outlined",
                href: "https://github.com/Harikrishna3",
                sx: {
                  borderColor: "#facc15",
                  color: "#facc15",
                  "&:hover": { 
                    background: "#facc15", 
                    color: "#0f172a", 
                    transform: "translateY(-2px)", 
                    boxShadow: "0 10px 25px rgba(250, 204, 21, 0.4)" 
                  },
                },
              },
              {
                label: "Medium",
                icon: <BookIcon />,
                variant: "outlined" as "outlined",
                href: "https://medium.com/@harikrishnabbomen",
                sx: {
                  borderColor: "#facc15",
                  color: "#facc15",
                  "&:hover": { 
                    background: "#facc15", 
                    color: "#0f172a", 
                    transform: "translateY(-2px)", 
                    boxShadow: "0 10px 25px rgba(250, 204, 21, 0.4)" 
                  },
                },
              },
            ].map((btn) => (
              <Button
                key={btn.label}
                variant={btn.variant}
                startIcon={btn.icon}
                href={btn.href}
                target="_blank"
                sx={{ 
                  px: { xs: 2.5, sm: 3, md: 3.5, lg: 4, xl: 4.5 }, 
                  py: { xs: 1, sm: 1.2, md: 1.4, lg: 1.5, xl: 1.6 }, 
                  borderRadius: "25px", 
                  fontWeight: 600, 
                  transition: "all 0.3s ease",
                  fontSize: { 
                    xs: "0.8rem",    
                    sm: "0.85rem",   
                    md: "0.9rem",    
                    lg: "0.95rem",   
                    xl: "1rem"       
                  },
                  minWidth: { 
                    xs: "120px",     
                    sm: "140px",     
                    md: "auto",      
                    lg: "auto",      
                    xl: "auto"       
                  }, 
                  width: { 
                    xs: "100%",      
                    sm: "100%",      
                    md: "auto",      
                    lg: "auto",      
                    xl: "auto"       
                  }, 
                  maxWidth: { 
                    xs: "180px",     
                    sm: "200px",     
                    md: "none",      
                    lg: "none",      
                    xl: "none"       
                  }, 
                  ...btn.sx 
                }}
              >
                {btn.label}
              </Button>
            ))}
          </Stack>
        </motion.div>

        {/* Command Input */}
        <motion.div 
          initial={{ y: 30, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ duration: 1, delay: 1.1 }}
        >
          <Box 
            sx={{ 
              background: alpha("#0f172a", 0.9), 
              border: "2px solid #334155", 
              borderRadius: 3, 
              p: { 
                xs: 1.5,         
                sm: 2,           
                md: 2.5,         
                lg: 3,           
                xl: 3.5          
              }, 
              width: { 
                xs: "95vw",      
                sm: "85vw",      
                md: "70vw",      
                lg: "400px",     
                xl: "450px"      
              }, 
              maxWidth: { 
                xs: "300px",     
                sm: "350px",     
                md: "400px",     
                lg: "400px",     
                xl: "450px"      
              }, 
              backdropFilter: "blur(10px)",
              mx: "auto"
            }}
          >
            <Typography 
              variant="body2" 
              sx={{ 
                color: "#facc15", 
                mb: 1, 
                fontFamily: '"Courier New", monospace',
                fontSize: { 
                  xs: "0.7rem",    
                  sm: "0.75rem",   
                  md: "0.8rem",    
                  lg: "0.875rem",  
                  xl: "0.9rem"     
                }
              }}
            >
              $ Type command here:
            </Typography>
            <TextField
              fullWidth
              variant="filled"
              placeholder={placeholder}
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              onKeyDown={handleCommand}
              InputProps={{
                sx: {
                  background: "#1e293b",
                  color: "white",
                  fontFamily: '"Courier New", monospace',
                  fontSize: { 
                    xs: "0.8rem",    
                    sm: "0.85rem",   
                    md: "0.9rem",    
                    lg: "0.95rem",   
                    xl: "1rem"       
                  },
                  "& .MuiFilledInput-underline:before": { display: "none" },
                  "& .MuiFilledInput-underline:after": { display: "none" },
                },
              }}
              inputProps={{ 
                style: { 
                  color: "white", 
                  fontFamily: '"Courier New", monospace',
                  fontSize: "inherit"
                } 
              }}
            />
          </Box>
        </motion.div>
      </Container>

      {/* Popup Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        PaperProps={{
          sx: { 
            background: "linear-gradient(135deg, #0f172a, #1e293b)", 
            color: "#FFFFFF", 
            borderRadius: 3, 
            p: { 
              xs: 1.5,         
              sm: 2,           
              md: 2.5,         
              lg: 2.5,         
              xl: 3            
            }, 
            minWidth: { 
              xs: "85vw",      
              sm: "75vw",      
              md: "400px",     
              lg: "450px",     
              xl: "500px"      
            },
            maxWidth: { 
              xs: "90vw",      
              sm: "80vw",      
              md: "500px",     
              lg: "600px",     
              xl: "700px"      
            },
            mx: { xs: 2, sm: 2, md: 0 },
          },
        }}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle 
          sx={{ 
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "center",
            pb: 1,
            fontSize: { 
              xs: "1rem",      
              sm: "1.1rem",    
              md: "1.2rem",    
              lg: "1.25rem",   
              xl: "1.3rem"     
            }
          }}
        >
          <Typography variant="h6" sx={{ fontSize: "inherit" }}>
            Command Error
          </Typography>
          <IconButton 
            onClick={() => setOpenDialog(false)} 
            sx={{ 
              color: "#facc15",
              p: { 
                xs: 0.5,         
                sm: 0.75,        
                md: 1,           
                lg: 1,           
                xl: 1.2          
              }
            }}
          >
            <CloseIcon 
              fontSize={
                window.innerWidth < 600 ? "small" :
                window.innerWidth < 900 ? "medium" :
                window.innerWidth < 1200 ? "medium" :
                window.innerWidth < 1536 ? "medium" : "large"
              } 
            />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ pt: 1 }}>
          <Typography 
            sx={{ 
              fontFamily: '"Courier New", monospace', 
              fontSize: { 
                xs: "0.8rem",    
                sm: "0.85rem",   
                md: "0.9rem",    
                lg: "0.95rem",   
                xl: "1rem"       
              },
              lineHeight: { 
                xs: 1.4,         
                sm: 1.45,        
                md: 1.5,         
                lg: 1.5,         
                xl: 1.55         
              },
              wordBreak: "break-word"
            }}
          >
            {dialogContent}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ pt: 2 }}>
          <Button
            onClick={() => setOpenDialog(false)}
            sx={{ 
              background: "#facc15", 
              color: "#0f172a", 
              fontWeight: 600, 
              px: { 
                xs: 2,           
                sm: 2.5,         
                md: 3,           
                lg: 3,           
                xl: 3.5          
              },
              py: { 
                xs: 0.75,        
                sm: 0.85,        
                md: 1,           
                lg: 1,           
                xl: 1.1          
              },
              fontSize: { 
                xs: "0.8rem",    
                sm: "0.85rem",   
                md: "0.9rem",    
                lg: "0.95rem",   
                xl: "1rem"       
              },
              "&:hover": { background: "#f59e0b" } 
            }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ContactPage;