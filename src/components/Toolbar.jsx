import SettingsIcon from '@mui/icons-material/Settings';
import TerminalIcon from '@mui/icons-material/Terminal';
import { AppBar, Box, FormControl, IconButton, Menu, MenuItem, Toolbar as MuiToolbar, Select, Tooltip, Typography } from '@mui/material';
import { useState } from 'react';
import { FONT_SIZES, THEMES } from '../constants/appConstant';
import { format_icon, info_icon, run_icon, save_icon } from '../constants/svgs';

export const Toolbar = ({ runCode, formatCode, handleSave, canSave, theme, setTheme, openinfo, setFontSize, fontSize, showTerminal, setShowTerminal }) => {
  const [settingsAnchorEl, setSettingsAnchorEl] = useState(null);

  const handleFontChange = (event) => {
    setFontSize(Number(event.target.value));
  };

  const openSettingsMenu = (event) => {
    setSettingsAnchorEl(event.currentTarget);
  };

  const closeSettingsMenu = () => {
    setSettingsAnchorEl(null);
  };

  const isSettingsOpen = Boolean(settingsAnchorEl);

  return (
    <AppBar
      position="static"
      elevation={1}
      sx={{
        bgcolor: '#57698f',
        borderBottom: '1px solid',
        borderColor: 'divider',
        height: '60px',
      }}
    >
      <MuiToolbar sx={{ justifyContent: 'space-between' }}>
        {/* Left */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} gap={2}>
          <Box
            component="img"
            src="./logo.png"
            alt="NavvJS Logo"
            sx={{
              width: 70,
              height: 65,
              objectFit: 'contain',
            }}
          />
          <Typography
            variant="h6"
            sx={{
              display: { xs: 'none', sm: 'block' },
              fontFamily: 'monospace',
              fontWeight: 700,
            }}
          >
            NavvJS
          </Typography>
        </Box>

        {/* Right */}
        <Box display="flex" alignItems="center" gap={1}>
          {/* Save */}
          <Tooltip title="Save Code">
            <IconButton color="inherit" onClick={handleSave} disabled={!canSave}>
              {save_icon}
            </IconButton>
          </Tooltip>

          {/* Settings */}
          <Tooltip title="Settings">
            <IconButton color="inherit" onClick={openSettingsMenu} aria-controls={isSettingsOpen ? 'settings-menu' : undefined} aria-haspopup="true" aria-expanded={isSettingsOpen ? 'true' : undefined}>
              <SettingsIcon sx={{ color: isSettingsOpen ? '#4caf50' : 'white' }} />
            </IconButton>
          </Tooltip>

          <Menu
            id="settings-menu"
            anchorEl={settingsAnchorEl}
            open={isSettingsOpen}
            onClose={closeSettingsMenu}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
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
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, padding: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
                <Typography variant="body2" sx={{ color: '#d1d5db' }}>
                  Font Size
                </Typography>
                <FormControl size="small" sx={{ minWidth: 90 }}>
                  <Select
                    value={fontSize}
                    onChange={handleFontChange}
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
                    {FONT_SIZES.map((size) => (
                      <MenuItem key={size} value={size}>
                        {size}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
                <Typography variant="body2" sx={{ color: '#d1d5db' }}>
                  Theme
                </Typography>
                <FormControl size="small" sx={{ minWidth: 110 }}>
                  <Select
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
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

          {/* Format */}
          <Tooltip title="Format Code">
            <IconButton color="inherit" onClick={formatCode}>
              {format_icon}
            </IconButton>
          </Tooltip>

          {/* Save */}

          {/* Run */}
          <Tooltip title="Run Code">
            <IconButton color="inherit" onClick={runCode}>
              {run_icon}
            </IconButton>
          </Tooltip>

          <IconButton size="small" onClick={() => setShowTerminal(!showTerminal)}>
            {/* 🔥 active line indicator */}
            <TerminalIcon
              style={{
                color: showTerminal ? '#4caf50' : 'white',
              }}
            />
          </IconButton>

          {/* Info */}
          <Tooltip title="Information">
            <IconButton color="inherit" onClick={openinfo}>
              {info_icon}
            </IconButton>
          </Tooltip>
        </Box>
      </MuiToolbar>
    </AppBar>
  );
};
