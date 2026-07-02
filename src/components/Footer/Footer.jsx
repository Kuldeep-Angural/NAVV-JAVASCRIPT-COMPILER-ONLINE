// components/Footer/Footer.jsx

import CodeIcon from '@mui/icons-material/Code';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import XIcon from '@mui/icons-material/X';

import { Box, Container, Divider, Grid, IconButton, Link, Stack, Typography } from '@mui/material';

const socialLinks = [
  {
    icon: <LinkedInIcon />,
    href: '#',
  },
  {
    icon: <InstagramIcon />,
    href: '#',
  },
  {
    icon: <FacebookRoundedIcon />,
    href: '#',
  },
  {
    icon: <XIcon />,
    href: '#',
  },
];

const footerLinks = {
  Product: ['JavaScript Compiler', 'HTML Previewer', 'JSON Diff', 'AI Assistant'],

  Company: ['About', 'Contact', 'Blog', 'Careers'],
};

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={(theme) => ({
        mt: 10,
        bgcolor: theme.palette.grey[900],
        color: '#fff',
      })}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={20}
          sx={{
            py: 8,
          }}
        >
          {/* Brand */}

          <Grid item xs={12} md={5}>
            <Stack direction="row" spacing={1} alignItems="center" mb={2}>
              <CodeIcon
                color="primary"
                sx={{
                  fontSize: 34,
                }}
              />

              <Typography variant="h5" fontWeight={800}>
                CompileFusion
              </Typography>
            </Stack>

            <Typography
              color="grey.400"
              sx={{
                maxWidth: 420,
                lineHeight: 1.8,
                mb: 4,
              }}
            >
              CompileFusion is a modern collection of developer tools designed to help you build, debug, preview, compare, and optimize code faster—all from your browser.
            </Typography>

            <Stack direction="row" spacing={1}>
              {socialLinks.map((item, index) => (
                <IconButton
                  key={index}
                  href={item.href}
                  target="_blank"
                  sx={{
                    bgcolor: 'rgba(255,255,255,.05)',
                    color: 'white',
                    transition: '.25s',

                    '&:hover': {
                      bgcolor: 'primary.main',
                      transform: 'translateY(-3px)',
                    },
                  }}
                >
                  {item.icon}
                </IconButton>
              ))}
            </Stack>
          </Grid>

          {/* Links */}

          {Object.entries(footerLinks).map(([title, items]) => (
            <Grid item xs={6} md={2.3} key={title}>
              <Typography fontWeight={700} mb={2}>
                {title}
              </Typography>

              <Stack spacing={1.5}>
                {items.map((item) => (
                  <Link
                    key={item}
                    href="#"
                    underline="none"
                    color="grey.400"
                    sx={{
                      transition: '.25s',

                      '&:hover': {
                        color: 'primary.main',
                        pl: 0.5,
                      },
                    }}
                  >
                    {item}
                  </Link>
                ))}
              </Stack>
            </Grid>
          ))}
        </Grid>

        <Divider
          sx={{
            borderColor: 'rgba(255,255,255,.08)',
          }}
        />

        {/* Bottom */}

        <Stack
          direction={{
            xs: 'column',
            md: 'row',
          }}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          sx={{
            py: 3,
          }}
        >
          <Typography variant="body2" color="grey.500">
            © {new Date().getFullYear()} CompileFusion. All rights reserved.
          </Typography>

          <Stack direction="row" spacing={3} flexWrap="wrap" justifyContent="center">
            {['Privacy Policy', 'Terms of Service', 'Cookie Preferences', 'Security', 'Sitemap'].map((item) => (
              <Link
                key={item}
                href="#"
                underline="hover"
                color="grey.500"
                sx={{
                  fontSize: 14,

                  '&:hover': {
                    color: 'primary.main',
                  },
                }}
              >
                {item}
              </Link>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
