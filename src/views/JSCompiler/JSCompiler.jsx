/* eslint-disable no-new-func */
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Card, CardContent, Fab, IconButton, Link, ThemeProvider, Tooltip, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useCallback, useEffect, useRef, useState } from 'react';
import APPButton from '../../components/APPButton';
import APPModal from '../../components/APPModal';
import AIChat from '../../components/AiChat/AIChat';
import { Editor } from '../../components/Editor';
import SocialIcon from '../../components/SocialIcon';
import { Terminal } from '../../components/Terminal';
import { Toolbar } from '../../components/Toolbar';
import { STATIC_CODE_SNIPPET, STORAGE_KEY } from '../../constants/appConstant';
import AIService from '../../services/AIService';
import JSCompilerTheme from '../../theme/theme';
import { readFilesAsText, validateSelectedFiles } from '../../utils/fileUtils';
export default function JSCompiler() {
  const createFileState = (name, content = '') => ({
    id: `${name}-${Math.random().toString(36).slice(2, 9)}`,
    name,
    content,
    savedContent: content,
    isDirty: false,
  });

  const initialFile = (() => {
    try {
      const savedCode = window.localStorage.getItem(STORAGE_KEY);
      return createFileState('index.js', savedCode?.trim() ? savedCode : STATIC_CODE_SNIPPET);
    } catch {
      return createFileState('index.js', 'console.log("Hello World");');
    }
  })();

  const [openFiles, setOpenFiles] = useState([initialFile]);
  const [activeFileId, setActiveFileId] = useState(initialFile.id);
  const [output, setOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPromptModal, setShowPromptModal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showCoffeeModal, setShowCoffeeModal] = useState(false);
  const [showTerminal, setShowTerminal] = useState(true);
  const [fontSize, setFontSize] = useState(16);
  const [theme, setTheme] = useState('vs-dark');
  const [aiPrompt, setAiPrompt] = useState('');
  const editorRef = useRef(null);
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));
  const activeFile = openFiles.find((file) => file.id === activeFileId) ?? openFiles[0];
  const code = activeFile?.content ?? '';
  const formatLogValue = (value) => {
    if (typeof value === 'string') {
      return value;
    }
    if (typeof value === 'undefined') {
      return 'undefined';
    }

    if (Array.isArray(value)) {
      return `[${value.map(formatLogValue).join(', ')}]`;
    }

    if (value && typeof value === 'object') {
      return Object.prototype.toString.call(value) === '[object Object]'
        ? `{ ${Object.entries(value)
          .map(([k, v]) => `${k}: ${formatLogValue(v)}`)
          .join(', ')} }`
        : String(value);
    }

    return String(value);
  };

  const handleEditorChange = (value) => {
    const nextValue = value ?? '';
    setOpenFiles((prev) =>
      prev.map((file) =>
        file.id === activeFileId
          ? {
            ...file,
            content: nextValue,
            isDirty: nextValue !== file.savedContent,
          }
          : file,
      ),
    );
  };

  const formatCode = () => {
    if (editorRef.current?.getAction) {
      const formatAction = editorRef.current.getAction('editor.action.formatDocument');
      formatAction?.run();
    }
  };

  const canSave = Boolean(activeFile?.content?.trim()) && activeFile?.isDirty;

  const handleSave = useCallback(() => {
    if (!canSave) {
      return;
    }

    setShowSaveModal(true);
  }, [canSave]);

  const openCoffeeModal = () => {
    setShowCoffeeModal(true);
  };

  const closeCoffeeModal = () => {
    setShowCoffeeModal(false);
  };

  const saveAsFile = () => {
    const blob = new Blob([activeFile?.content ?? ''], { type: 'text/javascript' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = activeFile?.name || 'index.js';
    link.click();
    window.URL.revokeObjectURL(url);
    setOutput(`Downloaded ${activeFile?.name || 'index.js'}`);
    setShowSaveModal(false);
  };

  const saveToBrowserStorage = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, activeFile?.content ?? '');
      setOpenFiles((prev) =>
        prev.map((file) =>
          file.id === activeFileId
            ? {
              ...file,
              savedContent: file.content,
              isDirty: false,
            }
            : file,
        ),
      );
      setOutput('Saved to browser storage');
    } catch {
      setOutput('Could not save to browser storage');
    }

    setShowSaveModal(false);
  };

  // const runCode = () => {
  //   const logs = [];
  //   const original = console.log;
  //   try {
  //     console.log = (...args) => {
  //       logs.push(args.map(formatLogValue).join(' '));
  //     };
  //     new Function(activeFile?.content ?? '')();
  //     setOutput(logs.join('\n') || `Executed ${activeFile?.name || 'active file'}`);
  //   } catch (err) {
  //     setOutput(`❌ ${err?.message ?? String(err)}`);
  //   } finally {
  //     console.log = original;
  //   }
  // };
  const runCode = async () => {
    setOutput('');

    const logs = [];

    const write = (...args) => {
      const message = args.map(formatLogValue).join(' ');

      logs.push(message);

      setOutput((prev) =>
        prev ? `${prev}\n${message}` : message,
      );
    };

    const sandboxConsole = {
      log: write,
      error: (...args) => write('❌', ...args),
      warn: (...args) => write('⚠️', ...args),
      clear: () => {
        logs.length = 0;
        setOutput('');
      },
    };

    try {
      const execute = new Function(
        'console',
        `
      return (async () => {
        ${activeFile?.content || ''}
      })();
      `,
      );

      await execute(sandboxConsole);

      if (logs.length === 0) {
        setOutput(
          `Executed ${activeFile?.name || 'active file'}`
        );
      }
    } catch (err) {
      setOutput(`❌ ${err?.message || String(err)}`);
    }
  };

  const handleGenerateCode = useCallback(async () => {
    if (!activeFileId) {
      return;
    }

    const promptText = aiPrompt.trim();

    if (!promptText) {
      setOutput('❌ Please describe what you want the AI to do.');
      return;
    }

    setIsGenerating(true);
    setOutput('Working on your request...');

    try {
      const instruction = `You are editing the active JavaScript file. The current file content is:\n\n${activeFile?.content ?? ''}\n\nUser request: ${promptText}\n\nRules:\n- Only return the updated JavaScript code.\n- If the user asks to generate, add new code.\n- If the user asks to update or refactor, replace the file content with the improved version.\n- Keep it valid JavaScript.`;
      const response = await AIService.chat(instruction);
      const generatedCode = response?.content?.trim();

      if (!generatedCode) {
        throw new Error('The AI service did not return any code.');
      }

      const cleanGeneratedCode = generatedCode
        .replace(/^```(?:js|javascript)?\s*/i, '')
        .replace(/```\s*$/i, '')
        .trim();

      setOpenFiles((prev) =>
        prev.map((file) =>
          file.id === activeFileId
            ? {
              ...file,
              content: `${file.content}${file.content.trim() ? '\n\n' : ''}${cleanGeneratedCode}`,
              isDirty: true,
            }
            : file,
        ),
      );
      setOutput('AI updated the active file');
      setShowPromptModal(false);
      setAiPrompt('');
    } catch (err) {
      setOutput(`❌ ${err?.message ?? String(err)}`);
    } finally {
      setIsGenerating(false);
    }
  }, [activeFileId, activeFile?.content, aiPrompt]);

  const handleOpenFiles = useCallback(
    async (event) => {
      const selectedFiles = Array.from(event.target.files ?? []);

      try {
        validateSelectedFiles(selectedFiles, openFiles.length);
        const contents = await readFilesAsText(selectedFiles);
        const newFiles = selectedFiles.map((file, index) => ({
          ...createFileState(file.name, contents[index]),
        }));
        setOpenFiles((prev) => [...prev, ...newFiles]);
        setActiveFileId(newFiles[newFiles.length - 1].id);
        setOutput(`Loaded ${newFiles.length} file${newFiles.length > 1 ? 's' : ''}`);
      } catch (err) {
        setOutput(`❌ ${err?.message ?? String(err)}`);
      } finally {
        event.target.value = '';
      }
    },
    [openFiles.length],
  );

  const handleCloseFile = (fileId) => {
    const isClosingActive = fileId === activeFileId;
    setOpenFiles((prev) => {
      const nextFiles = prev.filter((file) => file.id !== fileId);
      if (nextFiles.length === 0) {
        const fallback = createFileState('index.js');
        setActiveFileId(fallback.id);
        return [fallback];
      }

      if (isClosingActive) {
        const currentIndex = prev.findIndex((file) => file.id === fileId);
        const nextIndex = Math.min(Math.max(currentIndex - 1, 0), nextFiles.length - 1);
        setActiveFileId(nextFiles[nextIndex].id);
      }

      return nextFiles;
    });
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        handleSave();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleSave]);

  return (
    <ThemeProvider theme={JSCompilerTheme}>
      <div className="app">
        <Toolbar runCode={runCode} formatCode={formatCode} handleSave={handleSave} canSave={canSave} theme={theme} setTheme={setTheme} openinfo={openCoffeeModal} setFontSize={setFontSize} fontSize={fontSize} setShowTerminal={setShowTerminal} showTerminal={showTerminal} handleOpenFiles={handleOpenFiles} />
        {!isMobile && (
          <Box className="workspace">
            <Box sx={{ width: showTerminal ? '75%' : '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, overflow: 'hidden', bgcolor: '#1f2937', borderBottom: '1px solid rgba(255,255,255,0.12)', overflowX: 'auto' }}>
                {openFiles.map((file) => (
                  <Box
                    key={file.id}
                    component="button"
                    onClick={() => setActiveFileId(file.id)}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.75,
                      px: 1.25,
                      py: 0.75,
                      border: file.id === activeFileId ? '1px solid #60a5fa' : '1px solid transparent',
                      bgcolor: file.id === activeFileId ? '#374151' : '#111827',
                      color: 'white',
                      cursor: 'pointer',
                      minWidth: 120,
                      justifyContent: 'space-between',
                    }}
                  >
                    <Typography variant="body2" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {file.name}
                      {file.isDirty ? ' •' : ''}
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={(event) => {
                        event.stopPropagation();
                        handleCloseFile(file.id);
                      }}
                      sx={{ color: 'inherit', p: 0.25 }}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </Box>
                ))}
              </Box>
              <Editor width="100%" height="100%" code={code} setCode={handleEditorChange} editorRef={editorRef} theme={theme} fontSize={fontSize} />
            </Box>
            <Terminal height={'100%'} width={showTerminal ? '25%' : '0%'} output={output} />
          </Box>
        )}

        {isMobile && (
          <Box className="" sx={{ height: 'calc(100vh - 60px)', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, overflow: 'hidden', bgcolor: '#1f2937', borderBottom: '1px solid rgba(255,255,255,0.12)', overflowX: 'auto' }}>
              {openFiles.map((file) => (
                <Box
                  key={file.id}
                  component="button"
                  onClick={() => setActiveFileId(file.id)}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.75,
                    px: 1.2,
                    py: 0.75,
                    border: file.id === activeFileId ? '1px solid #60a5fa' : '1px solid transparent',
                    bgcolor: file.id === activeFileId ? '#374151' : '#111827',
                    color: 'white',
                    cursor: 'pointer',
                    minWidth: 120,
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography variant="body2" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {file.name}
                    {file.isDirty ? ' •' : ''}
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={(event) => {
                      event.stopPropagation();
                      handleCloseFile(file.id);
                    }}
                    sx={{ color: 'inherit', p: 0.25 }}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </Box>
              ))}
            </Box>
            <Editor width={'100%'} height={showTerminal ? '80%' : '100%'} code={code} setCode={handleEditorChange} editorRef={editorRef} theme={theme} fontSize={fontSize} />
            <Terminal width={'100%'} height={showTerminal ? '20%' : '0%'} output={output} />
          </Box>
        )}

        <Tooltip title="Ask AI" placement="top" arrow>
          <Fab color="primary" aria-label="ask ai" onClick={() => setShowPromptModal(true)} disabled={isGenerating} sx={{ position: 'fixed', bottom: 24, right: 24, zIndex: 1300 }}>
            <AutoAwesomeIcon />
          </Fab>
        </Tooltip>

        <AIChat open={showPromptModal} onClose={() => setShowPromptModal(false)} prompt={aiPrompt} onPromptChange={(event) => setAiPrompt(event.target.value)} onSend={handleGenerateCode} isGenerating={isGenerating} />

        <APPModal
          open={showSaveModal}
          onClose={() => setShowSaveModal(false)}
          title="Save Code"
          actions={
            <>
              <APPButton onClick={() => setShowSaveModal(false)} variant="outlined">
                Cancel
              </APPButton>
              <APPButton variant="contained" onClick={saveAsFile}>
                Download
              </APPButton>
              <APPButton variant="contained" onClick={saveToBrowserStorage}>
                Save
              </APPButton>
            </>
          }
        >
          <div style={{ paddingTop: 10 }}>Choose how you want to save your code.</div>
        </APPModal>

        <APPModal open={showCoffeeModal} onClose={closeCoffeeModal} title="information" maxWidth="xs">
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              pt: 1,
            }}
          >
            <Typography variant="body1" sx={{ color: 'white' }}>
              Author: <strong>Kuldeep Kumar</strong>
            </Typography>

            <Typography variant="body2" sx={{ color: 'white' }}>
              🌐:
              <Link href="https://kuldeepinfo.vercel.app" target="_blank" underline="hover">
                kuldeepinfo.vercel.app
              </Link>
            </Typography>

            <Typography variant="body1" sx={{ color: 'white' }}>
              Email:{' '}
              <Link href="mailto:kuldeep.navv@gmail.com" underline="hover">
                kuldeep.navv@gmail.com
              </Link>
            </Typography>

            <Typography
              variant="body1"
              sx={{
                fontWeight: 500,
              }}
            >
              If this compiler helped you, buy me a coffee ☕
            </Typography>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Card
                elevation={0}
                sx={{
                  p: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                  textAlign: 'center',
                  width: 'fit-content',
                }}
              >
                <CardContent
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 1.5,
                    '&:last-child': {
                      pb: 2,
                    },
                  }}
                >
                  <Box
                    component="img"
                    src="./upipe-qr.png"
                    alt="Support QR"
                    sx={{
                      width: 180,
                      height: 180,
                      objectFit: 'contain',
                    }}
                  />

                  <Typography variant="body2" color="text.secondary">
                    Scan QR to support ❤️
                  </Typography>
                </CardContent>
              </Card>
            </Box>
            <SocialIcon />
          </Box>
        </APPModal>
      </div>
    </ThemeProvider>
  );
}
