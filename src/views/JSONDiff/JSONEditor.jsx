import { DiffEditor } from '@monaco-editor/react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { useEffect, useMemo, useRef } from 'react';

const JSONEditor = ({ height, width, leftJson, rightJson, setLeftJson, setRightJson, renderSideBySide, theme = 'vs-dark', fontSize = 16 }) => {
  const diffEditorRef = useRef(null);
  const suppressExternalUpdateRef = useRef(false);
  const muiTheme = useTheme();

  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));
  const sideBySide = useMemo(() => {
    return isMobile ? false : renderSideBySide;
  }, [isMobile, renderSideBySide]);
  useEffect(() => {
    const editor = diffEditorRef.current;
    if (!editor) {
      return;
    }

    const originalEditor = editor.getOriginalEditor?.();
    const modifiedEditor = editor.getModifiedEditor?.();

    if (!originalEditor || !modifiedEditor) {
      return;
    }

    if (suppressExternalUpdateRef.current) {
      suppressExternalUpdateRef.current = false;
      return;
    }

    const originalModel = originalEditor.getModel?.();
    const modifiedModel = modifiedEditor.getModel?.();

    if (originalModel && originalModel.getValue() !== leftJson) {
      originalEditor.executeEdits('', [{ range: originalModel.getFullModelRange(), text: leftJson ?? '' }]);
    }

    if (modifiedModel && modifiedModel.getValue() !== rightJson) {
      modifiedEditor.executeEdits('', [{ range: modifiedModel.getFullModelRange(), text: rightJson ?? '' }]);
    }
  }, [leftJson, rightJson]);

  const handleEditorMount = (editor) => {
    diffEditorRef.current = editor;

    const originalEditor = editor.getOriginalEditor();
    const modifiedEditor = editor.getModifiedEditor();

    const syncEditors = () => {
      suppressExternalUpdateRef.current = true;
      setLeftJson?.(originalEditor.getValue());
      setRightJson?.(modifiedEditor.getValue());
    };

    originalEditor.onDidChangeModelContent(syncEditors);
    modifiedEditor.onDidChangeModelContent(syncEditors);
  };

  return (
    <Box
      sx={{
        height,
        width,
        overflow: 'hidden',
      }}
    >
      <DiffEditor
        height="100%"
        language="json"
        theme={theme}
        original={leftJson}
        modified={rightJson}
        options={{
          readOnly: false,
          minimap: { enabled: false },
          automaticLayout: true,
          wordWrap: 'on',
          renderSideBySide: sideBySide,
          originalEditable: true,
          fontSize,
        }}
        onMount={handleEditorMount}
      />
    </Box>
  );
};

export default JSONEditor;
