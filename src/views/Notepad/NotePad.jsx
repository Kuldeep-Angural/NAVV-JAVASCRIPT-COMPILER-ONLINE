import { Box, Card, CardContent, Link, ThemeProvider, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import APPModal from '../../components/APPModal';
import NotePadToolbar from '../../components/NotePadToolbar';
import SocialIcon from '../../components/SocialIcon';
import JSCompilerTheme from '../../theme/theme';
import NotePadEditor from './NotePadEditor';

const NotePad = () => {
  const [language, setLanguage] = useState('plaintext');
  const [showCoffeeModal, setShowCoffeeModal] = useState(false);
  const [editorTheme, setEditorTheme] = useState('vs-dark');
  const [fontSize, setFontSize] = useState(16);
  const [content, setContent] = useState('');
  const openCoffeeModal = () => {
    setShowCoffeeModal(true);
  };

  const closeCoffeeModal = () => {
    setShowCoffeeModal(false);
  };

  const handleSave = () => {
    localStorage.setItem('notepadContent', content);
  };

  useEffect(() => {
    const savedContent = localStorage.getItem('notepadContent');
    if (savedContent) {
      setContent(savedContent);
    }
  }, []);

  const handleDownload = () => {
    const content = localStorage.getItem('notepadContent');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'notepad.txt';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ThemeProvider theme={JSCompilerTheme}>
      <div className="app">
        <NotePadToolbar language={language} setLanguage={setLanguage} onDownload={handleDownload} onSave={handleSave} openInfo={openCoffeeModal} fontSize={fontSize} setFontSize={setFontSize} setTheme={setEditorTheme} theme={editorTheme} />
        <NotePadEditor language={language} theme={editorTheme} code={content} fontSize={fontSize} />
      </div>

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

export default NotePad;
