import MonacoEditor from "@monaco-editor/react";

export const Editor = ({ code, setCode, editorRef, theme }) => {
  return (
    <div className="editor">
      <MonacoEditor
        height="100%"
        language="javascript"
        value={code}
        theme={theme}
        onMount={(editor) => {
          editorRef.current = editor;
        }}
        onChange={(v) => setCode(v)}
        options={{
          minimap: {
            enabled: false,
          },
          fontSize: 16,
          suggestOnTriggerCharacters: true,
          quickSuggestions: true,
          wordBasedSuggestions: true,
          autoClosingBrackets: "always",
          tabSize: 2,
        }}
      />
    </div>
  );
};
