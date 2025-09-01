import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  LinearProgress,
  IconButton,
  Collapse,
} from "@mui/material";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";
import { Code, Database, Palette } from "lucide-react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { projectsData, skillsData, timelineData } from "../utils/constants";
import LeetCodeIcon from "../assets/leetcode-icon.svg";
import JSIcon from "../assets/JS.svg";
import ReactIcon from "../assets/react.svg";
import nodeJs from "../assets/nodejs.svg";
// import expressJs from "../assets/express-js.svg";
// import mySQL from "../assets/mysql.svg";
// import postman from "../assets/postman.svg";
// import css from "../assets/css.svg";
// import docker from "../assets/docker.svg";
// import git from "../assets/git.svg";
// import html from "../assets/html.svg";
import typescript from "../assets/typescript.svg";
// import vsCode from "../assets/vs-code.svg";
// import Grid from "@mui/material/Grid";

// ------------------------- Reusable Components -------------------------
const StatsCard = ({
  value,
  label,
  color,
}: {
  value: string | number;
  label: string;
  color: string;
}) => (
  <Card sx={{ bgcolor: "background.paper", textAlign: "center", p: 2 }}>
    <Typography variant="h3" sx={{ fontWeight: 700, color }}>
      {value}
    </Typography>
    <Typography variant="body2" sx={{ color: "text.secondary" }}>
      {label}
    </Typography>
  </Card>
);

const ChartCard = ({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: any;
  children: React.ReactNode;
}) => (
  <Card
    sx={{
      bgcolor: "background.paper",
      "&:hover": { transform: "translateY(-4px)", transition: "all 0.3s ease" },
    }}
  >
    <CardContent>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Icon size={24} style={{ color: "#38BDF8", marginRight: 8 }} />
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          {title}
        </Typography>
      </Box>
      {children}
    </CardContent>
  </Card>
);

type TimelineItemProps = {
  item: {
    id: number;
    company: string;
    role: string;
    period: string;
    duration: number;
    color: string;
    skills: string[];
    details?: string[];
  };
  isLast: boolean;
};

const TimelineItem: React.FC<TimelineItemProps> = ({ item, isLast }) => {
  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ mb: 4, position: "relative" }}>
      {!isLast && (
        <Box
          sx={{
            position: "absolute",
            left: 15,
            top: 32,
            width: 2,
            height: 120,
            bgcolor: "rgba(255,255,255,0.2)",
          }}
        />
      )}

      <Box
        sx={{
          position: "absolute",
          left: 8,
          top: 8,
          width: 16,
          height: 16,
          borderRadius: "50%",
          bgcolor: item.color,
        }}
      />

      <Box sx={{ ml: 4, pl: 2 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600, color: item.color }}>
            {item.company}
          </Typography>
          <IconButton
            size="small"
            onClick={() => setOpen(!open)}
            style={{ color: item.color }}
          >
            {open ? (
              <ExpandLess fontSize="small" />
            ) : (
              <ExpandMore fontSize="small" />
            )}
          </IconButton>
        </Box>

        <Typography variant="body2" sx={{ color: "text.secondary", mb: 1 }}>
          {item.role} • {item.period}
        </Typography>

        <Box sx={{ mb: 2 }}>
          <LinearProgress
            variant="determinate"
            value={(item.duration / 12) * 100}
            sx={{
              height: 4,
              borderRadius: 2,
              bgcolor: "rgba(255,255,255,0.1)",
              "& .MuiLinearProgress-bar": { bgcolor: item.color },
            }}
          />
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            {item.duration} months
          </Typography>
        </Box>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mb: 1 }}>
          {item.skills.map((skill: string, idx: number) => (
            <Chip
              key={idx}
              label={skill}
              size="small"
              sx={{
                bgcolor: item.color + "20",
                color: item.color,
                fontSize: "0.75rem",
              }}
            />
          ))}
        </Box>

        {/* Collapsible Details */}
        <Collapse in={open}>
          <Box sx={{ mt: 1 }}>
            {item.details && item.details.length > 0 ? (
              item.details.map((detail: string, idx: number) => (
                <Typography
                  key={idx}
                  variant="body2"
                  sx={{ color: "text.secondary", mb: 0.5, pl: 1 }}
                >
                  • {detail}
                </Typography>
              ))
            ) : (
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", mb: 0.5, pl: 1 }}
              >
                No additional details available.
              </Typography>
            )}
          </Box>
        </Collapse>
      </Box>
    </Box>
  );
};

