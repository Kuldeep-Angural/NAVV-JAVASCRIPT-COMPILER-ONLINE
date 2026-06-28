import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CloseIcon from '@mui/icons-material/Close';
import { Box, IconButton, Typography } from '@mui/material';
import { useState } from 'react';
import MessageBubble from './MessageBubble';
import PromptInput from './PromptInput';
import { chatPanelStyles } from './styles';

const AIChat = ({ open, onClose, prompt, onPromptChange, onSend, isGenerating, title = 'Ask AI', placeholder = 'Describe what you want to do with the active file' }) => {
  const [messages, setMessages] = useState([]);

  if (!open) {
    return null;
  }

  const handleSend = () => {
    if (!prompt.trim()) {
      return;
    }

    setMessages((prev) => [
      ...prev,
      {
        role: 'user',
        text: prompt,
      },
    ]);

    onSend();
  };

  return (
    <Box sx={chatPanelStyles.container}>
      <Box sx={chatPanelStyles.header}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <AutoAwesomeIcon sx={{ color: '#fbbf24' }} />
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            {title}
          </Typography>
        </Box>

        <IconButton size="small" onClick={onClose} sx={{ color: 'white' }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      <Box sx={chatPanelStyles.body}>
        <MessageBubble role="assistant" text="I can generate, update, or refactor the active JavaScript file for you." />

        {messages.map((message, index) => (
          <MessageBubble key={index} role={message.role} text={message.text} />
        ))}

        {isGenerating && <MessageBubble role="assistant" text="Working on your request..." />}
      </Box>

      <PromptInput value={prompt} onChange={onPromptChange} onSend={handleSend} isGenerating={isGenerating} placeholder={placeholder} />
    </Box>
  );
};

export default AIChat;
