import { Route, Routes } from 'react-router-dom';

import About from '../views/About/About';
import ContactUs from '../views/ContactUs/ContactUs';
import Home from '../views/Home/Home';
import HTMLCompiler from '../views/HTMLCompiler/HTMLCompiler';
import JSCompiler from '../views/JSCompiler/JSCompiler';
import JSONDiff from '../views/JSONDiff/JSONDiff';
import NotFound from '../views/NotFound/NotFound';
import NotePad from '../views/Notepad/NotePad';

export const APPRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/jscompiler" element={<JSCompiler />} />
      <Route path="/htmlcompiler" element={<HTMLCompiler />} />
      <Route path="/jsondiff" element={<JSONDiff />} />
      <Route path="/notepad" element={<NotePad />} />
      <Route path="/about" element={<About />} />
      <Route path="contact-us" element={<ContactUs />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
