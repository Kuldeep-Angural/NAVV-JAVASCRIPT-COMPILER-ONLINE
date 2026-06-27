import TerminalIcon from '@mui/icons-material/Terminal';
import { AppBar, Box, FormControl, IconButton, MenuItem, Toolbar as MuiToolbar, Select, Tooltip, Typography } from '@mui/material';
import { FONT_SIZES, THEMES } from '../constants/appConstant';
import { format_icon, info_icon, run_icon, save_icon } from '../constants/svgs';

export const Toolbar = ({ runCode, formatCode, handleSave, canSave, theme, setTheme, openinfo, setFontSize, fontSize, showTerminal, setShowTerminal }) => {
  const handleFontChange = (event) => {
    setFontSize(Number(event.target.value));
  };

  return (
    <AppBar
      position="static"
      elevation={1}
      sx={{
        bgcolor: '#111827',
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
              width: 60,
              height: 55,
              objectFit: 'contain',
            }}
          />
          <Typography
            variant="h6"
            sx={{
              fontFamily: 'monospace',
              fontWeight: 700,
            }}
          >
            NavvJS
          </Typography>
        </Box>

        {/* Right */}
        <Box display="flex" alignItems="center" gap={1.5}>
          {/* Font Size */}
          <FormControl size="small">
            <Select
              value={fontSize}
              onChange={handleFontChange}
              sx={{
                minWidth: 50,
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

          {/* Theme */}
          <FormControl size="small">
            <Select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              sx={{
                minWidth: 60,
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

          {/* Format */}
          <Tooltip title="Format Code">
            <IconButton color="inherit" onClick={formatCode}>
              {format_icon}
            </IconButton>
          </Tooltip>

          {/* Save */}
          <Tooltip title="Save Code">
            <IconButton color="inherit" onClick={handleSave} disabled={!canSave}>
              {save_icon}
            </IconButton>
          </Tooltip>

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
