import { Box } from '@mui/material';
import { FaInstagram, FaFacebook, FaSnapchatGhost, FaLinkedin } from 'react-icons/fa';
import { FACEBOOK_LINK, INSTAGRAM_LINK, LINKEDIN_LINK, SNAPCHAT_LINK } from '../constants/appConstant';

const SocialIcon = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        gap: 2,
        mt: 2,
      }}
    >
      {/* Instagram */}
      <Box
        component="a"
        href={INSTAGRAM_LINK}
        target="_blank"
        sx={{
          fontSize: 26,
          color: '#E4405F',
          transition: 'transform 0.3s ease',
          '&:hover': {
            transform: 'rotate(12deg) scale(1.2)',
          },
        }}
      >
        <FaInstagram />
      </Box>

      {/* Facebook */}
      <Box
        component="a"
        href={FACEBOOK_LINK}
        target="_blank"
        sx={{
          fontSize: 26,
          color: '#1877F2',
          transition: 'transform 0.3s ease',
          '&:hover': {
            transform: 'rotate(12deg) scale(1.2)',
          },
        }}
      >
        <FaFacebook />
      </Box>

      {/* Snapchat */}
      <Box
        component="a"
        href={SNAPCHAT_LINK}
        target="_blank"
        sx={{
          fontSize: 26,
          color: '#FFFC00',
          transition: 'transform 0.3s ease',
          '&:hover': {
            transform: 'rotate(12deg) scale(1.2)',
          },
        }}
      >
        <FaSnapchatGhost />
      </Box>

      {/* LinkedIn */}
      <Box
        component="a"
        href={LINKEDIN_LINK}
        target="_blank"
        sx={{
          fontSize: 26,
          color: '#0A66C2',
          transition: 'transform 0.3s ease',
          '&:hover': {
            transform: 'rotate(12deg) scale(1.2)',
          },
        }}
      >
        <FaLinkedin />
      </Box>
    </Box>
  );
};

export default SocialIcon;
