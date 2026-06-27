import { Button, CircularProgress } from '@mui/material';

const APPButton = ({ children, onClick, type = 'button', variant = 'contained', color = 'primary', size = 'medium', disabled = false, loading = false, fullWidth = false, startIcon, endIcon, sx = {}, ...props }) => {
  return (
    <Button
      type={type}
      variant={variant}
      color={color}
      size={size}
      fullWidth={fullWidth}
      disabled={disabled || loading}
      startIcon={!loading ? startIcon : null}
      endIcon={!loading ? endIcon : null}
      onClick={onClick}
      sx={{
        minWidth: 50,
        // borderRadius: 2,
        textTransform: 'none',
        fontWeight: 600,
        boxShadow: 'none',
        ...sx,
      }}
      {...props}
    >
      {loading ? <CircularProgress size={20} color="inherit" /> : children}
    </Button>
  );
};

export default APPButton;
