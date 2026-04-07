/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, PartyPopper, Sparkles } from "lucide-react";

export default function App() {
  const [isAccepted, setIsAccepted] = useState(false);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Generate random hearts for background decoration
  useEffect(() => {
    const interval = setInterval(() => {
      setHearts((prev) => [
        ...prev.slice(-20),
        { id: Date.now(), x: Math.random() * 100, y: Math.random() * 100 },
      ]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const moveNoButton = () => {
    if (!containerRef.current) return;
    
    const container = containerRef.current.getBoundingClientRect();
    const padding = 50;
    
    // Calculate random position within the container
    const newX = (Math.random() - 0.5) * (container.width - padding * 2);
    const newY = (Math.random() - 0.5) * (container.height - padding * 2);
    
    setNoButtonPos({ x: newX, y: newY });
  };

  if (isAccepted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-pink-50 p-4 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 12, stiffness: 200 }}
          className="bg-white p-8 rounded-3xl shadow-2xl border-4 border-pink-200 relative overflow-hidden"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute -top-4 -left-4 text-pink-400"
          >
            <Sparkles size={48} />
          </motion.div>
          
          <div className="flex justify-center mb-6">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
            >
              <Heart className="text-red-500 fill-red-500" size={80} />
            </motion.div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-cursive text-pink-600 mb-4">
            Yeeee! Anh biết mà! ❤️
          </h1>
          <p className="text-xl text-gray-600 mb-8 font-sans">
            Tối nay anh qua đón em nhé. Chuẩn bị xinh đẹp nha công chúa!
          </p>
          
          <div className="flex justify-center gap-4">
            <PartyPopper className="text-yellow-500" size={32} />
            <PartyPopper className="text-pink-500" size={32} />
            <PartyPopper className="text-blue-500" size={32} />
          </div>
        </motion.div>
        
        {/* Floating hearts celebration */}
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: "100vh", x: Math.random() * 100 + "vw", opacity: 1 }}
            animate={{ y: "-10vh", opacity: 0 }}
            transition={{ duration: Math.random() * 3 + 2, repeat: Infinity, delay: Math.random() * 5 }}
            className="fixed pointer-events-none text-red-400"
          >
            <Heart size={Math.random() * 20 + 10} fill="currentColor" />
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center bg-pink-50 relative overflow-hidden p-4"
    >
      {/* Background Hearts */}
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.2, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            style={{ left: `${heart.x}%`, top: `${heart.y}%` }}
            className="absolute pointer-events-none text-pink-300"
          >
            <Heart size={24} fill="currentColor" />
          </motion.div>
        ))}
      </AnimatePresence>

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="z-10 bg-white/80 backdrop-blur-sm p-8 md:p-12 rounded-[2rem] shadow-xl border border-white/50 text-center max-w-md w-full"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="mb-8"
        >
          <div className="w-24 h-24 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="text-pink-500 fill-pink-500" size={48} />
          </div>
        </motion.div>

        <h2 className="text-3xl md:text-4xl font-cursive text-gray-800 mb-8 leading-tight">
          Em Dứa ơi, tối nay đi chơi với anh nhé
        </h2>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative min-h-[120px]">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsAccepted(true)}
            className="px-8 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-full font-semibold text-lg shadow-lg shadow-pink-200 transition-colors cursor-pointer z-20"
          >
            Em đồng ý ❤️
          </motion.button>

          <motion.button
            animate={{ x: noButtonPos.x, y: noButtonPos.y }}
            onMouseEnter={moveNoButton}
            onClick={moveNoButton}
            className="px-8 py-3 bg-gray-200 hover:bg-gray-300 text-gray-600 rounded-full font-semibold text-lg transition-colors cursor-pointer"
          >
            Em không đồng ý
          </motion.button>
        </div>
      </motion.div>

      <div className="absolute bottom-8 text-pink-400/60 font-cursive text-xl">
        Gửi em với tất cả sự chân thành ✨
      </div>
    </div>
  );
}
