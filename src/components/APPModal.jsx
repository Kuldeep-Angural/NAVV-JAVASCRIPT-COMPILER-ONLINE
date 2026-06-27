import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Typography, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React, { ReactNode } from 'react';

const APPModal = ({ open, onClose, title, children, actions, maxWidth = 'sm', fullWidth = true, showClose = true }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth={maxWidth} fullWidth={fullWidth}>
      {(title || showClose) && (
        <DialogTitle
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            pb: 1,
          }}
        >
          <Typography variant="h6">{title}</Typography>
          <Divider />
          {showClose && (
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          )}
        </DialogTitle>
      )}

      <DialogContent>{children}</DialogContent>

      {actions && <DialogActions>{actions}</DialogActions>}
    </Dialog>
  );
};

export default APPModal;
