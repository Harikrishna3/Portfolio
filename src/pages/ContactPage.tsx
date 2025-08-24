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
 // Use refs to avoid stale closures and reduce re-renders
  const animationStateRef = useRef({
    commandIndex: 0,
    charIndex: 0,
    isTyping: true,
    isAnimating: true
  });
  
  const timerRef: any = useRef(null);

  // Memoized animation step function
  const animateTyping = useCallback(() => {
    // Stop animation if user is typing
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

  // Handle Commands
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
    <Box sx={{ minHeight: "100vh", position: "relative", overflow: "hidden", color: "white" }}>
      {/* World Map Background */}
      <Box sx={{ position: "absolute", filter: "drop-shadow(0 0 20px rgba(59, 130, 246, 0.3))" }}>
        <img src={BlackMap} alt="World Map" />
      </Box>

      {/* Main Content */}
      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          zIndex: 50,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        {/* Header */}
        <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, delay: 0.5 }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "2.5rem", md: "4rem" },
              fontWeight: 800,
              mb: 2,
              background: "linear-gradient(135deg, #facc15, #f59e0b)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: theme.palette.secondary.main,
              textShadow: "0 0 40px rgba(250, 204, 21, 0.3)",
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
        <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, delay: 0.7 }}>
          <Typography variant="h6" sx={{ color: alpha("#fff", 0.8), mb: 4, maxWidth: 600, fontSize: { xs: "1rem", md: "1.2rem" } }}>
            I'm open to opportunities, collaborations, and exciting projects. Let's connect!
          </Typography>
        </motion.div>

        {/* Buttons */}
        <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, delay: 0.9 }}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mb: 4 }}>
            {[
              {
                label: "Email",
                icon: <Email />,
                variant: "contained",
                href: "mailto:harikrishnabbomen@gmail.com",
                sx: {
                  background: "#3b82f6",
                  "&:hover": { background: "#2563eb", transform: "translateY(-2px)", boxShadow: "0 10px 25px rgba(59, 130, 246, 0.4)" },
                },
              },
              {
                label: "LinkedIn",
                icon: <LinkedIn />,
                variant: "outlined",
                href: "https://www.linkedin.com/in/harikrishnabomen/",
                sx: {
                  borderColor: "#facc15",
                  color: "#facc15",
                  "&:hover": { background: "#facc15", color: "#0f172a", transform: "translateY(-2px)", boxShadow: "0 10px 25px rgba(250, 204, 21, 0.4)" },
                },
              },
              {
                label: "GitHub",
                icon: <GitHub />,
                variant: "outlined",
                href: "https://github.com/Harikrishna3",
                sx: {
                  borderColor: "#facc15",
                  color: "#facc15",
                  "&:hover": { background: "#facc15", color: "#0f172a", transform: "translateY(-2px)", boxShadow: "0 10px 25px rgba(250, 204, 21, 0.4)" },
                },
              },
            ].map((btn) => (
              <Button
                key={btn.label}
                variant={btn.variant as any}
                startIcon={btn.icon}
                href={btn.href}
                target="_blank"
                sx={{ px: 4, py: 1.5, borderRadius: "25px", fontWeight: 600, transition: "all 0.3s ease", ...btn.sx }}
              >
                {btn.label}
              </Button>
            ))}
          </Stack>
        </motion.div>

        {/* Command Input */}
        <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, delay: 1.1 }}>
          <Box sx={{ background: alpha("#0f172a", 0.9), border: "2px solid #334155", borderRadius: 3, p: 3, width: { xs: "90vw", sm: "400px" }, maxWidth: "400px", backdropFilter: "blur(10px)" }}>
            <Typography variant="body2" sx={{ color: "#facc15", mb: 1, fontFamily: '"Courier New", monospace' }}>
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
                  "& .MuiFilledInput-underline:before": { display: "none" },
                  "& .MuiFilledInput-underline:after": { display: "none" },
                },
              }}
              inputProps={{ style: { color: "white", fontFamily: '"Courier New", monospace' } }}
            />
          </Box>
        </motion.div>
      </Container>

      {/* Popup Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        PaperProps={{
          sx: { background: "linear-gradient(135deg, #0f172a, #1e293b)", color: "#FFFFFF", borderRadius: 3, p: 2, minWidth: { xs: "80vw", sm: "400px" } },
        }}
      >
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h6">Command Error</Typography>
          <IconButton onClick={() => setOpenDialog(false)} sx={{ color: "#facc15" }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ fontFamily: '"Courier New", monospace', fontSize: "1rem" }}>{dialogContent}</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenDialog(false)}
            sx={{ background: "#facc15", color: "#0f172a", fontWeight: 600, "&:hover": { background: "#f59e0b" } }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ContactPage;
