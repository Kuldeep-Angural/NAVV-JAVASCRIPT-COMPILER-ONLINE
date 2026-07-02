import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import TerminalRoundedIcon from '@mui/icons-material/TerminalRounded';
import { Box, Button, Chip, Container, Divider, Grid, Paper, Stack, Typography } from '@mui/material';

const FEATURES = ['JavaScript Compiler', 'Live HTML Preview', 'Smart JSON Diff', 'AI Code Generator', 'Runtime Error Fixing', 'Performance Optimization'];

export const Main = () => {
  return (
    <Box
      sx={(theme) => ({
        position: 'relative',
        overflow: 'hidden',
        background: `
          radial-gradient(circle at top left, ${theme.palette.primary.main}22 0%, transparent 35%),
          radial-gradient(circle at bottom right, ${theme.palette.primary.main}18 0%, transparent 30%),
          linear-gradient(135deg,#0f172a 0%,#1e293b 50%,#111827 100%)
        `,
        color: '#fff',
        py: { xs: 10, md: 16 },
      })}
    >
      <Container maxWidth="lg">
        <Grid container spacing={8} alignItems="center">
          {/* Left */}

          <Grid size={{ xs: 12, md: 7 }}>
            <Chip
              icon={<AutoAwesomeRoundedIcon />}
              label="AI-Powered Developer Platform"
              color="primary"
              sx={{
                mb: 3,
                px: 1,
                fontWeight: 700,
              }}
            />

            <Typography
              variant="h1"
              sx={{
                fontWeight: 900,
                lineHeight: 1.05,
                fontSize: {
                  xs: '2.6rem',
                  md: '4.8rem',
                },
              }}
            >
              Build, Debug &
              <br />
              Ship Code Faster
              <Box
                component="span"
                sx={{
                  color: 'primary.main',
                }}
              >
                {' '}
                with AI
              </Box>
            </Typography>

            <Typography
              sx={{
                mt: 4,
                maxWidth: 700,
                fontSize: {
                  xs: 17,
                  md: 21,
                },
                color: 'grey.300',
                lineHeight: 1.8,
              }}
            >
              CompileFusion combines powerful online developer tools with an intelligent AI coding assistant that helps you write, debug, optimize, explain, and test code—all from one modern browser-based workspace.
            </Typography>

            {/* Feature List */}

            <Grid
              container
              spacing={2}
              sx={{
                mt: 5,
              }}
            >
              {FEATURES.map((feature) => (
                <Grid key={feature} size={{ xs: 12, sm: 6 }}>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <CheckCircleRoundedIcon color="primary" fontSize="small" />

                    <Typography color="grey.300">{feature}</Typography>
                  </Stack>
                </Grid>
              ))}
            </Grid>

            {/* Buttons */}

            <Stack
              direction={{
                xs: 'column',
                sm: 'row',
              }}
              spacing={2}
              mt={6}
            >
              <Button
                variant="contained"
                size="large"
                href="#products"
                endIcon={<ArrowForwardRoundedIcon />}
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: 3,
                  fontWeight: 700,
                  textTransform: 'none',
                }}
              >
                Explore Products
              </Button>
            </Stack>

            {/* Stats */}

            <Stack
              direction="row"
              spacing={4}
              flexWrap="wrap"
              mt={6}
              divider={
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{
                    borderColor: 'rgba(255,255,255,.1)',
                  }}
                />
              }
            ></Stack>
          </Grid>

          {/* Right */}

          <Grid size={{ xs: 12, md: 5 }}>
            <Paper
              elevation={0}
              sx={{
                overflow: 'hidden',
                bgcolor: 'rgb(255, 255, 255)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,.08)',
              }}
            >
              {/* Window Header */}

              <Box
                sx={{
                  px: 3,
                  py: 2,
                  borderBottom: '1px solid rgba(255,255,255,.08)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Stack direction="row" spacing={1} alignItems="center">
                  <TerminalRoundedIcon color="primary" />
                  <Typography fontWeight={700}>CompileFusion Workspace</Typography>
                </Stack>

                <Chip label="Online" color="success" size="small" />
              </Box>

              <Box p={4}>
                <Typography variant="subtitle2" color="grey.500">
                  AVAILABLE TOOLS
                </Typography>

                <Stack spacing={2} mt={3}>
                  {['JavaScript Compiler', 'HTML Preview', 'JSON Diff', 'AI Code Assistant'].map((tool) => (
                    <Stack key={tool} direction="row" spacing={2} alignItems="center">
                      <CheckCircleRoundedIcon color="primary" fontSize="small" />

                      <Typography>{tool}</Typography>
                    </Stack>
                  ))}
                </Stack>

                <Divider
                  sx={{
                    my: 4,
                    borderColor: 'rgba(255,255,255,.08)',
                  }}
                />

                <Typography variant="subtitle2" color="grey.500">
                  AI TASK
                </Typography>

                <Paper
                  sx={{
                    mt: 2,
                    p: 3,
                    bgcolor: 'rgba(255,255,255,.04)',
                    borderRadius: 3,
                  }}
                >
                  <Typography fontFamily="monospace" color="primary.main">
                    &gt; Generate Express Authentication API
                  </Typography>

                  <Stack spacing={1.5} mt={3}>
                    <Typography color="success.main">✓ API Generated</Typography>

                    <Typography color="success.main">✓ Documentation Added</Typography>

                    <Typography color="success.main">✓ Unit Tests Created</Typography>

                    <Typography color="success.main">✓ Ready to Run</Typography>
                  </Stack>
                </Paper>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
