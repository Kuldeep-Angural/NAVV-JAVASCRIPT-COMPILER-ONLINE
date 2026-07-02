import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { Box, Button, Card, CardContent, Fab, Link, ThemeProvider, Tooltip, Typography } from '@mui/material';
import { useCallback, useState } from 'react';
import AIChat from '../../components/AiChat/AIChat';
import APPModal from '../../components/APPModal';
import JSONToolbar from '../../components/JsonToolbar';
import SocialIcon from '../../components/SocialIcon';
import JSCompilerTheme from '../../theme/theme';
import { formatJsonText, swapJsonValues } from './jsonDiffUtils';
import JSONEditor from './JSONEditor';
import toast from '../../services/toastService';
import AIService from '../../services/AIService';
import SpinnerService from '../../services/SpinnerService';

const JSONDiff = ({ oldJson = { description: 'this is Json Diff and Json generator. You can use this to compare and generate JSON.' }, newJson = { description: 'this is Json Diff and Json generator. You can use this to compare and generate JSON.' } }) => {
  const [leftJson, setLeftJson] = useState(() => formatJsonText(oldJson));
  const [rightJson, setRightJson] = useState(() => formatJsonText(newJson));
  const [renderSideBySide, setRenderSideBySide] = useState(true);
  const [showPreview, setShowPreview] = useState(true);
  const [showCoffeeModal, setShowCoffeeModal] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [editorTheme, setEditorTheme] = useState('vs-dark');
  const [fontSize, setFontSize] = useState(16);
  const [showPromptModal, setShowPromptModal] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleFormat = () => {
    setLeftJson(formatJsonText(leftJson));
    setRightJson(formatJsonText(rightJson));
  };

  const handleSwap = () => {
    const swapped = swapJsonValues(leftJson, rightJson);
    setLeftJson(swapped.left);
    setRightJson(swapped.right);
  };

  const handleTogglePreview = () => {
    const nextShowPreview = !showPreview;
    setShowPreview(nextShowPreview);
    setRenderSideBySide(nextShowPreview);
  };

  const handleDownload = (value, filename) => {
    const blob = new Blob([value], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  const handleDownloadSelection = (target) => {
    const selectedValue = target === 'left' ? leftJson : rightJson;
    handleDownload(selectedValue, target === 'left' ? 'left.json' : 'right.json');
    setShowDownloadModal(false);
  };

  const openCoffeeModal = () => {
    setShowCoffeeModal(true);
  };

  const closeCoffeeModal = () => {
    setShowCoffeeModal(false);
  };

  const handleGenerateCode = useCallback(async () => {
    const promptText = aiPrompt.trim();

    if (!promptText) {
      toast.error('Please enter a prompt before sending.');
      return;
    }

    try {
      setIsGenerating(true);
      SpinnerService.show();

      const instruction = `
You are a JSON expert.

Current Left JSON:
${leftJson}

Current Right JSON:
${rightJson}

User Request:
${promptText}

Rules:
- Return ONLY valid JSON.
- Do not wrap the response in markdown.
- Do not include explanations.
`;

      const response = await AIService.chat(instruction);

      const generatedCode = response?.content?.trim();

      if (!generatedCode) {
        toast.error('Failed to generate JSON.');
        return;
      }

      setRightJson(formatJsonText(generatedCode));
      setShowPromptModal(false);
      setAiPrompt('');
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong.');
    } finally {
      SpinnerService.hide();
      setIsGenerating(false);
    }
  }, [aiPrompt, leftJson, rightJson]);
  return (
    <ThemeProvider theme={JSCompilerTheme}>
      <div className="app">
        <JSONToolbar onFormat={handleFormat} onSwap={handleSwap} openinfo={openCoffeeModal} onDownload={() => setShowDownloadModal(true)} showPreview={showPreview} setShowPreview={handleTogglePreview} theme={editorTheme} setTheme={setEditorTheme} fontSize={fontSize} setFontSize={setFontSize} />
        <JSONEditor height="calc(100vh - 60px)" width="100%" leftJson={leftJson} rightJson={rightJson} setLeftJson={setLeftJson} setRightJson={setRightJson} renderSideBySide={renderSideBySide} theme={editorTheme} fontSize={fontSize} />

        <APPModal open={showDownloadModal} onClose={() => setShowDownloadModal(false)} title="Download JSON" maxWidth="xs">
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <Typography variant="body1" sx={{ color: 'white' }}>
              Choose which side you want to download.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
              <Button variant="contained" color="primary" onClick={() => handleDownloadSelection('left')}>
                Download Left JSON
              </Button>
              <Button variant="outlined" color="primary" onClick={() => handleDownloadSelection('right')}>
                Download Right JSON
              </Button>
            </Box>
          </Box>
        </APPModal>
        <Tooltip title="Ask AI" placement="top" arrow>
          <Fab color="primary" size="small" aria-label="ask ai" onClick={() => setShowPromptModal(true)} disabled={isGenerating} sx={{ position: 'fixed', bottom: 24, right: 24, zIndex: 1300 }}>
            <AutoAwesomeIcon />
          </Fab>
        </Tooltip>

        <AIChat text="I can generate the new json or update the existing one for you." placeholder="Describe what you want" open={showPromptModal} onClose={() => setShowPromptModal(false)} prompt={aiPrompt} onPromptChange={(event) => setAiPrompt(event.target.value)} onSend={handleGenerateCode} isGenerating={isGenerating} />

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
};

export default JSONDiff;
