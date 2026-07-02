import { motion } from 'motion/react';

const MotionWrapper = ({ children, delay = 0, duration = 0.55, ...props }) => {
  return (
    <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }} {...props}>
      {children}
    </motion.div>
  );
};

export default MotionWrapper;
