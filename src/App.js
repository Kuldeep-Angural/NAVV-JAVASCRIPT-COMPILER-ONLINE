/* eslint-disable no-new-func */
import CloseIcon from '@mui/icons-material/Close';
import { Box, Card, CardContent, IconButton, Link, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';
import APPButton from './components/APPButton';
import APPModal from './components/APPModal';
import { Editor } from './components/Editor';
import SocialIcon from './components/SocialIcon';
import { Terminal } from './components/Terminal';
import { Toolbar } from './components/Toolbar';
import { STATIC_CODE_SNIPPET, STORAGE_KEY } from './constants/appConstant';
import { readFilesAsText, validateSelectedFiles } from './utils/fileUtils';
export default function App() {
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
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showCoffeeModal, setShowCoffeeModal] = useState(false);
  const [showTerminal, setShowTerminal] = useState(true);
  const [fontSize, setFontSize] = useState(16);
  const [theme, setTheme] = useState('vs-dark');
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

  const runCode = () => {
    const logs = [];
    const original = console.log;
    try {
      console.log = (...args) => {
        logs.push(args.map(formatLogValue).join(' '));
      };
      new Function(activeFile?.content ?? '')();
      setOutput(logs.join('\n') || `Executed ${activeFile?.name || 'active file'}`);
    } catch (err) {
      setOutput(`❌ ${err?.message ?? String(err)}`);
    } finally {
      console.log = original;
    }
  };

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
    <div className="app">
      <Toolbar runCode={runCode} formatCode={formatCode} handleSave={handleSave} canSave={canSave} theme={theme} setTheme={setTheme} openinfo={openCoffeeModal} setFontSize={setFontSize} fontSize={fontSize} setShowTerminal={setShowTerminal} showTerminal={showTerminal} handleOpenFiles={handleOpenFiles} />
      {!isMobile && (
        <Box className="workspace">
          <Box sx={{ width: showTerminal ? '75%' : '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, px: 0, py: 0.5, bgcolor: '#1f2937', borderBottom: '1px solid rgba(255,255,255,0.12)', overflowX: 'auto' }}>
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
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, px: 1, py: 0.5, bgcolor: '#1f2937', borderBottom: '1px solid rgba(255,255,255,0.12)', overflowX: 'auto' }}>
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
          <Editor width={'100%'} height={showTerminal ? '80%' : '100%'} code={code} setCode={handleEditorChange} editorRef={editorRef} theme={theme} fontSize={fontSize} />
          <Terminal width={'100%'} height={showTerminal ? '20%' : '0%'} output={output} />
        </Box>
      )}
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
  );
}
