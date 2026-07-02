import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import TerminalRoundedIcon from '@mui/icons-material/TerminalRounded';
import { Box, Button, Chip, Container, Grid, Stack, Typography } from '@mui/material';

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
                mb: 5,
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
          </Grid>

          <Grid size={{ xs: 12, md: 5 }}>
            <Box
              sx={{
                overflow: 'hidden',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,.08)',
              }}
            >
              <Box
                sx={{
                  px: 3,
                  py: 2,
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
              <img src="/image.png" alt="Workspace" style={{ width: '100%' }} />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
