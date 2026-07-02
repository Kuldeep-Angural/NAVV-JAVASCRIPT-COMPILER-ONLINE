// components/Header/Header.jsx

import { useState } from 'react';
import { Link } from 'react-router-dom';

import MenuIcon from '@mui/icons-material/Menu';

import { AppBar, Box, Button, Container, Drawer, IconButton, List, ListItemButton, ListItemText, Stack, Toolbar, Typography } from '@mui/material';

export default function APPHeader() {
  const [open, setOpen] = useState(false);

  const menuItems = [
    {
      title: 'About',
      href: '/about',
    },
    {
      title: 'Products',
      href: '#products',
    },
  ];

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={(theme) => ({
          background: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(18px)',
          borderBottom: `1px solid ${theme.palette.divider}`,
        })}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ minHeight: 72 }}>
            {/* Logo */}
            <Box
              component={Link}
              to="/"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.25,
                flexGrow: 1,
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              <img src="/logo.png" alt="Logo" style={{ width: 120, height: 60 }} />
            </Box>

            {/* Desktop Navigation */}
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              sx={{
                display: {
                  xs: 'none',
                  md: 'flex',
                },
              }}
            >
              {menuItems.map((item) => (
                <Button
                  key={item.title}
                  href={item.href}
                  color="primary"
                  sx={{
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 600,
                    transition: '0.25s',
                    '&:hover': {
                      bgcolor: 'action.hover',
                    },
                  }}
                >
                  {item.title}
                </Button>
              ))}

              <Button
                variant="contained"
                component={Link}
                to="/contact"
                sx={{
                  ml: 1,
                  px: 3,
                  py: 1.2,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 700,
                  boxShadow: 'none',
                  '&:hover': {
                    boxShadow: 3,
                  },
                }}
              >
                Contact Us
              </Button>
            </Stack>

            {/* Mobile Menu */}
            <IconButton
              onClick={() => setOpen(true)}
              color="inherit"
              sx={{
                display: {
                  xs: 'flex',
                  md: 'none',
                },
              }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            width: 280,
            p: 2,
          },
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 800,
            mb: 3,
          }}
        >
          CompileFusion
        </Typography>

        <List disablePadding>
          {menuItems.map((item) => (
            <ListItemButton
              key={item.title}
              component="a"
              href={item.href}
              onClick={() => setOpen(false)}
              sx={{
                borderRadius: 2,
                mb: 0.5,
              }}
            >
              <ListItemText
                primary={item.title}
                primaryTypographyProps={{
                  fontWeight: 600,
                }}
              />
            </ListItemButton>
          ))}
        </List>

        <Button
          component={Link}
          to="/contact-us"
          variant="contained"
          fullWidth
          onClick={() => setOpen(false)}
          sx={{
            mt: 3,
            py: 1.3,
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 700,
          }}
        >
          Contact Us
        </Button>
      </Drawer>
    </>
  );
}
