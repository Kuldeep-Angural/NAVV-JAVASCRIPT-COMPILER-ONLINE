import { Box, Typography } from '@mui/material';
import { bubbleStyles } from './styles';

const MessageBubble = ({ role = 'assistant', text }) => {
  console.log('Rendering MessageBubble with role:', role, 'and text:', text);
  return (
    <Box sx={{ ...bubbleStyles.base, ...(role === 'user' ? bubbleStyles.user : bubbleStyles.assistant) }}>
      <Typography variant="body2">{text}</Typography>
    </Box>
  );
};

export default MessageBubble;
