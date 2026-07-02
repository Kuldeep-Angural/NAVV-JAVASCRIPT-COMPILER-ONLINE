import { Box, Button, Card, CardContent, Container, Divider, Grid, Link, Stack, TextField, ThemeProvider, Typography } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LanguageIcon from '@mui/icons-material/Language';
import BugReportIcon from '@mui/icons-material/BugReport';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import SendIcon from '@mui/icons-material/Send';
import Footer from '../../components/Footer/Footer';
import APPHeader from '../../components/Header/Header';
import HomeTheme from '../../theme/HomeTheme';
import { useState } from 'react';

const ContactUs = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [messageText, setMessageText] = useState('');
  const handleSend = () => {
    const message = `
*New Contact Request*

👤 Name: ${name}
📧 Email: ${email}
📝 Subject: ${subject}

💬 Message:
${messageText}
  `;

    const url = `https://wa.me/919855171485?text=${encodeURIComponent(message)}`;

    window.open(url, '_blank');
  };
  return (
    <>
      <APPHeader />
      <ThemeProvider theme={HomeTheme}>
        <Container maxWidth="lg" sx={{ py: 8 }}>
          {/* Hero */}

          <Box textAlign="center" mb={8}>
            <Typography variant="overline" color="primary" sx={{ letterSpacing: 2 }}>
              CONTACT US
            </Typography>

            <Typography variant="h3" fontWeight={700} mt={2} gutterBottom>
              We'd Love to Hear From You
            </Typography>

            <Typography variant="h6" color="text.secondary" maxWidth={800} mx="auto">
              Whether you have a question, found a bug, have a feature request, or simply want to say hello, feel free to get in touch.
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {/* Contact Information */}

            <Grid size={{ xs: 12, md: 5 }}>
              <Stack spacing={3}>
                <Card>
                  <CardContent>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <EmailIcon color="primary" />

                      <Box>
                        <Typography fontWeight={700}>Email</Typography>

                        <Link href="mailto:kuldeep.navv@gmail.com" underline="hover">
                          kuldeep.navv@gmail.com
                        </Link>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <LanguageIcon color="primary" />

                      <Box>
                        <Typography fontWeight={700}>Portfolio</Typography>

                        <Link href="https://kuldeepinfo.vercel.app" target="_blank" underline="hover">
                          https://kuldeepinfo.vercel.app
                        </Link>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>

                <Divider />

                <Typography variant="h5" fontWeight={700}>
                  We Can Help With
                </Typography>

                <Stack spacing={2}>
                  <Stack direction="row" spacing={2}>
                    <BugReportIcon color="primary" />
                    <Typography>Bug reports</Typography>
                  </Stack>

                  <Stack direction="row" spacing={2}>
                    <LightbulbIcon color="primary" />
                    <Typography>Feature requests</Typography>
                  </Stack>

                  <Stack direction="row" spacing={2}>
                    <SupportAgentIcon color="primary" />
                    <Typography>General support</Typography>
                  </Stack>

                  <Stack direction="row" spacing={2}>
                    <SendIcon color="primary" />
                    <Typography>Business inquiries & collaborations</Typography>
                  </Stack>
                </Stack>
              </Stack>
            </Grid>

            {/* Contact Form */}

            <Grid size={{ xs: 12, md: 7 }}>
              <Card>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h5" fontWeight={700} mb={3}>
                    Send a Message
                  </Typography>

                  <Stack spacing={3}>
                    <TextField fullWidth label="Your Name" value={name} onChange={(e) => setName(e.target.value)} />

                    <TextField fullWidth type="email" label="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />

                    <TextField fullWidth label="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} />

                    <TextField fullWidth multiline rows={6} label="Message" value={messageText} onChange={(e) => setMessageText(e.target.value)} />

                    <Button variant="contained" onClick={handleSend} size="large" endIcon={<SendIcon />}>
                      Send Message
                    </Button>

                    <Typography variant="body2" color="text.secondary">
                      This contact form is currently a UI preview. You can also contact us directly via email for a faster response.
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Divider sx={{ my: 8 }} />

          {/* Footer */}
        </Container>
        <Footer />
      </ThemeProvider>
    </>
  );
};

export default ContactUs;
