import { Box, Card, CardContent, Link, ThemeProvider, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import APPModal from '../../components/APPModal';
import { Editor } from '../../components/Editor';
import HtmlToolbar from '../../components/HtmlToolbar';
import SocialIcon from '../../components/SocialIcon';
import JSCompilerTheme from '../../theme/theme';

const defaultHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Live Preview</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <div class="app">
      <h1>Hello from HTML Previewer</h1>
      <p>Edit HTML, CSS, and JavaScript to see live results.</p>
    </div>
    <script src="script.js"></script>
  </body>
</html>
`;

const defaultCss = `body {
  margin: 0;
  font-family: Inter, system-ui, sans-serif;
  background: #0f172a;
  color: #e2e8f0;
}

.app {
  max-width: 960px;
  margin: 0 auto;
  padding: 32px;
}

button {
  background: #2563eb;
  color: white;
  border: none;
  padding: 12px 18px;
  border-radius: 8px;
  cursor: pointer;
}
`;

const defaultJs = `const button = document.createElement('button');
button.textContent = 'Click me';
button.addEventListener('click', () => {
  alert('Live HTML Preview is working!');
});

const root = document.querySelector('.app');
root.appendChild(button);
`;

const FILES = [
  { name: 'index.html', language: 'html', valueKey: 'html' },
  { name: 'style.css', language: 'css', valueKey: 'css' },
  { name: 'script.js', language: 'javascript', valueKey: 'js' },
];

const HTMLCompiler = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const editorRef = useRef(null);
  const iframeRef = useRef(null);
  const [activeTab, setActiveTab] = useState(0);
  const [htmlCode, setHtmlCode] = useState(defaultHtml);
  const [cssCode, setCssCode] = useState(defaultCss);
  const [jsCode, setJsCode] = useState(defaultJs);
  const [showPreview, setShowPreview] = useState(true);
  const [editorTheme, setEditorTheme] = useState('vs-dark');
  const [fontSize, setFontSize] = useState(16);
  const [showCoffeeModal, setShowCoffeeModal] = useState(false);

  const activeCode = useMemo(() => {
    if (activeTab === 0) {
      return htmlCode;
    }
    if (activeTab === 1) {
      return cssCode;
    }
    return jsCode;
  }, [activeTab, htmlCode, cssCode, jsCode]);

  const handleEditorChange = useCallback(
    (value) => {
      const nextValue = value ?? '';
      if (activeTab === 0) {
        setHtmlCode(nextValue);
      } else if (activeTab === 1) {
        setCssCode(nextValue);
      } else {
        setJsCode(nextValue);
      }
    },
    [activeTab],
  );

  const openCoffeeModal = () => {
    setShowCoffeeModal(true);
  };

  const closeCoffeeModal = () => {
    setShowCoffeeModal(false);
  };

  const buildPreview = useCallback(() => {
    const source = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><style>${cssCode}</style></head><body>${htmlCode}<script>${jsCode}<!-- --></script></body></html>`;
    const iframe = iframeRef.current;
    if (iframe?.contentWindow) {
      iframe.contentWindow.document.open();
      iframe.contentWindow.document.write(source);
      iframe.contentWindow.document.close();
    }
  }, [cssCode, htmlCode, jsCode]);

  useEffect(() => {
    buildPreview();
  }, [buildPreview]);

  const handleFormat = () => {
    const action = editorRef.current?.getAction('editor.action.formatDocument');
    action?.run();
  };

  const handleDownload = () => {
    const blob = new Blob([htmlCode], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'index.html';
    link.click();
    URL.revokeObjectURL(link.href);
  };

  return (
    <ThemeProvider theme={JSCompilerTheme}>
      <Box sx={{ minHeight: '100vh', bgcolor: '#0b1121', color: 'white' }}>
        <HtmlToolbar onRun={buildPreview} onFormat={handleFormat} openinfo={openCoffeeModal} onDownload={handleDownload} showPreview={showPreview} setShowPreview={setShowPreview} theme={editorTheme} setTheme={setEditorTheme} fontSize={fontSize} setFontSize={setFontSize} activeFileLabel={FILES[activeTab].name} />

        <Box
          sx={{
            height: 'calc(100vh - 64px)',
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
          }}
        >
          <Box
            sx={{
              width: !isMobile ? (showPreview ? '70%' : '100%') : '100%',
              height: !isMobile ? '100%' : showPreview ? '70%' : '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* File Tabs */}

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                overflowX: 'hidden',
                bgcolor: '#1f2937',
                borderBottom: '1px solid rgba(255,255,255,0.12)',
              }}
            >
              {FILES.map((file, index) => (
                <Box
                  key={file.name}
                  component="button"
                  onClick={() => setActiveTab(index)}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.75,
                    px: 1.5,
                    py: 1.2,
                    minWidth: 140,
                    bgcolor: activeTab === index ? '#374151' : '#111827',
                    border: activeTab === index ? '1px solid #60a5fa' : '1px solid transparent',
                    color: 'white',
                    cursor: 'pointer',
                  }}
                >
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      bgcolor: file.language === 'html' ? '#E34F26' : file.language === 'css' ? '#1572B6' : '#F7DF1E',
                    }}
                  />

                  {file.name}
                </Box>
              ))}
            </Box>

            <Editor width="100%" height="100%" language={FILES[activeTab].language} code={activeCode} setCode={handleEditorChange} editorRef={editorRef} theme={editorTheme} fontSize={fontSize} />
          </Box>

          {showPreview && (
            <Box
              sx={{
                width: !isMobile ? '30%' : '100%',
                height: !isMobile ? '100%' : '30%',
                bgcolor: '#020617',
                borderLeft: !isMobile ? '1px solid rgba(255,255,255,0.08)' : 'none',
                borderTop: isMobile ? '1px solid rgba(255,255,255,0.08)' : 'none',
              }}
            >
              <iframe
                ref={iframeRef}
                title="HTML Preview"
                sandbox="allow-scripts allow-same-origin"
                style={{
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  background: '#fff',
                }}
              />
            </Box>
          )}
        </Box>
      </Box>
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
    </ThemeProvider>
  );
};

export default HTMLCompiler;