// ------------------------- Main Dashboard -------------------------
const ExperienceDashboard = () => {
  const [animatedValues, setAnimatedValues] = useState({});

  useEffect(() => {
    const timer = setTimeout(
      () => setAnimatedValues({ opacity: 1, transform: "translateY(0)" }),
      100
    );
    return () => clearTimeout(timer);
  }, []);

  // ------------------------- JSX -------------------------
  return (
    <Box
      sx={{
        minHeight: "100vh",
        pt: { xs: 4, md: 10 },
        pb: { xs: 4, md: 10 },
        px: { xs: 2, sm: 4, md: 6, lg: 8 },
        ...animatedValues,
        transition: "all 0.8s ease",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Position Absolute Stickers - Responsive */}
      {window.innerWidth  > 1080 && <>
      <Box 
        component="img" 
        src={ReactIcon} 
        sx={{
          position: "absolute", 
          bottom: { xs: 20, sm: 30, md: 43 },
          right: { xs: 10, sm: 20, md: 40 }, 
          width: { xs: 150, sm: 250, md: 300, lg: 400 }, 
          animation: "spin 8s linear infinite",
          zIndex: 0,
          "@keyframes spin": {
            "0%": { transform: "rotate(0deg)" },
            "100%": { transform: "rotate(360deg)" }
          }
        }}
      />
      
      <Box 
        component="img" 
        src={JSIcon} 
        sx={{
          position: "absolute", 
          bottom: { xs: 200, sm: 300, md: 750 },
          right: { xs: 10, sm: 20, md: 40 }, 
          width: { xs: 150, sm: 250, md: 300, lg: 400 }, 
          transform: "rotate(30deg)",
          zIndex: 0
        }}
      />
      <Box 
        component="img" 
        src={typescript} 
        sx={{
          position: "absolute", 
          bottom: { xs: 200, sm: 300, md: 450 },
          right: { xs: 10, sm: 20, md: 40 }, 
          width: { xs: 110, sm: 210, md: 260, lg: 360 }, 
          transform: "rotate(-40deg)",
          zIndex: 0
        }}
      />
      
      <Box 
        component="img" 
        src={LeetCodeIcon} 
        sx={{
          position: "absolute", 
          bottom: { xs: 250, sm: 350, md: 1010 },
          left: { xs: 10, sm: 20, md: 40 }, 
          width: { xs: 180, sm: 220, md: 250 },
          transform: "rotate(-40deg)",
          zIndex: 0
        }}
      />
      <Box 
        component="img" 
        src={nodeJs} 
        sx={{
          position: "absolute", 
          bottom: { xs: 250, sm: 350, md: 510 },
          left: { xs: 10, sm: 20, md: 40 }, 
          width: { xs: 180, sm: 220, md: 250 },
          transform: "rotate(-10deg)",
          zIndex: 0
        }}
      />
    </>
    }

      <Box sx={{ 
        maxWidth: 1200, 
        mx: "auto", 
        position: "relative",
        zIndex: 1
      }}>
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              mb: 2,
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
              background: "linear-gradient(135deg, #facc15, #f59e0b)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            My Experience Journey
          </Typography>
          <Typography
            variant="h6"
            sx={{ 
              color: "text.secondary", 
              maxWidth: 600, 
              mx: "auto",
              fontSize: { xs: "1rem", sm: "1.125rem", md: "1.25rem" },
              px: { xs: 2, sm: 0 }
            }}
          >
            21 months of professional development across 2 companies, solving
            275+ problems and building 5+ projects
          </Typography>
        </Box>

        {/* Charts Grid */}
        <Box 
          sx={{ 
            display: "flex", 
            flexDirection: "column",
            gap: 4, 
            mb: 6 
          }}
        >
          {/* Top Row - Skills and Projects */}
          <Box 
            sx={{ 
              display: "flex", 
              flexDirection: { xs: "column", lg: "row" },
              gap: 4 
            }}
          >
            {/* Skills */}
            <Box sx={{ flex: 1 }}>
              <ChartCard title="Skills Distribution" icon={Palette}>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={skillsData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name} ${(percent ? percent : 0 * 100).toFixed(0)}%`
                      }
                      outerRadius={80}
                      dataKey="value"
                    >
                      {skillsData.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <Box sx={{ mt: 2, display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {skillsData.map((skill, index) => (
                    <Chip
                      key={index}
                      label={`${skill.name} ${skill.value}%`}
                      sx={{
                        bgcolor: skill.color + "20",
                        color: skill.color,
                        fontWeight: 600,
                      }}
                    />
                  ))}
                </Box>
              </ChartCard>
            </Box>

            {/* Projects */}
            <Box sx={{ flex: 1 }}>
              <ChartCard title="Projects by Technology Stack" icon={Code}>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={projectsData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="rgba(255,255,255,0.1)"
                    />
                    <XAxis
                      dataKey="stack"
                      stroke="#E2E8F0"
                      fontSize={12}
                      angle={-45}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis stroke="#E2E8F0" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#F59E0B",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: 8,
                      }}
                    />
                    <Bar dataKey="projects" radius={[4, 4, 0, 0]}>
                      {projectsData.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>
            </Box>
          </Box>

          {/* Experience Timeline */}
          <Box>
            <ChartCard title="Career Timeline" icon={Database}>
              <Box sx={{ mt: 3 }}>
                {timelineData.map((item, index) => (
                  <TimelineItem
                    key={item.id}
                    item={item}
                    isLast={index === timelineData.length - 1}
                  />
                ))}
              </Box>
            </ChartCard>
          </Box>
        </Box>

        {/* Summary Stats */}
        <Box 
          sx={{ 
            display: "flex",
            flexWrap: "wrap",
            gap: 1,
            maxWidth: 800,
            mx: "auto",
            justifyContent: "center"
          }}
        >
          <Box sx={{ flex: { xs: "1 1 calc(50% - 12px)", md: "1 1 calc(25% - 12px)" }, minWidth: "180px" }}>
            <StatsCard value={21} label="Months Experience" color="#FACC15" />
          </Box>
          <Box sx={{ flex: { xs: "1 1 calc(50% - 12px)", md: "1 1 calc(25% - 12px)" }, minWidth: "180px" }}>
            <StatsCard value="285+" label="Problems Solved" color="#38BDF8" />
          </Box>
          <Box sx={{ flex: { xs: "1 1 calc(50% - 12px)", md: "1 1 calc(25% - 12px)" }, minWidth: "180px" }}>
            <StatsCard value="5+" label="Projects Built" color="#F97316" />
          </Box>
          <Box sx={{ flex: { xs: "1 1 calc(50% - 12px)", md: "1 1 calc(25% - 12px)" }, minWidth: "180px" }}>
            <StatsCard value="2" label="Companies" color="#8B5CF6" />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ExperienceDashboard;