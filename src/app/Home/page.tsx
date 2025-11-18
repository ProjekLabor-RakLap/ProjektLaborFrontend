import PillNavFull from '../../Components/NavBar/PillNav/PillNavWithItems';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  Stack,
} from "@mui/material";
import {
  Inventory2,
  BarChart,
  QrCodeScanner,
  NotificationsActive,
  CloudUpload,
  People,
  TrendingUp,
} from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';

function Home() {
  const coreFeatures = [
    {
      icon: <Inventory2 fontSize="large" />,
      title: "Product Management",
      text: "Add new items, update stock levels, and monitor inventory in real time.",
    },
    {
      icon: <BarChart fontSize="large" />,
      title: "Smart Analytics",
      text: "Generate detailed reports and statistics to understand stock movements and trends.",
    },
    {
      icon: <TrendingUp fontSize="large" />,
      title: "Seamless Adjustments",
      text: "Easily increase or decrease product quantities as needed.",
    },
  ];

  const advancedTools = [
    {
      icon: <NotificationsActive fontSize="large" />,
      title: "Minimum Stock Alerts",
      text: "Get instant notifications when products fall below safety levels.",
    },
    {
      icon: <QrCodeScanner fontSize="large" />,
      title: "Barcode & QR Scanning",
      text: "Use your phone’s camera for fast product check-in and checkout.",
    },
    {
      icon: <BarChart fontSize="large" />,
      title: "Interactive Visualizations",
      text: "Explore your data with charts, top-selling lists, and stock insights.",
    },
    {
      icon: <TrendingUp fontSize="large" />,
      title: "Inventory Forecasting",
      text: "Predict future stock needs using simple forecasting models.",
    },
    {
      icon: <People fontSize="large" />,
      title: "Role-Based Access",
      text: "Manage users with tailored permissions (owner, warehouse, salesperson).",
    },
    {
      icon: <CloudUpload fontSize="large" />,
      title: "Data Import & Export",
      text: "Quickly upload or back up your data in CSV or Excel format.",
    },
  ];

  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="App">
      <header className="App-header">
        <PillNavFull />

        <Box sx={{ marginTop: "5rem" }}>
          <Container maxWidth="md">
            <Box textAlign="center" mb={8}>
              <Typography variant="h3" fontWeight="700" gutterBottom>
                RakLap
              </Typography>
              <Typography variant="h6" color="white" mb={3}>
                Simplify your stock management with our all-in-one warehouse app.
              </Typography>
              <Button
                variant="contained"
                size="large"
                sx={{ borderRadius: 3, px: 4, py: 1.5 }}
                onClick={navigateToLogin}
              >
                Get Started
              </Button>
            </Box>

            <Box mb={10}>
              <Typography
                variant="h4"
                fontWeight="600"
                textAlign="center"
                mb={4}
                gutterBottom
              >
                Core Features
              </Typography>

              <Stack
                direction={{ xs: "column", md: "row" }}
                spacing={3}
                alignItems="stretch"
              >
                {coreFeatures.map((feature, i) => (
                  <Paper
                    key={i}
                    elevation={3}
                    sx={{
                      flex: 1,
                      p: 4,
                      borderRadius: 4,
                      textAlign: "center",
                    }}
                  >
                    <Box mb={2} color="primary.main">
                      {feature.icon}
                    </Box>
                    <Typography variant="h6" fontWeight="600" mb={1}>
                      {feature.title}
                    </Typography>
                    <Typography color="text.secondary">{feature.text}</Typography>
                  </Paper>
                ))}
              </Stack>
            </Box>

            <Box mb={10}>
              <Typography
                variant="h4"
                fontWeight="600"
                textAlign="center"
                mb={4}
                gutterBottom
              >
                Advanced Tools
              </Typography>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "repeat(3, 1fr)" },
                  gap: 3,
                }}
              >
                {advancedTools.map((tool, i) => (
                  <Paper
                    key={i}
                    elevation={3}
                    sx={{
                      p: 4,
                      borderRadius: 4,
                      textAlign: "center",
                    }}
                  >
                    <Box mb={2} color="primary.main">
                      {tool.icon}
                    </Box>
                    <Typography variant="h6" fontWeight="600" mb={1}>
                      {tool.title}
                    </Typography>
                    <Typography color="text.secondary">{tool.text}</Typography>
                  </Paper>
                ))}
              </Box>
            </Box>

            <Paper
              elevation={0}
              sx={{
                p: 6,
                textAlign: "center",
                borderRadius: 4,
                bgcolor: "primary.main",
                color: "white",
              }}
            >
              <Typography variant="h4" fontWeight="700" gutterBottom>
                Take Control of Your Inventory Today
              </Typography>
              <Typography variant="h6">
                Save time, prevent shortages, and make smarter business decisions —
                all from one easy-to-use platform.
              </Typography>
            </Paper>
          </Container>
        </Box>
      </header>
    </div>
  );
}

export default Home;
