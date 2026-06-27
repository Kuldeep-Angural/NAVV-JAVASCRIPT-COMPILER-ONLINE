/* eslint-disable no-new-func */
import { Box, Card, CardContent, Link, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import './App.css';
import APPButton from './components/APPButton';
import APPModal from './components/APPModal';
import { Editor } from './components/Editor';
import SocialIcon from './components/SocialIcon';
import { Terminal } from './components/Terminal';
import { Toolbar } from './components/Toolbar';
import { STORAGE_KEY } from './constants/appConstant';
export default function App() {
  const [code, setCode] = useState('console.log("Hello World");');
  const [output, setOutput] = useState('');
  const [savedCode, setSavedCode] = useState('console.log("Hello World");');
  const [isDirty, setIsDirty] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showCoffeeModal, setShowCoffeeModal] = useState(false);
  const [showTerminal, setShowTerminal] = useState(true);
  const [fontSize, setFontSize] = useState(16);
  const [theme, setTheme] = useState('vs-dark');
  const editorRef = useRef(null);
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));
  const formatLogValue = (value) => {
    if (typeof value === 'string') {
      return value;
    }
    if (typeof value === 'undefined') {
      return 'undefined';
    }

    try {
      return JSON.stringify(value, null, 2);
    } catch {
      return String(value);
    }
  };

  useEffect(() => {
    try {
      const savedCode = window.localStorage.getItem(STORAGE_KEY);
      if (savedCode) {
        setCode(savedCode);
        setSavedCode(savedCode);
        setIsDirty(false);
      }
    } catch {
      // Ignore storage access issues in browsers that block it.
    }
  }, []);

  const handleEditorChange = (value) => {
    setCode(value);
    setIsDirty(value !== savedCode);
  };

  const formatCode = () => {
    if (editorRef.current?.getAction) {
      const formatAction = editorRef.current.getAction('editor.action.formatDocument');
      formatAction?.run();
    }
  };

  const canSave = Boolean(code?.trim()) && isDirty;

  const handleSave = () => {
    if (!canSave) {
      return;
    }

    setShowSaveModal(true);
  };

  const openCoffeeModal = () => {
    setShowCoffeeModal(true);
  };

  const closeCoffeeModal = () => {
    setShowCoffeeModal(false);
  };

  const saveAsFile = () => {
    const blob = new Blob([code], { type: 'text/javascript' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'index.js';
    link.click();
    window.URL.revokeObjectURL(url);
    setOutput('Downloaded index.js');
    setShowSaveModal(false);
  };

  const saveToBrowserStorage = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, code);
      setSavedCode(code);
      setIsDirty(false);
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
      new Function(code)();
      setOutput(logs.join('\n') || 'Code Executed');
    } catch (err) {
      setOutput(`❌ ${err?.message ?? String(err)}`);
    } finally {
      console.log = original;
    }
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
      <Toolbar runCode={runCode} formatCode={formatCode} handleSave={handleSave} canSave={canSave} theme={theme} setTheme={setTheme} openinfo={openCoffeeModal} setFontSize={setFontSize} fontSize={fontSize} setShowTerminal={setShowTerminal} showTerminal={showTerminal} />
      {!isMobile && (
        <Box className="workspace">
          <Editor width={showTerminal ? '75%' : '100%'} height="100%" code={code} setCode={handleEditorChange} editorRef={editorRef} theme={theme} fontSize={fontSize} />
          <Terminal height={'100%'} width={showTerminal ? '25%' : '0%'} output={output} />
        </Box>
      )}

      {isMobile && (
        <Box className="" sx={{ height: 'calc(100vh - 60px)', display: 'flex', flexDirection: 'column' }}>
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
