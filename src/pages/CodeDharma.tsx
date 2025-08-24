// import { useState } from "react";
// import {
//     Box,
//     Typography,
//     Grid,
//     Paper,
//     Chip,
//     Avatar,
//     LinearProgress,
//     Tooltip as MuiTooltip,
// } from "@mui/material";
// import {
//     Star,
//     Activity,
//     Code,
//     Heart,
//     Zap,
//     BookOpen,
//     Target,
//     TrendingUp,
//     Coffee,
//     Compass,
// } from "lucide-react";

// // Dummy chart components (replace with MUI chart libs or your own)
// const RadarChartPlaceholder = () => (
//     <Box
//         sx={{
//             height: 300,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             bgcolor: "background.paper",
//             borderRadius: 3,
//             border: 1,
//             borderColor: "divider",
//         }}
//     >
//         <Typography color="text.secondary">Radar Chart (Effort vs Detachment)</Typography>
//     </Box>
// );

// const AreaChartPlaceholder = () => (
//     <Box
//         sx={{
//             height: 250,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             bgcolor: "background.paper",
//             borderRadius: 3,
//             border: 1,
//             borderColor: "divider",
//         }}
//     >
//         <Typography color="text.secondary">Area Chart (Weekly Mind-Code Balance)</Typography>
//     </Box>
// );

// const CodeDharmaPage = () => {
//     const [selectedPrinciple, setSelectedPrinciple] = useState(0);

//     const principles = [
//         {
//             title: "Code with Purpose (Dharma)",
//             description: "Write code that serves a greater good, solving real problems and making positive impact.",
//             icon: <Target color="#FACC15" size={24} />,
//             practice: "Before coding, ask: 'How does this serve others?'",
//             color: "warning.light",
//         },
//         {
//             title: "Detached Excellence (Karma Yoga)",
//             description: "Give your absolute best effort while remaining unattached to praise, blame, or results.",
//             icon: <Zap color="#38BDF8" size={24} />,
//             practice: "Focus on the quality of your work, not external validation.",
//             color: "info.light",
//         },
//         {
//             title: "Continuous Learning (Svadhyaya)",
//             description: "Embrace the beginner's mind. Every bug is a teacher, every challenge a growth opportunity.",
//             icon: <BookOpen color="#10B981" size={24} />,
//             practice: "Daily: Read, experiment, reflect on your coding journey.",
//             color: "success.light",
//         },
//         {
//             title: "Mindful Debugging (Dhyana)",
//             description: "Approach problems with patience and presence. The solution emerges from stillness.",
//             icon: <Compass color="#8B5CF6" size={24} />,
//             practice: "Take three deep breaths before tackling complex bugs.",
//             color: "secondary.light",
//         },
//     ];

//     const techStack = [
//         { name: "React", mastery: 90, philosophy: "Component harmony", color: "#10B981" },
//         { name: "Python", mastery: 85, philosophy: "Simplicity & readability", color: "#FACC15" },
//         { name: "Node.js", mastery: 80, philosophy: "Non-blocking flow", color: "#38BDF8" },
//         { name: "MongoDB", mastery: 75, philosophy: "Flexible persistence", color: "#8B5CF6" },
//         { name: "Docker", mastery: 70, philosophy: "Contained environments", color: "#F59E0B" },
//     ];

//     return (
//         <Box sx={{ minHeight: "100vh", bgcolor: "background.default", color: "text.primary", p: { xs: 2, md: 4 } }}>
//             {/* Header */}
//             <Box textAlign="center" mb={6}>
//                 <Typography
//                     variant="h2"
//                     fontWeight="bold"
//                     sx={{
//                         mb: 2,
//                         background: "linear-gradient(90deg, #FACC15, #38BDF8)",
//                         WebkitBackgroundClip: "text",
//                         WebkitTextFillColor: "transparent",
//                     }}
//                 >
//                     Code + Dharma 🙏
//                 </Typography>
//                 <Typography variant="h6" color="text.secondary" fontStyle="italic">
//                     Where Ancient Wisdom Meets Modern Development
//                 </Typography>
//             </Box>

//             <Grid container spacing={4} maxWidth="lg" mx="auto">
//                 {/* Quote and Radar Chart Row */}
//                 <Grid item xs={12} md={6}>
//                     <Paper elevation={3} sx={{ p: 3, borderRadius: 4 }}>
//                         <Box display="flex" alignItems="center" gap={1} mb={2}>
//                             <Star color="#FACC15" size={24} />
//                             <Typography variant="h5" fontWeight="bold">
//                                 Bhagavad Gita Wisdom
//                             </Typography>
//                         </Box>
//                         <Typography variant="h6" fontStyle="italic" color="warning.main" mb={2}>
//                             "Karmanye Vadhikaraste, Ma Phaleshou Kada Chana"
//                         </Typography>
//                         <Typography color="text.secondary">
//                             "You have the right to perform your prescribed duties, but you are not entitled to the fruits of your actions. Never consider yourself the cause of the results of your activities, nor be attached to inaction."
//                         </Typography>
//                     </Paper>
//                 </Grid>
//                 <Grid item xs={12} md={6}>
//                     <Paper elevation={3} sx={{ p: 3, borderRadius: 4, textAlign: "center" }}>
//                         <Box display="flex" alignItems="center" justifyContent="center" gap={1} mb={2}>
//                             <Activity color="#38BDF8" size={24} />
//                             <Typography variant="h6" fontWeight="bold">
//                                 Effort vs Detachment
//                             </Typography>
//                         </Box>
//                         <RadarChartPlaceholder />
//                     </Paper>
//                 </Grid>
//             </Grid>

