import { Box, Card, Container, Grid, Typography } from '@mui/material';
import { FEATURES_LIST } from '../../constants/appConstant';
import SpeedIcon from '@mui/icons-material/Speed';
import PsychologyIcon from '@mui/icons-material/Psychology';
import SecurityIcon from '@mui/icons-material/Security';
import CodeIcon from '@mui/icons-material/Code';
import HubIcon from '@mui/icons-material/Hub';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

export const WHY_CHOOSE_US_LIST = [
  {
    icon: <SpeedIcon />,
    title: 'Lightning Fast Performance',
    desc: 'Execute code, compare files, format JSON, and use developer tools instantly with optimized performance and minimal loading times.',
  },
  {
    icon: <PsychologyIcon />,
    title: 'AI-Powered Assistance',
    desc: 'Boost productivity with intelligent AI features that help generate, explain, debug, and optimize your code more efficiently.',
  },
  {
    icon: <SecurityIcon />,
    title: 'Secure & Reliable',
    desc: 'Your code and data are processed securely using modern technologies with a focus on privacy, stability, and reliability.',
  },
  {
    icon: <CodeIcon />,
    title: 'All-in-One Developer Toolkit',
    desc: 'Access compilers, code formatters, JSON tools, diff checkers, regex testers, encoders, and many more utilities in one platform.',
  },
  {
    icon: <HubIcon />,
    title: 'Built for Every Developer',
    desc: 'Whether you are a student, freelancer, or professional engineer, CompileFusion helps simplify your daily development workflow.',
  },
  {
    icon: <RocketLaunchIcon />,
    title: 'Continuous Innovation',
    desc: 'We continuously add new AI capabilities, developer tools, and performance improvements based on community feedback.',
  },
];
const WhyCodeFusion = () => {
  return (
    <Box
      id="about"
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: 'background.default',
      }}
    >
      <Container maxWidth="lg">
        {/* Section Header */}

        <Box
          sx={{
            textAlign: 'center',
            mb: 7,
            maxWidth: 700,
            mx: 'auto',
          }}
        >
          <Typography
            variant="overline"
            color="primary"
            sx={{
              fontWeight: 700,
              letterSpacing: 2,
            }}
          >
            WHY CHOOSE US
          </Typography>

          <Typography
            variant="h3"
            fontWeight={800}
            mt={1}
            sx={{
              fontSize: {
                xs: '2rem',
                md: '3rem',
              },
            }}
          >
            Built for Modern Developers
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            mt={2}
            sx={{
              fontSize: '1.05rem',
              lineHeight: 1.8,
            }}
          >
            CompileFusion provides fast, reliable, and developer-friendly tools that help you write, test, debug, and compare code—all in one place.
          </Typography>
        </Box>

        {/* Feature Cards */}

        <Grid container spacing={4}>
          {WHY_CHOOSE_US_LIST.map((item) => (
            <Grid key={item.title} size={{ xs: 12, sm: 6, md: 4 }}>
              <Card
                elevation={0}
                sx={(theme) => ({
                  height: '100%',
                  p: 4,
                  borderRadius: 2,
                  border: `1px solid ${theme.palette.divider}`,
                  bgcolor: 'background.paper',
                  transition: 'all .3s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',

                  '&:hover': {
                    transform: 'translateY(-8px)',
                    borderColor: theme.palette.primary.main,
                    boxShadow: theme.shadows[8],
                  },
                })}
              >
                <Box
                  sx={(theme) => ({
                    width: 64,
                    height: 64,
                    borderRadius: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: theme.palette.primary.main + '15',
                    color: 'primary.main',
                    mb: 3,

                    '& svg': {
                      fontSize: 32,
                    },
                  })}
                >
                  {item.icon}
                </Box>

                <Typography variant="h6" fontWeight={700} gutterBottom>
                  {item.title}
                </Typography>

                <Typography
                  color="text.secondary"
                  sx={{
                    lineHeight: 1.8,
                  }}
                >
                  {item.desc}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default WhyCodeFusion;
