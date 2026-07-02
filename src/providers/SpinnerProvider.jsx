import { Backdrop, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { registerSpinner } from '../services/SpinnerService';

const SpinnerProvider = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    registerSpinner(
      () => setOpen(true),
      () => setOpen(false),
    );
  }, []);

  return (
    <Backdrop
      open={open}
      sx={{
        color: '#fff',
        zIndex: (theme) => theme.zIndex.drawer + 9999,
      }}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default SpinnerProvider;
