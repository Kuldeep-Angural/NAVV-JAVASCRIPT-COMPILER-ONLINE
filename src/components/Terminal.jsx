import { Box } from '@mui/material';

export const Terminal = ({ output, width, height }) => {
  // 👇 hide terminal completely when width is 0 or "0%"
  if (!width || width === 0 || width === '0%' || width === '0') {
    return null;
  }

  return (
    <Box
      sx={{
        height: height,
        width: width,
        minWidth: 280,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        borderColor: 'divider',
        border: 'none',
      }}
    >
      <p style={{ background: '#1e1e1e', color: 'grey', fontSize: '18px' }}>Terminal</p>

      <Box
        component="pre"
        sx={{
          flex: 1,
          m: 0,
          p: 2,
          overflow: 'auto',
          bgcolor: 'grey.900',
          color: 'success.light',
          fontFamily: 'Monaco, Consolas, "Courier New", monospace',
          fontSize: 14,
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
        }}
      >
        {output}
      </Box>
    </Box>
  );
};
