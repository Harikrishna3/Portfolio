import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Tabs,
  Tab,
  Stack,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const API_URL = "/api/portfolio";
const LOGIN_URL = "/api/login";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);
  
  const [portfolioData, setPortfolioData] = useState<any>(null);
  const [editItem, setEditItem] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // 1. Fetch data from Live API
  useEffect(() => {
    if (isAuthenticated) {
        fetch(API_URL)
          .then(res => res.json())
          .then(data => {
            setPortfolioData(data);
            setLoading(false);
          })
          .catch(err => console.error("Failed to fetch live data:", err));
    }
  }, [isAuthenticated]);

  const handleLogin = async () => {
    try {
      const res = await fetch(LOGIN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
      });
      const data = await res.json();
      if (data.success) {
        setIsAuthenticated(true);
      } else {
        alert("Invalid Password");
      }
    } catch (err) {
      alert("Backend server not running! Please run 'npm run backend'");
    }
  };

  const handleSaveToLive = async () => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(portfolioData)
      });
      const data = await res.json();
      if (data.success) {
        alert("🚀 Portfolio saved to live storage!");
      }
    } catch (err) {
      alert("Failed to save to live storage.");
    }
  };

  const handleUpdateHero = (field: string, value: string) => {
    setPortfolioData({
        ...portfolioData,
        hero: { ...portfolioData.hero, [field]: value }
    });
  };

  const handleUpdateLink = (field: string, value: string) => {
    setPortfolioData({
        ...portfolioData,
        links: { ...portfolioData.links, [field]: value }
    });
  };

  const handleOpenEdit = (item: any, index: number, type: string) => {
    setEditItem({ ...item, _index: index, _type: type });
    setIsDialogOpen(true);
  };

  const handleAddNew = (type: 'projects' | 'experience') => {
    const newItem = type === 'projects' 
      ? { title: "", description: "", category: "New", year: "2024", details: { Problem: "", Solution: "", Tech: "", Impact: "" }, demoLink: "", githubLink: "" }
      : { role: "", company: "", period: "2024", duration: 1, details: [], skills: [], color: "#38BDF8" };
    
    setEditItem({ ...newItem, _index: -1, _type: type });
    setIsDialogOpen(true);
  };

  const handleDelete = (index: number, type: 'projects' | 'experience') => {
    if (window.confirm("Are you sure you want to delete this?")) {
        const newData = { ...portfolioData };
        newData[type].splice(index, 1);
        setPortfolioData(newData);
    }
  };

  const handleMoveItem = (index: number, direction: 'up' | 'down', type: 'projects' | 'experience') => {
    const newData = { ...portfolioData };
    const items = [...newData[type]];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (targetIndex >= 0 && targetIndex < items.length) {
      [items[index], items[targetIndex]] = [items[targetIndex], items[index]];
      newData[type] = items;
      setPortfolioData(newData);
    }
  };

  const handleSaveEdit = () => {
    const type = editItem._type;
    const newData = { ...portfolioData };
    if (editItem._index === -1) {
        newData[type].push(editItem);
    } else {
        newData[type][editItem._index] = editItem;
    }
    setPortfolioData(newData);
    setIsDialogOpen(false);
  };

  if (!isAuthenticated) {
    return (
      <Container maxWidth="sm" sx={{ minHeight: "100vh", display: "flex", alignItems: "center" }}>
        <Paper elevation={24} sx={{ p: 4, width: "100%", background: "#1E293B", borderRadius: 3, border: "1px solid #334155" }}>
          <Typography variant="h4" sx={{ color: "white", mb: 3, fontWeight: 700, textAlign: "center" }}>
            Live Portal 🔐
          </Typography>
          <TextField
            fullWidth
            type="password"
            label="Admin Password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              mb: 3,
              "& .MuiOutlinedInput-root": { color: "white", "& fieldset": { borderColor: "#334155" } },
              "& .MuiInputLabel-root": { color: "#94A3B8" }
            }}
          />
          <Button 
            fullWidth 
            variant="contained" 
            onClick={handleLogin}
            sx={{ py: 1.5, background: "linear-gradient(135deg, #3b82f6, #2563eb)", fontWeight: 600 }}
          >
            Connect to Backend
          </Button>
          <Typography variant="caption" sx={{ color: "#64748B", display: "block", mt: 2, textAlign: "center" }}>
            Make sure the local server is running (Node server/server.js)
          </Typography>
        </Paper>
      </Container>
    );
  }

  if (loading) return <Typography sx={{ color: "white", textAlign: "center", mt: 10 }}>Connecting to Live Storage...</Typography>;

  return (
    <Container maxWidth="lg" sx={{ py: 12 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
        <Typography variant="h3" sx={{ color: "white", fontWeight: 800 }}>
          Live Dashboard
        </Typography>
        <Button variant="contained" color="success" size="large" onClick={handleSaveToLive} startIcon={<SaveIcon />} sx={{ px: 4, borderRadius: "25px", fontWeight: 700 }}>
          Push All Changes to Live
        </Button>
      </Box>

      <Paper sx={{ background: "#1E293B", borderRadius: 2, overflow: "hidden" }}>
        <Tabs 
          value={activeTab} 
          onChange={(_, v) => setActiveTab(v)}
          sx={{ borderBottom: 1, borderColor: "rgba(255,255,255,0.1)", background: "rgba(0,0,0,0.2)" }}
          textColor="inherit"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Hero Section" sx={{ color: "white" }} />
          <Tab label="Projects" sx={{ color: "white" }} />
          <Tab label="Experience" sx={{ color: "white" }} />
          <Tab label="Social Links" sx={{ color: "white" }} />
          <Tab label="Skills" sx={{ color: "white" }} />
        </Tabs>

        <Box sx={{ p: 4 }}>
          {/* Tab 0: Hero */}
          {activeTab === 0 && (
            <Stack spacing={3}>
                <Typography variant="h6" sx={{ color: "#FACC15" }}>Hero Content</Typography>
                <TextField fullWidth label="Hero Title" value={portfolioData.hero.title} onChange={(e) => handleUpdateHero('title', e.target.value)} sx={{ input: { color: "white" }, label: { color: "#94A3B8" } }} />
                <TextField fullWidth multiline rows={4} label="Hero Subtitle" value={portfolioData.hero.subtitle} onChange={(e) => handleUpdateHero('subtitle', e.target.value)} sx={{ textarea: { color: "white" }, label: { color: "#94A3B8" } }} />
                <Box sx={{ display: "flex", gap: 2, flexDirection: { xs: "column", sm: "row" } }}>
                    <TextField fullWidth label="Primary CTA" value={portfolioData.hero.cta_primary} onChange={(e) => handleUpdateHero('cta_primary', e.target.value)} sx={{ input: { color: "white" } }} />
                    <TextField fullWidth label="Secondary CTA" value={portfolioData.hero.cta_secondary} onChange={(e) => handleUpdateHero('cta_secondary', e.target.value)} sx={{ input: { color: "white" } }} />
                </Box>
            </Stack>
          )}

          {/* Tab 1: Projects */}
          {activeTab === 1 && (
            <Stack spacing={2}>
              {portfolioData.projects.map((proj: any, i: number) => (
                <Paper key={i} sx={{ p: 2, background: "rgba(255,255,255,0.05)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Box>
                    <Typography variant="h6" sx={{ color: "white" }}>{proj?.title}</Typography>
                    <Typography variant="body2" sx={{ color: "#94A3B8" }}>{proj?.category} • {proj?.year}</Typography>
                  </Box>
                  <Box>
                    <IconButton color="info" disabled={i === 0} onClick={() => handleMoveItem(i, 'up', 'projects')}><ArrowUpwardIcon /></IconButton>
                    <IconButton color="info" disabled={i === portfolioData.projects.length - 1} onClick={() => handleMoveItem(i, 'down', 'projects')}><ArrowDownwardIcon /></IconButton>
                    <IconButton color="primary" onClick={() => handleOpenEdit(proj, i, 'projects')}><EditIcon /></IconButton>
                    <IconButton color="error" onClick={() => handleDelete(i, 'projects')}><DeleteIcon /></IconButton>
                  </Box>
                </Paper>
              ))}
              <Button fullWidth variant="outlined" startIcon={<AddIcon />} onClick={() => handleAddNew('projects')} sx={{ color: "white", borderColor: "#334155" }}>Add New Project</Button>
            </Stack>
          )}

          {/* Tab 2: Experience */}
          {activeTab === 2 && (
            <Stack spacing={2}>
              {portfolioData.experience.map((exp: any, i: number) => (
                <Paper key={i} sx={{ p: 2, background: "rgba(255,255,255,0.05)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Box>
                    <Typography variant="h6" sx={{ color: "white" }}>{exp?.role}</Typography>
                    <Typography variant="body2" sx={{ color: "#94A3B8" }}>{exp?.company} • {exp?.period}</Typography>
                  </Box>
                  <Box>
                    <IconButton color="info" disabled={i === 0} onClick={() => handleMoveItem(i, 'up', 'experience')}><ArrowUpwardIcon /></IconButton>
                    <IconButton color="info" disabled={i === portfolioData.experience.length - 1} onClick={() => handleMoveItem(i, 'down', 'experience')}><ArrowDownwardIcon /></IconButton>
                    <IconButton color="primary" onClick={() => handleOpenEdit(exp, i, 'experience')}><EditIcon /></IconButton>
                    <IconButton color="error" onClick={() => handleDelete(i, 'experience')}><DeleteIcon /></IconButton>
                  </Box>
                </Paper>
              ))}
              <Button fullWidth variant="outlined" startIcon={<AddIcon />} onClick={() => handleAddNew('experience')} sx={{ color: "white", borderColor: "#334155" }}>Add Milestone</Button>
            </Stack>
          )}

          {/* Tab 3: Social Links */}
          {activeTab === 3 && (
            <Stack spacing={3}>
                <Typography variant="h6" sx={{ color: "#38BDF8" }}>Social Links & Contact</Typography>
                <TextField fullWidth label="GitHub URL" value={portfolioData.links.github} onChange={(e) => handleUpdateLink('github', e.target.value)} sx={{ input: { color: "white" } }} />
                <TextField fullWidth label="LinkedIn URL" value={portfolioData.links.linkedin} onChange={(e) => handleUpdateLink('linkedin', e.target.value)} sx={{ input: { color: "white" } }} />
                <TextField fullWidth label="Medium URL" value={portfolioData.links.medium} onChange={(e) => handleUpdateLink('medium', e.target.value)} sx={{ input: { color: "white" } }} />
                <TextField fullWidth label="Contact Email" value={portfolioData.links.email} onChange={(e) => handleUpdateLink('email', e.target.value)} sx={{ input: { color: "white" } }} />
            </Stack>
          )}
        </Box>
      </Paper>

      {/* COMPREHENSIVE EDIT DIALOG */}
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} maxWidth="md" fullWidth PaperProps={{ sx: { background: "#0F172A", color: "white", border: "1px solid #334155", borderRadius: 3 } }}>
        <DialogTitle sx={{ fontWeight: 700, borderBottom: "1px solid #334155" }}>
            {editItem?._index === -1 ? "Create New" : "Edit"} {editItem?._type === 'projects' ? 'Project' : 'Milestone'}
        </DialogTitle>
        <DialogContent sx={{ py: 3 }}>
          <Stack spacing={3} sx={{ mt: 2 }}>
            <Box sx={{ display: "flex", gap: 2 }}>
                <TextField 
                  fullWidth 
                  label={editItem?._type === 'projects' ? "Project Title" : "Job Role"} 
                  value={editItem?._type === 'projects' ? editItem?.title : editItem?.role} 
                  onChange={(e) => setEditItem({ ...editItem, [editItem?._type === 'projects' ? 'title' : 'role']: e.target.value })}
                  sx={{ input: { color: "white" }, label: { color: "#94A3B8" } }}
                />
                <TextField 
                  fullWidth 
                  label={editItem?._type === 'projects' ? "Category" : "Company"} 
                  value={editItem?._type === 'projects' ? editItem?.category : editItem?.company} 
                  onChange={(e) => setEditItem({ ...editItem, [editItem?._type === 'projects' ? 'category' : 'company']: e.target.value })}
                  sx={{ input: { color: "white" }, label: { color: "#94A3B8" } }}
                />
            </Box>

            <TextField 
              fullWidth 
              label="Main Description" 
              multiline 
              rows={3}
              value={editItem?.description || ""} 
              onChange={(e) => setEditItem({ ...editItem, description: e.target.value })}
              sx={{ textarea: { color: "white" }, label: { color: "#94A3B8" } }}
            />

            {editItem?._type === 'projects' ? (
              <>
                <Typography variant="subtitle1" sx={{ color: "#FACC15", mb: -2 }}>Project Story Details</Typography>
                <TextField fullWidth multiline rows={2} label="The Problem" value={editItem?.details?.Problem} onChange={(e) => setEditItem({ ...editItem, details: { ...editItem.details, Problem: e.target.value } })} sx={{ textarea: { color: "white" } }} />
                <TextField fullWidth multiline rows={2} label="The Solution" value={editItem?.details?.Solution} onChange={(e) => setEditItem({ ...editItem, details: { ...editItem.details, Solution: e.target.value } })} sx={{ textarea: { color: "white" } }} />
                <TextField fullWidth label="Tech Stack Details" value={editItem?.details?.Tech} onChange={(e) => setEditItem({ ...editItem, details: { ...editItem.details, Tech: e.target.value } })} sx={{ input: { color: "white" } }} />
                <TextField fullWidth multiline rows={2} label="Final Impact" value={editItem?.details?.Impact} onChange={(e) => setEditItem({ ...editItem, details: { ...editItem.details, Impact: e.target.value } })} sx={{ textarea: { color: "white" } }} />
                
                <Box sx={{ display: "flex", gap: 2 }}>
                    <TextField fullWidth label="Vite/Live Link" value={editItem?.demoLink} onChange={(e) => setEditItem({ ...editItem, demoLink: e.target.value })} sx={{ input: { color: "white" } }} />
                    <TextField fullWidth label="GitHub Link" value={editItem?.githubLink} onChange={(e) => setEditItem({ ...editItem, githubLink: e.target.value })} sx={{ input: { color: "white" } }} />
                    <TextField sx={{ width: 120 }} label="Year" value={editItem?.year} onChange={(e) => setEditItem({ ...editItem, year: e.target.value })} />
                </Box>
              </>
            ) : (
                <>
                   <Box sx={{ display: "flex", gap: 2 }}>
                    <TextField fullWidth label="Time Period (e.g. 2023 - 2024)" value={editItem?.period} onChange={(e) => setEditItem({ ...editItem, period: e.target.value })} sx={{ input: { color: "white" } }} />
                    <TextField sx={{ width: 150 }} label="Duration (Months)" type="number" value={editItem?.duration} onChange={(e) => setEditItem({ ...editItem, duration: parseInt(e.target.value) })} />
                   </Box>
                   <TextField 
                    fullWidth 
                    label="Description Bullets (One per line)" 
                    multiline 
                    rows={5}
                    value={editItem?.details?.join('\n')} 
                    onChange={(e) => setEditItem({ ...editItem, details: e.target.value.split('\n') })}
                    placeholder="Wrote API endpoints...&#10;Managed database..."
                    sx={{ textarea: { color: "white" } }}
                   />
                   <TextField 
                    fullWidth 
                    label="Skills Used (Comma separated)" 
                    value={editItem?.skills?.join(', ')} 
                    onChange={(e) => setEditItem({ ...editItem, skills: e.target.value.split(',').map((s: string) => s.trim()) })}
                    sx={{ input: { color: "white" } }}
                   />
                </>
            )}
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 3, borderTop: "1px solid #334155" }}>
          <Button onClick={() => setIsDialogOpen(false)} sx={{ color: "#94A3B8" }}>Discard</Button>
          <Button variant="contained" size="large" onClick={handleSaveEdit} sx={{ px: 4, borderRadius: "25px", fontWeight: 600 }}>Update Locally</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Admin;
