import { useEffect, useState } from 'react';
import { Alert, Snackbar } from '@mui/material';
import { registerToast } from '../services/toastService';

const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  useEffect(() => {
    registerToast(({ message, severity }) => {
      setToast({
        open: true,
        message,
        severity,
      });
    });
  }, []);

  const handleClose = () => {
    setToast((prev) => ({
      ...prev,
      open: false,
    }));
  };

  return (
    <>
      {children}

      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Alert severity={toast.severity} variant="filled" onClose={handleClose} sx={{ minWidth: 300 }}>
          {toast.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ToastProvider;