//             {/* Dharma Principles */}
//             <Box textAlign="center" my={6}>
//                 <Typography variant="h4" fontWeight="bold" mb={4}>
//                     The Four Pillars of Developer Dharma
//                 </Typography>
//                 <Grid container spacing={3} justifyContent="center">
//                     {principles.map((principle, index) => (
//                         <Grid item xs={12} md={3} key={index}>
//                             <Paper
//                                 elevation={selectedPrinciple === index ? 8 : 3}
//                                 sx={{
//                                     p: 3,
//                                     borderRadius: 4,
//                                     cursor: "pointer",
//                                     transition: "transform 0.3s",
//                                     transform: selectedPrinciple === index ? "scale(1.05)" : "scale(1)",
//                                     bgcolor: selectedPrinciple === index ? principle.color : "background.paper",
//                                 }}
//                                 onClick={() => setSelectedPrinciple(index)}
//                             >
//                                 <Box display="flex" alignItems="center" gap={1} mb={2}>
//                                     {principle.icon}
//                                     <Typography variant="subtitle1" fontWeight="bold">
//                                         {principle.title}
//                                     </Typography>
//                                 </Box>
//                                 <Typography variant="body2" color="text.secondary" mb={2}>
//                                     {principle.description}
//                                 </Typography>
//                                 <Chip
//                                     label={principle.practice}
//                                     color="warning"
//                                     variant="outlined"
//                                     sx={{ bgcolor: "warning.light", color: "warning.dark", fontSize: 12 }}
//                                 />
//                             </Paper>
//                         </Grid>
//                     ))}
//                 </Grid>
//             </Box>

//             {/* Charts Row */}
//             <Grid container spacing={4} maxWidth="lg" mx="auto">
//                 {/* Weekly Progress */}
//                 <Grid item xs={12} md={6}>
//                     <Paper elevation={3} sx={{ p: 3, borderRadius: 4 }}>
//                         <Box display="flex" alignItems="center" gap={1} mb={2}>
//                             <TrendingUp color="#10B981" size={24} />
//                             <Typography variant="h6" fontWeight="bold">
//                                 Weekly Mind-Code Balance
//                             </Typography>
//                         </Box>
//                         <AreaChartPlaceholder />
//                     </Paper>
//                 </Grid>
//                 {/* Tech Stack */}
//                 <Grid item xs={12} md={6}>
//                     <Paper elevation={3} sx={{ p: 3, borderRadius: 4 }}>
//                         <Box display="flex" alignItems="center" gap={1} mb={2}>
//                             <Code color="#8B5CF6" size={24} />
//                             <Typography variant="h6" fontWeight="bold">
//                                 Mindful Tech Stack
//                             </Typography>
//                         </Box>
//                         {techStack.map((tech, index) => (
//                             <Box key={index} mb={3}>
//                                 <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
//                                     <Typography fontWeight="medium">{tech.name}</Typography>
//                                     <Typography variant="caption" color="text.secondary" fontStyle="italic">
//                                         {tech.philosophy}
//                                     </Typography>
//                                 </Box>
//                                 <MuiTooltip title={`${tech.mastery}%`} arrow>
//                                     <LinearProgress
//                                         variant="determinate"
//                                         value={tech.mastery}
//                                         sx={{
//                                             height: 8,
//                                             borderRadius: 5,
//                                             bgcolor: "grey.900",
//                                             "& .MuiLinearProgress-bar": {
//                                                 bgcolor: tech.color,
//                                             },
//                                         }}
//                                     />
//                                 </MuiTooltip>
//                             </Box>
//                         ))}
//                     </Paper>
//                 </Grid>
//             </Grid>

//             {/* Daily Mantra */}
//             <Paper
//                 elevation={3}
//                 sx={{
//                     mt: 6,
//                     p: 4,
//                     borderRadius: 4,
//                     textAlign: "center",
//                     bgcolor: "background.paper",
//                 }}
//             >
//                 <Avatar sx={{ bgcolor: "warning.main", mx: "auto", mb: 2, width: 56, height: 56 }}>
//                     <Heart color="#F59E0B" size={32} />
//                 </Avatar>
//                 <Typography variant="h5" fontWeight="bold" mb={2}>
//                     Today's Developer Mantra
//                 </Typography>
//                 <Typography variant="h6" fontStyle="italic" color="warning.main" mb={2}>
//                     "I code not for glory, but for service. I debug not in frustration, but with compassion."
//                 </Typography>
//                 <Typography color="text.secondary" maxWidth="sm" mx="auto">
//                     Every function I write, every bug I fix, every line I refactor is an offering to the greater good.
//                     I am not the doer, but the instrument through which code flows.
//                 </Typography>
//             </Paper>

//             {/* Floating Action Elements */}
//             <Box
//                 sx={{
//                     position: "fixed",
//                     bottom: 32,
//                     right: 32,
//                     zIndex: 999,
//                 }}
//             >
//                 <Avatar
//                     sx={{
//                         bgcolor: "warning.main",
//                         width: 56,
//                         height: 56,
//                         boxShadow: 3,
//                         animation: "pulse 2s infinite",
//                         "@keyframes pulse": {
//                             "0%": { boxShadow: "0 0 0 0 rgba(250,204,21,0.7)" },
//                             "70%": { boxShadow: "0 0 0 16px rgba(250,204,21,0)" },
//                             "100%": { boxShadow: "0 0 0 0 rgba(250,204,21,0)" },
//                         },
//                     }}
//                 >
//                     <Coffee size={28} color="#fff" />
//                 </Avatar>
//             </Box>
//         </Box>
//     );
// };

// export default CodeDharmaPage;