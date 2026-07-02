import { useState } from 'react';
import { Link } from 'react-router-dom';

import MenuIcon from '@mui/icons-material/Menu';

import { AppBar, Box, Button, Container, IconButton, Menu, MenuItem, Stack, Toolbar } from '@mui/material';

export default function APPHeader() {
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
                  component={Link}
                  to={item.href}
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
                to="/contact-us"
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

            {/* Mobile Menu Button */}
            <IconButton
              onClick={handleOpen}
              sx={{
                display: {
                  xs: 'flex',
                  md: 'none',
                },
              }}
            >
              <MenuIcon color="primary" />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          sx: {
            width: 240,
            mt: 1,
            borderRadius: 2,
            p: 1,
          },
        }}
      >
        {[...menuItems, { title: 'Contact Us', href: '/contact-us' }].map((item) => (
          <MenuItem
            key={item.title}
            component={Link}
            to={item.href}
            onClick={handleClose}
            sx={{
              borderRadius: 1.5,
              fontWeight: 600,
            }}
          >
            {item.title}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
