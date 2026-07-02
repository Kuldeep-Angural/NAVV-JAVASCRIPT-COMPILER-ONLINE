import DownloadIcon from '@mui/icons-material/Download';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import SaveIcon from '@mui/icons-material/Save';
import SettingsIcon from '@mui/icons-material/Settings';
import WrapTextIcon from '@mui/icons-material/WrapText';

import { AppBar, Box, FormControl, IconButton, Link, Menu, MenuItem, Toolbar as MuiToolbar, Select, Tooltip, Typography } from '@mui/material';
import { useState } from 'react';
import { FONT_SIZES, NOTEPAD_LANGUAGES, THEMES } from '../constants/appConstant';

const NotePadToolbar = ({ language, setLanguage, toggleWrap, setFontSize, onSave, setTheme, onDownload, theme, fontSize, openInfo }) => {
  const [settingsAnchorEl, setSettingsAnchorEl] = useState(null);
  const isSettingsOpen = Boolean(settingsAnchorEl);
  const handleOpenSettings = (event) => {
    setSettingsAnchorEl(event.currentTarget);
  };

  const handleCloseSettings = () => {
    setSettingsAnchorEl(null);
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        background: 'rgba(255, 255, 255, 0.85)',
        borderBottom: '1px solid',
        borderColor: 'divider',
        height: '60px',
      }}
    >
      <MuiToolbar sx={{ justifyContent: 'space-between', minHeight: 60, px: 2 }}>
        {/* Left */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} gap={2}>
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
        </Box>
        <Box display="flex" alignItems="center">
          <FormControl size="small" sx={{ minWidth: 170 }}>
            <Select value={language} onChange={(e) => setLanguage(e.target.value)} sx={{ backgroundColor: 'white' }}>
              {NOTEPAD_LANGUAGES.map((lang) => (
                <MenuItem key={lang.value} value={lang.value}>
                  {lang.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Tooltip title="Word Wrap">
            <IconButton onClick={toggleWrap}>
              <WrapTextIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Save">
            <IconButton onClick={onSave}>
              <SaveIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Download">
            <IconButton onClick={onDownload}>
              <DownloadIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Settings">
            <IconButton color="inherit" onClick={handleOpenSettings} aria-controls={isSettingsOpen ? 'settings-menu' : undefined} aria-haspopup="true" aria-expanded={isSettingsOpen ? 'true' : undefined}>
              <SettingsIcon color={isSettingsOpen ? 'primary' : 'secondary'} />
            </IconButton>
          </Tooltip>

          <Tooltip title="Information">
            <IconButton onClick={openInfo}>
              <InfoOutlinedIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </MuiToolbar>

      <Menu
        anchorEl={settingsAnchorEl}
        open={isSettingsOpen}
        onClose={handleCloseSettings}
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
            mt: 1,
            px: 1.5,
            py: 1,
            minWidth: 220,
            bgcolor: '#111827',
            color: 'white',
            border: '1px solid',
            borderColor: 'divider',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1.5,
            p: 2,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 2,
            }}
          >
            <Typography variant="body2" sx={{ color: '#d1d5db' }}>
              Font Size
            </Typography>

            <FormControl size="small" sx={{ minWidth: 90 }}>
              <Select
                value={fontSize}
                onChange={(event) => setFontSize(Number(event.target.value))}
                sx={{
                  color: 'white',
                  '.MuiOutlinedInput-notchedOutline': {
                    border: 'none',
                  },
                  '& .MuiSvgIcon-root': {
                    color: 'white',
                  },
                }}
              >
                {FONT_SIZES.slice(0, 10).map((size) => (
                  <MenuItem key={size} value={size}>
                    {size}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 2,
            }}
          >
            <Typography variant="body2" sx={{ color: '#d1d5db' }}>
              Theme
            </Typography>

            <FormControl size="small" sx={{ minWidth: 120 }}>
              <Select
                value={theme}
                onChange={(event) => setTheme(event.target.value)}
                sx={{
                  color: 'white',
                  '.MuiOutlinedInput-notchedOutline': {
                    border: 'none',
                  },
                  '& .MuiSvgIcon-root': {
                    color: 'white',
                  },
                }}
              >
                {THEMES.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Menu>
    </AppBar>
  );
};

export default NotePadToolbar;
