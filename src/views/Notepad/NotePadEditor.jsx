import { Editor } from '@monaco-editor/react';

const NotePadEditor = ({ language, theme, code, fontSize, wrap = 'on' }) => {
  return (
    <Editor
      language={language}
      theme={theme}
      value={code}
      options={{
        fontSize,
        wordWrap: wrap ? 'on' : 'off',
        minimap: {
          enabled: false,
        },
        automaticLayout: true,
        scrollBeyondLastLine: false,
        lineNumbers: 'on',
      }}
    />
  );
};

export default NotePadEditor;
