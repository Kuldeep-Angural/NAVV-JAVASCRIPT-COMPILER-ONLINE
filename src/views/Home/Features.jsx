import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { Box, Card, Container, Grid, Stack, Typography } from '@mui/material';
import { FEATURES_LIST } from '../../constants/appConstant';

const Features = () => {
  return (
    <Box
      sx={(theme) => ({
        py: { xs: 8, md: 12 },
        background: 'rgba(37, 99, 235, 0.23)',
      })}
    >
      <Container maxWidth="lg">
        {/* Header */}

        <Stack
          spacing={2}
          alignItems="center"
          textAlign="center"
          sx={{
            maxWidth: 720,
            mx: 'auto',
            mb: 8,
          }}
        >
          <Typography icon={<AutoAwesomeIcon />} label="AI Powered" color="primary" variant="outlined" />

          <Typography
            variant="h3"
            fontWeight={800}
            sx={{
              fontSize: {
                xs: '2rem',
                md: '3rem',
              },
            }}
          >
            Your AI Coding Assistant
          </Typography>

          <Typography
            color="text.secondary"
            sx={{
              fontSize: '1.05rem',
              lineHeight: 1.8,
            }}
          >
            Accelerate development with an intelligent assistant that generates, explains, debugs, optimizes, and documents your code directly inside CompileFusion.
          </Typography>
        </Stack>

        {/* Feature Grid */}

        <Grid container spacing={4}>
          {FEATURES_LIST.map((feature) => (
            <Grid
              key={feature.title}
              size={{
                xs: 12,
                sm: 6,
                md: 3,
              }}
            >
              <Card
                elevation={0}
                sx={(theme) => ({
                  height: '100%',
                  p: 3,
                  borderRadius: 2,
                  border: `1px solid ${theme.palette.divider}`,
                  transition: 'all .3s ease',
                  display: 'flex',
                  flexDirection: 'column',

                  '&:hover': {
                    transform: 'translateY(-8px)',
                    borderColor: theme.palette.primary.main,
                    boxShadow: theme.shadows[8],
                  },
                })}
              >
                <Box
                  sx={(theme) => ({
                    width: 58,
                    height: 58,
                    borderRadius: 3,
                    bgcolor: `${theme.palette.primary.main}15`,
                    color: 'primary.main',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 3,

                    '& svg': {
                      fontSize: 30,
                    },
                  })}
                >
                  {feature.icon}
                </Box>

                <Typography variant="h6" fontWeight={700} gutterBottom>
                  {feature.title}
                </Typography>

                <Typography
                  color="text.secondary"
                  sx={{
                    lineHeight: 1.8,
                    flexGrow: 1,
                  }}
                >
                  {feature.desc}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Features;
