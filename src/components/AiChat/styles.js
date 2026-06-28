export const chatPanelStyles = {
  container: {
    position: 'fixed',
    bottom: 96,
    right: 24,
    width: { xs: 'calc(100% - 32px)', sm: 360 },
    height: '50vh', // use height instead of maxHeight
    minHeight: 400,
    display: 'flex',
    flexDirection: 'column',
    bgcolor: '#111827',
    color: 'white',
    borderRadius: 3,
    boxShadow: 8,
    zIndex: 1400,
    overflow: 'hidden',
    border: '1px solid rgba(255,255,255,0.12)',
  },

  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    px: 2,
    py: 1.25,
    borderBottom: '1px solid rgba(255,255,255,0.12)',
    flexShrink: 0,
  },

  body: {
    flex: 1,
    p: 2,
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
    overflowY: 'auto',
    minHeight: 0, // important
  },
};

export const promptInputStyles = {
  container: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: 1,
    px: 2,
    py: 1.5,
    borderTop: '1px solid rgba(255,255,255,0.12)',
    bgcolor: '#0f172a',
    flexShrink: 0,
  },

  textarea: {
    flex: 1,
    minHeight: 92,
    maxHeight: 180,
    padding: '10px 12px',
    borderRadius: 2,
    border: '1px solid rgba(255,255,255,0.16)',
    backgroundColor: '#1f2937',
    color: '#fff',
    width: '100%',
    fontSize: 14,
    resize: 'none',
    outline: 'none',
  },
};

export const bubbleStyles = {
  base: {
    maxWidth: '90%',
    px: 1.5,
    py: 1,
    borderRadius: 2,
    fontSize: 14,
    lineHeight: 1.5,
    whiteSpace: 'pre-wrap',
  },
  assistant: {
    alignSelf: 'flex-start',
    bgcolor: '#1f2937',
    color: '#f3f4f6',
  },
  user: {
    alignSelf: 'flex-end',
    bgcolor: '#2563eb',
    color: 'white',
  },
};
