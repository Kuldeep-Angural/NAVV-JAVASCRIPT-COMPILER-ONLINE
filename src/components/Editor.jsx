import { Box } from '@mui/material';
import MonacoEditor from '@monaco-editor/react';

export const Editor = ({ code, setCode, editorRef, theme, fontSize = 16, width = '75%' }) => {
  return (
    <Box
      sx={{
        height: '100%',
        width: width,
        overflow: 'hidden',
      }}
    >
      <MonacoEditor
        height="100%"
        language="javascript"
        value={code}
        theme={theme}
        onMount={(editor) => {
          editorRef.current = editor;
        }}
        onChange={(value) => setCode(value ?? '')}
        options={{
          minimap: {
            enabled: false,
          },
          fontSize,
          suggestOnTriggerCharacters: true,
          quickSuggestions: true,
          wordBasedSuggestions: true,
          autoClosingBrackets: 'always',
          tabSize: 2,
          resizeToFitContent: false,
          scrollBeyondLastLine: false,
        }}
      />
    </Box>
  );
};
