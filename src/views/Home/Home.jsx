// src/pages/Home/Home.jsx

import { Box, ThemeProvider } from '@mui/material';
import Footer from '../../components/Footer/Footer';
import MotionWrapper from '../../components/MotionWrapper';
import HomeTheme from '../../theme/HomeTheme';
import Features from './Features';
import { Main } from './Main';
import Products from './Products';
import WhyCodeFusion from './WhyCodeFusion';
import APPHeader from '../../components/Header/Header';

export default function Home() {
  return (
    <>
      <APPHeader />
      <ThemeProvider theme={HomeTheme}>
        <Box>
          {/* main */}
          <MotionWrapper>
            <Main />
          </MotionWrapper>

          {/* Products */}
          <MotionWrapper delay={0.1}>
            <Products />
          </MotionWrapper>

          {/* Features */}
          <MotionWrapper delay={0.2}>
            <Features />
          </MotionWrapper>

          {/* why code fusion */}
          <MotionWrapper delay={0.3}>
            <WhyCodeFusion />
          </MotionWrapper>
        </Box>
        <Footer />
      </ThemeProvider>
    </>
  );
}
