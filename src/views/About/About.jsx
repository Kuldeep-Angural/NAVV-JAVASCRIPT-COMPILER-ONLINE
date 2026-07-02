import { Avatar, Box, Button, Chip, Container, Divider, Grid, Link, Paper, Stack, ThemeProvider, Typography } from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import PersonIcon from '@mui/icons-material/Person';
import APPHeader from '../../components/Header/Header';
import HomeTheme from '../../theme/HomeTheme';
import Footer from '../../components/Footer/Footer';

const features = ['JavaScript Compiler', 'HTML Previewer', 'JSON Diff', 'AI Code Generator', 'AI Bug Fixes', 'Code Refactoring', 'AI Code Explanation', 'Performance Optimization'];

const About = () => {
  return (
    <>
      <APPHeader />
      <ThemeProvider theme={HomeTheme}>
        <Container maxWidth="lg" sx={{ py: 8 }}>
          {/* Hero */}
          <Box textAlign="center" mb={8}>
            <Typography variant="overline" color="primary" sx={{ letterSpacing: 2 }}>
              ABOUT COMPILEFUSION
            </Typography>

            <Typography variant="h3" fontWeight={700} mt={2} gutterBottom>
              Build, Debug & Ship Code Faster with AI
            </Typography>

            <Typography variant="h6" color="text.secondary" maxWidth={850} mx="auto">
              CompileFusion is an AI-powered developer platform that combines essential coding tools with an intelligent coding assistant. Everything runs directly in your browser—no installation required.
            </Typography>
          </Box>

          {/* Mission */}
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Paper sx={{ p: 4, height: '100%' }}>
                <Stack spacing={2}>
                  <RocketLaunchIcon color="primary" fontSize="large" />

                  <Typography variant="h5" fontWeight={700}>
                    Our Mission
                  </Typography>

                  <Typography color="text.secondary">We believe developers should spend more time building products and less time switching between tools.</Typography>

                  <Typography color="text.secondary">CompileFusion brings code execution, live previews, JSON comparison, debugging, optimization and AI assistance into one fast, modern workspace.</Typography>
                </Stack>
              </Paper>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Paper sx={{ p: 4, height: '100%' }}>
                <Stack spacing={2}>
                  <AutoAwesomeIcon color="primary" fontSize="large" />

                  <Typography variant="h5" fontWeight={700}>
                    Why CompileFusion?
                  </Typography>

                  <Typography color="text.secondary">Whether you're learning JavaScript, building production applications, debugging code, or comparing JSON files, CompileFusion helps you work faster with intelligent AI assistance built directly into your workflow.</Typography>
                </Stack>
              </Paper>
            </Grid>
          </Grid>

          <Divider sx={{ my: 8 }} />

          {/* Features */}

          <Typography variant="h4" fontWeight={700} textAlign="center" gutterBottom>
            Everything Developers Need
          </Typography>

          <Typography textAlign="center" color="text.secondary" mb={4}>
            A growing collection of tools designed for productivity.
          </Typography>

          <Stack direction="row" flexWrap="wrap" justifyContent="center" gap={2} mb={8}>
            {features.map((feature) => (
              <Chip key={feature} icon={<CodeIcon />} label={feature} color="primary" variant="outlined" />
            ))}
          </Stack>

          <Divider sx={{ mb: 8 }} />

          {/* Owner */}

          <Paper sx={{ p: 5 }}>
            <Grid container spacing={4} alignItems="center">
              <Grid size={{ xs: 12, md: 3 }} textAlign="center">
                <Avatar
                  sx={{
                    width: 120,
                    height: 120,
                    mx: 'auto',
                    bgcolor: 'primary.main',
                    fontSize: 42,
                  }}
                >
                  <PersonIcon fontSize="large" />
                </Avatar>
              </Grid>

              <Grid size={{ xs: 12, md: 9 }}>
                <Typography variant="h4" fontWeight={700}>
                  Meet the Creator
                </Typography>

                <Typography variant="h6" color="primary" mt={1}>
                  Kuldeep Kumar
                </Typography>

                <Typography color="text.secondary" mt={2}>
                  Hi! I'm Kuldeep Kumar, a Full Stack Developer passionate about building developer tools, AI-powered applications, and modern web experiences.
                </Typography>

                <Typography color="text.secondary" mt={2}>
                  CompileFusion started as a personal project to bring together the tools I use every day into one simple platform. My goal is to help developers write better code, debug faster, and boost productivity with AI.
                </Typography>

                <Stack direction="row" spacing={2} mt={4} flexWrap="wrap">
                  <Button component={Link} href="https://kuldeepinfo.vercel.app" target="_blank" variant="contained">
                    Portfolio
                  </Button>

                  <Button component={Link} href="mailto:kuldeep.navv@gmail.com" variant="outlined">
                    Contact
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Paper>
        </Container>
        <Footer />
      </ThemeProvider>
    </>
  );
};

export default About;
