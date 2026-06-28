import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { Box, Button, Card, Chip, Container, Grid, Stack, Typography } from '@mui/material';
import { PRODUCTS_LIST } from '../../constants/appConstant';

const Products = () => {
  return (
    <Box
      id="products"
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: 'background.paper',
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}

        <Box
          sx={{
            textAlign: 'center',
            maxWidth: 720,
            mx: 'auto',
            mb: 8,
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
            PRODUCTS
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
            Developer Tools That Just Work
          </Typography>

          <Typography
            mt={2}
            color="text.secondary"
            sx={{
              fontSize: '1.05rem',
              lineHeight: 1.8,
            }}
          >
            Powerful online tools designed for speed, simplicity, and productivity. Build, preview, compare, and debug your code without leaving your browser.
          </Typography>
        </Box>

        {/* Products */}

        <Grid container spacing={4}>
          {PRODUCTS_LIST.map((item) => (
            <Grid key={item.title} size={{ xs: 12, sm: 6, md: 4 }}>
              <Card
                elevation={0}
                sx={(theme) => ({
                  height: '100%',
                  p: 4,
                  borderRadius: 2,
                  border: `1px solid ${theme.palette.divider}`,
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all .3s ease',
                  overflow: 'hidden',
                  position: 'relative',

                  '&:hover': {
                    transform: 'translateY(-8px)',
                    borderColor: theme.palette.primary.main,
                    boxShadow: theme.shadows[8],

                    '& .open-btn': {
                      transform: 'translateX(4px)',
                    },
                  },
                })}
              >
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: 3,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: `${item.color}15`,
                      color: item.color,

                      '& svg': {
                        fontSize: 34,
                      },
                    }}
                  >
                    {item.icon}
                  </Box>

                  <Chip label="Developer Tool" size="small" color="primary" variant="outlined" />
                </Stack>

                <Typography variant="h5" fontWeight={700}>
                  {item.title}
                </Typography>

                <Typography
                  color="text.secondary"
                  mt={2}
                  sx={{
                    flexGrow: 1,
                    lineHeight: 1.8,
                  }}
                >
                  {item.description}
                </Typography>

                <Button
                  className="open-btn"
                  variant="contained"
                  endIcon={<ArrowForwardRoundedIcon />}
                  fullWidth
                  href={item.link}
                  target="_blank"
                  sx={{
                    mt: 4,
                    py: 1.4,
                    borderRadius: 3,
                    textTransform: 'none',
                    fontWeight: 700,
                    transition: '.25s',
                  }}
                >
                  Launch Tool
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Products;
