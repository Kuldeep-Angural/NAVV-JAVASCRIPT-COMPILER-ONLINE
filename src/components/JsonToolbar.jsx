import DownloadIcon from '@mui/icons-material/Download';
import SettingsIcon from '@mui/icons-material/Settings';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { AppBar, Box, FormControl, IconButton, Link, Menu, MenuItem, Toolbar as MuiToolbar, Select, Tooltip, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import { FONT_SIZES, THEMES } from '../constants/appConstant';
import { format_icon, info_icon } from '../constants/svgs';

const JSONToolbar = ({ onFormat, onSwap, onDownload, showPreview, setShowPreview, theme, setTheme, fontSize, setFontSize, openinfo }) => {
  const [settingsAnchorEl, setSettingsAnchorEl] = useState(null);
  const isSettingsOpen = Boolean(settingsAnchorEl);

  const handleOpenSettings = (event) => {
    setSettingsAnchorEl(event.currentTarget);
  };

  const handleCloseSettings = () => {
    setSettingsAnchorEl(null);
  };

  const previewLabel = useMemo(() => (showPreview ? 'Hide preview' : 'Show preview'), [showPreview]);

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

        <Box display="flex" alignItems="center" gap={1}>
          <Tooltip title="Settings">
            <IconButton color="inherit" onClick={handleOpenSettings} aria-controls={isSettingsOpen ? 'settings-menu' : undefined} aria-haspopup="true" aria-expanded={isSettingsOpen ? 'true' : undefined}>
              <SettingsIcon color={isSettingsOpen ? 'primary' : 'secondary'} />
            </IconButton>
          </Tooltip>

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

          <Tooltip title="Format Code">
            <IconButton color="secondary" onClick={onFormat}>
              {format_icon}
            </IconButton>
          </Tooltip>

          <Tooltip title={previewLabel}>
            <IconButton color="secondary" onClick={setShowPreview}>
              {showPreview ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
          </Tooltip>

          <Tooltip title="Swap JSON">
            <IconButton color="secondary" onClick={onSwap}>
              <SwapHorizIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Download JSON">
            <IconButton color="secondary" onClick={onDownload}>
              <DownloadIcon />
            </IconButton>
          </Tooltip>

          {/* Info */}
          <Tooltip title="Information">
            <IconButton color="secondary" onClick={openinfo}>
              {info_icon}
            </IconButton>
          </Tooltip>
        </Box>
      </MuiToolbar>
    </AppBar>
  );
};

export default JSONToolbar;
