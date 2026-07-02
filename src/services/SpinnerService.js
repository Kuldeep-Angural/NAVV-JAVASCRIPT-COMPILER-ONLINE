let showSpinner = null;
let hideSpinner = null;

export const registerSpinner = (showFn, hideFn) => {
  showSpinner = showFn;
  hideSpinner = hideFn;
};

const SpinnerService = {
  show() {
    showSpinner?.();
  },

  hide() {
    hideSpinner?.();
  },
};

export default SpinnerService;
