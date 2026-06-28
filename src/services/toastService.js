let showToast = null;

export const registerToast = (fn) => {
  showToast = fn;
};

const toast = {
  success(message) {
    showToast?.({
      message,
      severity: 'success',
    });
  },

  error(message) {
    showToast?.({
      message,
      severity: 'error',
    });
  },

  warning(message) {
    showToast?.({
      message,
      severity: 'warning',
    });
  },

  info(message) {
    showToast?.({
      message,
      severity: 'info',
    });
  },
};

export default toast;
