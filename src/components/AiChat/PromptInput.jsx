import SendIcon from '@mui/icons-material/Send';
import { Box } from '@mui/material';
import APPButton from '../APPButton';
import { promptInputStyles } from './styles';

const PromptInput = ({ value, onChange, onSend, isGenerating, placeholder }) => {
  const handleKeyDown = (e) => {
    // Press Enter to send
    // Shift + Enter for a new line
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <Box sx={promptInputStyles.container}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSend();
        }}
        style={{ display: 'flex', flex: 1, gap: '8px' }}
      >
        <textarea value={value} onChange={onChange} onKeyDown={handleKeyDown} placeholder={placeholder} disabled={isGenerating} style={promptInputStyles.textarea} />

        <APPButton type="submit" disabled={isGenerating || !value?.trim()} variant="text">
          <SendIcon fontSize="small" />
        </APPButton>
      </form>
    </Box>
  );
};

export default PromptInput;
