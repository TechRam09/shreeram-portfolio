import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TechText from './TechText';

export default function SplashScreen({ onComplete, isReady = true }) {
  const [percent, setPercent] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      // If the background assets/fonts are still loading, cap the counter at 90%
      // so the splash screen never leaves prematurely!
      const cap = isReady ? 100 : 90;
      if (current < cap) {
        const remaining = cap - current;
        const step = Math.max(1, Math.min(2, Math.floor(remaining / 14) + 1));
        current = Math.min(cap, current + step);
        setPercent(current);
      }

      if (current >= 100 && isReady) {
        clearInterval(interval);
        setTimeout(() => {
          setExiting(true);
        }, 350);
      }
    }, 45);

    return () => clearInterval(interval);
  }, [isReady]);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!exiting && (
        <motion.div
          key="splash"
          className="fixed inset-0 z-[9999] flex flex-col justify-between p-6 sm:p-12 bg-[#111017] text-[#f0ece8] select-none"
          initial={{ y: 0 }}
          exit={{
            y: '-100%',
            transition: { duration: 0.72, ease: [0.76, 0, 0.24, 1] }
          }}
        >
          {/* Top header row */}
          <div className="flex items-center justify-between text-xs sm:text-sm font-mono tracking-widest text-[#a99aae] uppercase">
            <span>Shreeram N S</span>
            <span>Portfolio &copy; 2026</span>
          </div>

          {/* Center creative mark with TechText */}
          <div className="flex flex-col items-center justify-center w-full max-w-xl mx-auto my-auto gap-4">
            <div className="w-full h-24 sm:h-32 flex items-center justify-center">
              <TechText
                text="SHREERAM"
                fontFamily="'Bricolage Grotesque', sans-serif"
                fontWeight={700}
                fontSize={72}
                letterSpacing={-0.03}
                color="#f0ece8"
                accentColor="#fa8265"
                intro="none"
                sweep={false}
                sweepProgress={percent / 100}
                selection={true}
                labels={true}
                lineStyle="dashed"
                strokeWidth={1.5}
                specks={16}
                draggable={false}
              />
            </div>
            <span className="font-['Caveat',cursive] text-xl sm:text-2xl text-[#c4b7fa]">
              started with curiosity
            </span>
            <div className="w-36 sm:w-48 h-[2px] bg-white/10 rounded-full overflow-hidden relative">
              <motion.div
                className="h-full bg-gradient-to-r from-[#fa8265] to-[#c4b7fa] rounded-full"
                style={{ width: `${percent}%` }}
                transition={{ ease: 'easeOut', duration: 0.1 }}
              />
            </div>
          </div>

          {/* Bottom status row */}
          <div className="flex items-end justify-between">
            <div className="text-[11px] sm:text-xs font-mono text-[#a99aae] flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-[#fa8265] animate-pulse" />
              <span>INITIALIZING EXPERIENCE</span>
            </div>
            <div className="font-mono text-3xl sm:text-5xl font-semibold tracking-tighter text-[#f0ece8]">
              {String(percent).padStart(2, '0')}%
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
