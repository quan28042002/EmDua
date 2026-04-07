/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, PartyPopper, Sparkles, Gift, Music, Volume2, VolumeX } from "lucide-react";

export default function App() {
  const [isAccepted, setIsAccepted] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number; type: 'heart' | 'pineapple' }[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Background decorations
  useEffect(() => {
    const interval = setInterval(() => {
      setHearts((prev) => [
        ...prev.slice(-25),
        { 
          id: Date.now(), 
          x: Math.random() * 100, 
          y: Math.random() * 100,
          type: Math.random() > 0.8 ? 'pineapple' : 'heart'
        },
      ]);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"); // Replace with a romantic track if desired
      audioRef.current.loop = true;
    }
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {
        console.log("Autoplay blocked - user interaction required");
      });
    }
    setIsPlaying(!isPlaying);
  };

  const moveNoButton = () => {
    if (!containerRef.current) return;
    const container = containerRef.current.getBoundingClientRect();
    const padding = 60;
    const newX = (Math.random() - 0.5) * (container.width - padding * 2);
    const newY = (Math.random() - 0.5) * (container.height - padding * 2);
    setNoButtonPos({ x: newX, y: newY });
  };

  if (isAccepted && !isOpened) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-pink-50 p-4 text-center overflow-hidden">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          className="cursor-pointer group"
          onClick={() => setIsOpened(true)}
        >
          <div className="relative">
            <motion.div
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-pink-500"
            >
              <Gift size={120} className="drop-shadow-2xl" />
            </motion.div>
            <motion.div
              animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="absolute -top-4 -right-4 text-yellow-400"
            >
              <Sparkles size={40} />
            </motion.div>
          </div>
          <h2 className="mt-8 text-2xl font-cursive text-pink-600 animate-pulse">
            Có một món quà bất ngờ cho Dứa nè! <br/> Ấn vào hộp quà đi...
          </h2>
        </motion.div>
      </div>
    );
  }

  if (isAccepted && isOpened) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-pink-100 p-4 text-center relative overflow-hidden">
        <motion.div
          initial={{ scale: 0, y: 100 }}
          animate={{ scale: 1, y: 0 }}
          className="bg-white/90 backdrop-blur-md p-8 md:p-12 rounded-[3rem] shadow-2xl border-8 border-white relative z-10 max-w-lg w-full"
        >
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex gap-4">
            <motion.div animate={{ rotate: [0, 20, -20, 0] }} transition={{ repeat: Infinity, duration: 1 }}>
              <span className="text-6xl">🍍</span>
            </motion.div>
            <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 0.8 }}>
              <Heart className="text-red-500 fill-red-500" size={64} />
            </motion.div>
            <motion.div animate={{ rotate: [0, -20, 20, 0] }} transition={{ repeat: Infinity, duration: 1.2 }}>
              <span className="text-6xl">🍍</span>
            </motion.div>
          </div>

          <h1 className="text-4xl md:text-6xl font-cursive text-pink-600 mb-6 mt-8">
            Yeeee! Anh biết mà! ❤️
          </h1>
          
          <div className="space-y-4 text-xl text-gray-700 font-sans leading-relaxed">
            <p>Tối nay anh qua đón <b>Dứa</b> nhé!</p>
            <p className="text-pink-500 font-semibold italic">"Thế giới này có 8 tỷ người, nhưng anh chỉ muốn đi chơi với mỗi Dứa thôi."</p>
            <p>Chuẩn bị xinh đẹp nha công chúa của anh! 👸✨</p>
          </div>

          <motion.div 
            className="mt-10 flex justify-center gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <PartyPopper className="text-yellow-500" size={40} />
            <div className="px-6 py-2 bg-pink-500 text-white rounded-full font-bold shadow-lg">
              Hẹn em 19:00 nhé! 🌹
            </div>
            <PartyPopper className="text-pink-500" size={40} />
          </motion.div>
        </motion.div>

        {/* Celebration Rain */}
        {Array.from({ length: 40 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: "110vh", x: Math.random() * 100 + "vw", opacity: 1, rotate: 0 }}
            animate={{ y: "-10vh", rotate: 360, opacity: 0 }}
            transition={{ 
              duration: Math.random() * 3 + 3, 
              repeat: Infinity, 
              delay: Math.random() * 5,
              ease: "linear"
            }}
            className="fixed pointer-events-none"
          >
            {i % 3 === 0 ? (
              <span className="text-2xl">🍍</span>
            ) : (
              <Heart className={i % 2 === 0 ? "text-red-400" : "text-pink-400"} fill="currentColor" size={Math.random() * 20 + 15} />
            )}
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
      {/* Music Toggle */}
      <button 
        onClick={toggleMusic}
        className="fixed top-6 right-6 z-50 p-3 bg-white/50 backdrop-blur-sm rounded-full border border-pink-200 text-pink-500 hover:bg-white transition-all shadow-sm"
      >
        {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
      </button>

      {/* Background Hearts & Pineapples */}
      <AnimatePresence>
        {hearts.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 0.2, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0 }}
            style={{ left: `${item.x}%`, top: `${item.y}%` }}
            className="absolute pointer-events-none"
          >
            {item.type === 'pineapple' ? (
              <span className="text-2xl grayscale opacity-50">🍍</span>
            ) : (
              <Heart size={24} fill="currentColor" className="text-pink-300" />
            )}
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
          <div className="w-24 h-24 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4 relative">
            <Heart className="text-pink-500 fill-pink-500" size={48} />
            <motion.span 
              animate={{ rotate: [0, 20, -20, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="absolute -top-2 -right-2 text-3xl"
            >
              🍍
            </motion.span>
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
        Gửi Dứa với tất cả sự chân thành ✨
      </div>
    </div>
  );
}
