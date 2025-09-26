'use client';
import { motion, AnimatePresence } from 'framer-motion';

export function PageTransition({ children, routeKey }: { children: React.ReactNode; routeKey: string }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={routeKey}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.25, ease: 'easeOut' } }}
        exit={{ opacity: 0, y: -6, transition: { duration: 0.2, ease: 'easeIn' } }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
